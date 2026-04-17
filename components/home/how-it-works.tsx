'use client';

import { motion } from 'framer-motion';
import { Smartphone, ScanLine, CreditCard, CheckCircle2 } from 'lucide-react';
import { Section, SectionHeader } from '@/components/shared/section';

const STEPS = [
  {
    icon: Smartphone,
    title: 'Open SwiftShopr',
    body: 'Launch the app before you start shopping. Connect to your store with a tap.',
  },
  {
    icon: ScanLine,
    title: 'Scan Products',
    body: "Scan each barcode as you shop. Your cart updates in real-time with prices, allergens, and alerts.",
  },
  {
    icon: CreditCard,
    title: 'Checkout on Phone',
    body: 'Tap Apple Pay, Google Pay, or your saved card. Done in seconds — no register, no line.',
  },
  {
    icon: CheckCircle2,
    title: 'Verify & Go',
    body: 'Show your digital receipt to the employee at the exit, and walk out. That simple.',
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-muted/30">
      <SectionHeader
        eyebrow="How it works"
        title={<>Four steps. <span className="text-gradient">Under two minutes.</span></>}
      />
      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-4xl font-bold text-muted-foreground/30">
                  0{i + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
