'use client';

import { motion } from 'framer-motion';
import { ScanLine, Sparkles, Coins, Receipt, Heart, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Section, SectionHeader } from '@/components/shared/section';

const FEATURES = [
  {
    icon: ScanLine,
    title: 'Scan-and-Go Checkout',
    body: 'Scan barcodes as you shop. Pay from your phone at the exit. Real-time cart, sub-100ms lookup, no register needed.',
    color: 'from-brand-blue to-sky-400',
  },
  {
    icon: Sparkles,
    title: 'Swifty AI Shopping',
    body: "Ask our AI agent for outfits, recipes, or product swaps. Personalized to your style, sizing, allergens, and budget.",
    color: 'from-brand-purple to-pink-400',
  },
  {
    icon: Coins,
    title: 'Cashback Rewards',
    body: 'Earn up to 4% cashback with our Bronze → Platinum tier system. Every scan counts toward your next reward.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    icon: Heart,
    title: 'Dietary Profiles',
    body: 'Flag allergens, set diet type, get instant warnings at scan time. Never accidentally buy the wrong thing again.',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    icon: Share2,
    title: 'Shared Shopping Lists',
    body: 'Collaborate on lists with your household. Check items off in real-time while you shop. Push-notified updates.',
    color: 'from-indigo-400 to-blue-500',
  },
  {
    icon: Receipt,
    title: 'Digital Receipts',
    body: 'Every purchase stored securely. Search, filter, share. Tap to show at the door — no paper, no mess.',
    color: 'from-rose-400 to-pink-500',
  },
];

export function FeaturesGrid() {
  return (
    <Section id="features">
      <SectionHeader
        eyebrow="Features"
        title={<>Everything you need, <span className="text-gradient">in one app.</span></>}
        description="SwiftShopr is more than just checkout. It's an end-to-end retail experience — personalized, fast, and rewarding."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card className="group h-full transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                <CardContent className="pt-6">
                  <div
                    className={`mb-4 inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {feature.body}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
