'use client';

import { Store, Package, MapPin, Grid3x3 } from 'lucide-react';
import { usePublicStats } from '@/hooks/use-public-stats';
import { AnimatedNumber } from '@/components/shared/animated-number';
import { Skeleton } from '@/components/ui/skeleton';

const STATS_CONFIG = [
  {
    key: 'products',
    label: 'Products Indexed',
    icon: Package,
    suffix: '+',
    fallback: 500,
  },
  {
    key: 'retailers',
    label: 'Retailer Partners',
    icon: Store,
    suffix: '',
    fallback: 3,
  },
  {
    key: 'stores',
    label: 'Store Locations',
    icon: MapPin,
    suffix: '+',
    fallback: 10,
  },
  {
    key: 'categories',
    label: 'Product Categories',
    icon: Grid3x3,
    suffix: '',
    fallback: 12,
  },
] as const;

export function StatsCounter() {
  const { stats, loading } = usePublicStats();

  return (
    <section className="border-y border-border bg-muted/30">
      <div className="container-wide py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS_CONFIG.map((item) => {
            const Icon = item.icon;
            const raw = stats ? (stats as any)[item.key] : undefined;
            const value = typeof raw === 'number' && raw > 0 ? raw : item.fallback;
            return (
              <div key={item.key} className="text-center">
                <Icon className="mx-auto mb-3 h-5 w-5 text-primary" />
                {loading ? (
                  <Skeleton className="mx-auto h-8 w-16" />
                ) : (
                  <div className="text-3xl font-bold tracking-tight md:text-4xl">
                    <AnimatedNumber value={value} suffix={item.suffix} />
                  </div>
                )}
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground md:text-sm">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
