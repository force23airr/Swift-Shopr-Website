'use client';

import * as React from 'react';
import { sendDemoChat, type DemoChatOutfit } from '@/lib/api';
import { getOrCreateSessionId, resetSessionId } from '@/lib/session';

export type ChatMessage =
  | { id: string; role: 'user'; content: string }
  | {
      id: string;
      role: 'assistant';
      content: string;
      outfits?: DemoChatOutfit[];
      loading?: boolean;
      error?: boolean;
    };

export type RateLimitInfo = {
  message: string;
  retryAfter?: number;
  ctaUrl?: string;
};

export function useDemoChat() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [sending, setSending] = React.useState(false);
  const [conversationId, setConversationId] = React.useState<string | null>(null);
  const [rateLimit, setRateLimit] = React.useState<RateLimitInfo | null>(null);
  const [sessionId, setSessionIdState] = React.useState<string>('');
  const controllerRef = React.useRef<AbortController | null>(null);
  const startRef = React.useRef<number>(0);
  const [wakingUp, setWakingUp] = React.useState(false);

  React.useEffect(() => {
    setSessionIdState(getOrCreateSessionId());
  }, []);

  const sendMessage = React.useCallback(
    async (message: string) => {
      if (!message.trim() || sending || !sessionId) return;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: message.trim(),
      };
      const loadingMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: '',
        loading: true,
      };

      setMessages((prev) => [...prev, userMsg, loadingMsg]);
      setSending(true);
      setRateLimit(null);

      controllerRef.current?.abort();
      controllerRef.current = new AbortController();
      startRef.current = Date.now();

      // Show "waking up" state after 5s
      const wakingTimer = setTimeout(() => setWakingUp(true), 5_000);

      try {
        const result = await sendDemoChat(
          {
            message: message.trim(),
            sessionId,
            conversation_id: conversationId,
          },
          controllerRef.current.signal,
        );

        clearTimeout(wakingTimer);
        setWakingUp(false);

        if (!result.ok) {
          if (result.status === 429) {
            setRateLimit({
              message:
                result.data.message ||
                "You've reached the demo limit. Download the app for unlimited AI shopping.",
              retryAfter: result.data.retryAfter,
              ctaUrl: result.data.ctaUrl,
            });
            setMessages((prev) =>
              prev.map((m) =>
                m.id === loadingMsg.id
                  ? { ...m, loading: false, error: true, content: 'Demo limit reached.' }
                  : m,
              ),
            );
          } else {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === loadingMsg.id
                  ? {
                      ...m,
                      loading: false,
                      error: true,
                      content:
                        result.data.message ||
                        (result.status === 504
                          ? 'Swifty is waking up — try again in a few seconds.'
                          : 'Something went wrong. Please try again.'),
                    }
                  : m,
              ),
            );
          }
          return;
        }

        const data = result.data.data || {};
        const reply =
          (typeof data.message === 'string' && data.message) ||
          'Here are some ideas for you:';

        const outfits = Array.isArray(data.outfits) && data.outfits.length > 0
          ? data.outfits
          : undefined;

        if (typeof data.conversation_id === 'string') {
          setConversationId(data.conversation_id);
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === loadingMsg.id
              ? {
                  ...m,
                  loading: false,
                  content: reply,
                  outfits,
                }
              : m,
          ),
        );
      } catch (err) {
        clearTimeout(wakingTimer);
        setWakingUp(false);
        const aborted = (err as Error)?.name === 'AbortError';
        setMessages((prev) =>
          prev.map((m) =>
            m.id === loadingMsg.id
              ? {
                  ...m,
                  loading: false,
                  error: true,
                  content: aborted
                    ? 'Cancelled.'
                    : 'Network error. Check your connection and try again.',
                }
              : m,
          ),
        );
      } finally {
        setSending(false);
      }
    },
    [sending, sessionId, conversationId],
  );

  const reset = React.useCallback(() => {
    controllerRef.current?.abort();
    setMessages([]);
    setConversationId(null);
    setRateLimit(null);
    setSessionIdState(resetSessionId());
  }, []);

  return {
    messages,
    sending,
    rateLimit,
    wakingUp,
    sendMessage,
    reset,
  };
}
