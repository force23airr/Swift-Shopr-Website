'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-brand-blue/5 via-transparent to-brand-purple/5" />
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-blue to-brand-purple p-12 text-center text-white shadow-2xl shadow-brand-purple/20 md:p-20"
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)',
              backgroundSize: '60px 60px, 40px 40px',
            }}
          />
          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="h-3 w-3" />
              <span>Ready in seconds</span>
            </div>
            <h2 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
              Ready to transform your checkout?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-white/80">
              Whether you're a shopper or a retailer — SwiftShopr is built for
              you. Start exploring what's possible.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="xl"
                className="bg-white text-brand-blue hover:bg-white/90"
              >
                <Link href="/ai-demo/">
                  Try the AI Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
              >
                <Link href="/for-retailers/">Retailer Pilot</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
