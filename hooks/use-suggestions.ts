'use client';

import * as React from 'react';
import { fetchSuggestions, type Suggestion } from '@/lib/api';

const FALLBACK: Suggestion[] = [
  { text: 'Find a casual weekend outfit under $100', category: 'fashion' },
  { text: 'Plan a gluten-free dinner for 4', category: 'food' },
  { text: 'Work-from-home essentials', category: 'home' },
  { text: 'Shoes for a rooftop dinner', category: 'fashion' },
  { text: 'Healthy snacks low in sugar', category: 'food' },
];

export function useSuggestions() {
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>(FALLBACK);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    fetchSuggestions()
      .then((data) => {
        if (!cancelled) {
          setSuggestions(data.length > 0 ? data : FALLBACK);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { suggestions, loading };
}
