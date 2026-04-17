'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL || '#';

  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <Link href="/swifty/" className="inline-flex">
            <Badge variant="gradient" className="mb-6 gap-1.5 px-3 py-1">
              <Sparkles className="h-3 w-3" />
              <span>Swifty AI — Shop Smarter</span>
              <ArrowRight className="h-3 w-3" />
            </Badge>
          </Link>

          <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Skip the line.
            <br />
            <span className="text-gradient">Scan. Pay. Go.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
            SwiftShopr is AI-powered checkout for modern retail.
            Scan items with your phone, pay instantly, and walk out — no cashier, no wait.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="gradient" size="xl">
              <Link href="/swifty/">
                Try Swifty AI
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link href={appStoreUrl} target="_blank" rel="noreferrer">
                <ShoppingBag className="h-4 w-4" />
                Download the App
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Available on iOS. Android coming soon.
          </p>
        </motion.div>

        {/* App preview card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <div className="relative rounded-2xl border border-border bg-card/50 p-2 shadow-2xl shadow-brand-blue/10 backdrop-blur-sm">
            <div className="overflow-hidden rounded-xl bg-gradient-to-br from-muted/50 to-muted">
              <div className="flex items-center gap-1.5 border-b border-border/40 px-4 py-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                <div className="ml-4 text-xs font-mono text-muted-foreground">
                  app.swiftshopr.shop
                </div>
              </div>
              <div className="grid min-h-[280px] place-items-center p-8">
                <HeroMockup />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroMockup() {
  return (
    <div className="grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-3">
      {[
        {
          icon: '📷',
          title: 'Scan',
          body: 'Tap your camera at any barcode. Item added to cart in under 100ms.',
        },
        {
          icon: '✨',
          title: 'AI Shopping',
          body: 'Ask Swifty for outfits, recipes, or product swaps. Get real recommendations.',
        },
        {
          icon: '💳',
          title: 'Pay & Go',
          body: 'Tap to pay via Apple Pay or card. Show receipt on the way out.',
        },
      ].map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-border/60 bg-background/60 p-5 text-left backdrop-blur-sm"
        >
          <div className="text-2xl">{card.icon}</div>
          <div className="mt-3 font-semibold">{card.title}</div>
          <div className="mt-1 text-sm text-muted-foreground">{card.body}</div>
        </div>
      ))}
    </div>
  );
}
