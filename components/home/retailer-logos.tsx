'use client';

import { Store } from 'lucide-react';
import { useRetailers } from '@/hooks/use-retailers';
import { Section, SectionHeader } from '@/components/shared/section';
import { Skeleton } from '@/components/ui/skeleton';

export function RetailerLogos() {
  const { retailers, loading } = useRetailers();

  // Fallback set if API is down — these are retailers we've onboarded
  const display = retailers.length > 0
    ? retailers
    : [
        { id: '1', code: 'ross', name: 'Ross' },
        { id: '2', code: 'publix', name: 'Publix' },
        { id: '3', code: 'fresco', name: 'Fresco y Más' },
      ];

  return (
    <Section className="py-16 md:py-20">
      <SectionHeader
        eyebrow="Retail Partners"
        title="Available at trusted retailers"
        description="We integrate directly with retailer POS systems via NCR BSP and Stripe Connect — no hardware replacement needed."
      />
      <div className="mt-12">
        {loading ? (
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-14 w-36" />
            ))}
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {display.map((retailer) => (
              <RetailerBadge key={retailer.id} retailer={retailer} />
            ))}
          </div>
        )}
        <p className="mt-10 text-center text-sm text-muted-foreground">
          More coming soon — including Target, Walmart, and fashion retailers.
        </p>
      </div>
    </Section>
  );
}

function RetailerBadge({
  retailer,
}: {
  retailer: { id: string; code: string; name: string; logo?: string };
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card/50 px-5 py-3 text-lg font-semibold text-muted-foreground transition-colors hover:text-foreground">
      <Store className="h-4 w-4 text-primary" />
      <span>{retailer.name}</span>
    </div>
  );
}
