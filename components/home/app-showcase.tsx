'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, ScanLine, Sparkles, CreditCard } from 'lucide-react';
import { Section } from '@/components/shared/section';
import { Button } from '@/components/ui/button';

const APP_SCREENS = [
  {
    icon: ScanLine,
    label: 'Scan',
    title: 'Scan any item',
    body: 'Camera opens instantly. Tap the barcode and your cart updates.',
    bg: 'from-brand-blue/20 to-sky-400/10',
  },
  {
    icon: Sparkles,
    label: 'Ask Swifty',
    title: 'Swifty picks outfits for you',
    body: 'Type what you need. Get 3 complete looks with real products.',
    bg: 'from-brand-purple/20 to-pink-400/10',
  },
  {
    icon: CreditCard,
    label: 'Checkout',
    title: 'Pay & walk out',
    body: 'Apple Pay, Google Pay, or saved cards. Receipt appears instantly.',
    bg: 'from-emerald-400/20 to-teal-500/10',
  },
];

export function AppShowcase() {
  const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL || '#';

  return (
    <Section className="relative overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
          The App
        </div>
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
          Shopping in your{' '}
          <span className="text-gradient">pocket.</span>
        </h2>
        <p className="mt-5 text-lg text-muted-foreground">
          Three taps to a better way to shop. Built for iOS, Android coming soon.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {APP_SCREENS.map((screen, i) => {
          const Icon = screen.icon;
          return (
            <motion.div
              key={screen.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Phone frame */}
              <div className="mx-auto max-w-[280px]">
                <div className="relative rounded-[2.5rem] border border-border bg-background p-2 shadow-2xl">
                  <div
                    className={`relative aspect-[9/19] overflow-hidden rounded-[2rem] bg-gradient-to-br ${screen.bg}`}
                  >
                    {/* Notch */}
                    <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-foreground/90" />

                    {/* Screen content */}
                    <div className="absolute inset-0 flex flex-col p-6 pt-10">
                      <div className="flex items-center justify-between pb-4">
                        <span className="text-xs font-semibold">SwiftShopr</span>
                        <span className="text-xs font-medium text-foreground/60">9:41</span>
                      </div>
                      <div className="flex flex-1 flex-col items-center justify-center">
                        <div className="mb-6 grid h-20 w-20 place-items-center rounded-3xl bg-background/80 shadow-xl backdrop-blur-sm">
                          <Icon className="h-9 w-9 text-foreground" />
                        </div>
                        <div className="text-center">
                          <div className="text-xs font-semibold uppercase tracking-widest text-foreground/60">
                            {screen.label}
                          </div>
                          <div className="mt-2 text-base font-bold leading-tight">
                            {screen.title}
                          </div>
                          <div className="mt-2 text-xs text-foreground/70 leading-relaxed">
                            {screen.body}
                          </div>
                        </div>
                      </div>
                      {/* Home bar */}
                      <div className="mx-auto h-1 w-24 rounded-full bg-foreground/30" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-16 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button asChild variant="gradient" size="xl">
          <Link href={appStoreUrl} target="_blank" rel="noreferrer">
            <ShoppingBag className="h-4 w-4" />
            Download for iOS
          </Link>
        </Button>
        <Button asChild variant="outline" size="xl" disabled>
          <span className="opacity-60">Android (Coming Soon)</span>
        </Button>
      </div>
    </Section>
  );
}
