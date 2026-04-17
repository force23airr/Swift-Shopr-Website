'use client';

import * as React from 'react';
import { fetchRetailers, type Retailer } from '@/lib/api';

export function useRetailers() {
  const [retailers, setRetailers] = React.useState<Retailer[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    fetchRetailers()
      .then((data) => {
        if (!cancelled) {
          setRetailers(data);
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

  return { retailers, loading };
}
