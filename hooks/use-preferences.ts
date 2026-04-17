'use client';

import * as React from 'react';
import {
  loadPreferences,
  savePreferences,
  resetPreferences,
  EMPTY_PREFERENCES,
  type Preferences,
} from '@/lib/preferences';
import { getOrCreateWebUserId, resetWebUserId } from '@/lib/web-identity';

const SAVE_DEBOUNCE_MS = 800;

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export function usePreferences() {
  const [webUserId, setWebUserId] = React.useState<string>('');
  const [preferences, setPreferences] = React.useState<Preferences>(EMPTY_PREFERENCES);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [saveStatus, setSaveStatus] = React.useState<SaveStatus>('idle');

  // Kept up-to-date for flushSave
  const latestRef = React.useRef<Preferences>(EMPTY_PREFERENCES);
  const lastSavedRef = React.useRef<Preferences>(EMPTY_PREFERENCES);
  const saveTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const idRef = React.useRef<string>('');

  React.useEffect(() => {
    latestRef.current = preferences;
  }, [preferences]);

  // Load on mount
  React.useEffect(() => {
    let cancelled = false;

    const id = getOrCreateWebUserId();
    idRef.current = id;
    setWebUserId(id);

    (async () => {
      const loaded = await loadPreferences(id);
      if (cancelled) return;
      const merged: Preferences = { ...EMPTY_PREFERENCES, ...(loaded ?? {}) };
      setPreferences(merged);
      lastSavedRef.current = merged;
      setIsLoaded(true);
    })();

    return () => {
      cancelled = true;
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  // Debounced save
  const scheduleSave = React.useCallback(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    setSaveStatus('saving');

    saveTimerRef.current = setTimeout(async () => {
      const id = idRef.current;
      if (!id) return;
      const snapshot = latestRef.current;
      const result = await savePreferences(id, snapshot);
      if (result) {
        lastSavedRef.current = snapshot;
        setSaveStatus('saved');
        // Briefly show "saved" then fade to idle
        setTimeout(() => setSaveStatus('idle'), 1500);
      } else {
        // Roll back to last successful state
        setPreferences(lastSavedRef.current);
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    }, SAVE_DEBOUNCE_MS);
  }, []);

  const updateField = React.useCallback(
    <K extends keyof Preferences>(key: K, value: Preferences[K]) => {
      setPreferences((prev) => ({ ...prev, [key]: value }));
      scheduleSave();
    },
    [scheduleSave],
  );

  const toggleArrayField = React.useCallback(
    <K extends keyof Preferences>(key: K, item: string) => {
      setPreferences((prev) => {
        const current = (prev[key] as unknown as string[] | undefined) ?? [];
        const next = current.includes(item)
          ? current.filter((v) => v !== item)
          : [...current, item];
        return { ...prev, [key]: next as Preferences[K] };
      });
      scheduleSave();
    },
    [scheduleSave],
  );

  const flushSave = React.useCallback(async () => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }
    const id = idRef.current;
    if (!id) return false;
    const result = await savePreferences(id, latestRef.current);
    if (result) {
      lastSavedRef.current = latestRef.current;
      setSaveStatus('saved');
      return true;
    }
    setSaveStatus('error');
    return false;
  }, []);

  const reset = React.useCallback(async () => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }
    const id = idRef.current;
    if (id) await resetPreferences(id);
    const freshId = resetWebUserId();
    idRef.current = freshId;
    setWebUserId(freshId);
    setPreferences(EMPTY_PREFERENCES);
    lastSavedRef.current = EMPTY_PREFERENCES;
    setSaveStatus('idle');
    return true;
  }, []);

  return {
    webUserId,
    preferences,
    isLoaded,
    saveStatus,
    updateField,
    toggleArrayField,
    flushSave,
    reset,
  };
}
