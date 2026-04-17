'use client';

import * as React from 'react';
import { fetchPublicStats, type PublicStats } from '@/lib/api';

export function usePublicStats() {
  const [stats, setStats] = React.useState<PublicStats | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    fetchPublicStats()
      .then((data) => {
        if (!cancelled) {
          setStats(data);
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

  return { stats, loading };
}
