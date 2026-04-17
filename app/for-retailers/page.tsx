import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap,
  TrendingDown,
  Plug,
  ShieldCheck,
  Users,
  BarChart3,
  ArrowRight,
  Mail,
  Server,
  Workflow,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section, SectionHeader } from '@/components/shared/section';

export const metadata: Metadata = {
  title: 'For Retailers',
  description:
    'Modernize checkout without replacing hardware. SwiftShopr integrates with NCR BSP POS systems and settles via Stripe Connect. Faster throughput, lower costs, happier customers.',
};

const BENEFITS = [
  {
    icon: Zap,
    title: 'Faster Throughput',
    body: 'Shoppers check themselves out. Your staff focuses on service, not scanning. Line lengths drop during peak hours.',
  },
  {
    icon: TrendingDown,
    title: 'Lower Labor Cost',
    body: 'Fewer cashier hours needed. Existing team can be redeployed to high-value floor activities like fulfillment.',
  },
  {
    icon: Plug,
    title: 'No New Hardware',
    body: 'We integrate with your existing NCR BSP POS and Stripe Connect merchant account. Zero capital expense.',
  },
  {
    icon: ShieldCheck,
    title: 'Stripe Radar Protection',
    body: 'Every transaction screened by Stripe Radar. Industry-leading fraud tools — not blockchain hype.',
  },
  {
    icon: Users,
    title: 'Loyal Customers',
    body: 'Cashback tiers keep shoppers coming back. Dietary profiles drive personalized upsells that actually convert.',
  },
  {
    icon: BarChart3,
    title: 'Rich Analytics',
    body: 'Transaction-level insights. Basket composition, peak hours, repeat-rate cohorts — piped to your BI stack.',
  },
];

const INTEGRATION_STEPS = [
  {
    icon: Workflow,
    title: 'POS Integration',
    body: 'We integrate directly with NCR BSP (and other POS systems on request). Inventory sync is pull-based via webhook.',
  },
  {
    icon: Server,
    title: 'Stripe Connect',
    body: 'You onboard a Stripe Connect account (standard KYC). We route customer charges directly to your account — no intermediary.',
  },
  {
    icon: ShieldCheck,
    title: 'Go Live',
    body: 'Pilot with 1–3 stores first. Typical go-live is 2–4 weeks from signed agreement. We handle the technical lift.',
  },
];

export default function ForRetailersPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 blur-3xl" />
        </div>
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="default" className="mb-6">For Retailers</Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Modernize checkout. <br />
              <span className="text-gradient">Keep your hardware.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
              SwiftShopr integrates with your existing POS, settles via Stripe
              Connect, and puts checkout in your customer's pocket. Fewer lines,
              happier shoppers, stronger margins.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="gradient" size="xl">
                <a href="mailto:developer@swiftshopr.shop?subject=Retailer%20Pilot%20Request">
                  <Mail className="h-4 w-4" />
                  Request a Pilot
                </a>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link href="#integration">Integration Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <Section>
        <SectionHeader
          eyebrow="Why SwiftShopr"
          title={<>A checkout upgrade that <span className="text-gradient">pays for itself.</span></>}
          description="No hardware, no integration pain, no lock-in. We plug into what you already use and deliver measurable wins."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => {
            const Icon = b.icon;
            return (
              <Card key={b.title}>
                <CardContent className="pt-6">
                  <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {b.body}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Integration */}
      <Section id="integration" className="bg-muted/30">
        <SectionHeader
          eyebrow="Integration"
          title={<>Up and running in <span className="text-gradient">2–4 weeks.</span></>}
          description="We handle the heavy lifting. You don't need an engineering team to adopt SwiftShopr."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {INTEGRATION_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Card key={step.title}>
                <CardContent className="pt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {step.body}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Tech stack callout */}
      <Section contain="narrow">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-8 md:p-12">
            <h3 className="text-xl font-semibold md:text-2xl">Under the hood</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              SwiftShopr is built on a production-grade stack: PostgreSQL for
              transaction integrity, Redis for sub-100ms lookups, Stripe for
              payments and fraud protection, and Twilio for authentication. Our
              POS integrations are transactional, idempotent, and reconcile
              cleanly with your existing accounting.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                'Stripe Connect',
                'NCR BSP',
                'PostgreSQL 17',
                'Redis',
                'PCI DSS',
                'SOC 2 (in progress)',
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* CTA */}
      <section className="py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
              Let's talk about a pilot.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              Send us a note. We'll respond within one business day with pricing,
              a demo, and timeline.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="gradient" size="xl">
                <a href="mailto:developer@swiftshopr.shop?subject=Retailer%20Pilot%20Request&body=Tell%20us%20about%3A%0A%0A1.%20Company%20%26%20location%3A%0A2.%20Current%20POS%20system%3A%0A3.%20Number%20of%20stores%3A%0A4.%20Approximate%20monthly%20transactions%3A%0A5.%20Timeline%3A%0A">
                  <Mail className="h-4 w-4" />
                  Contact Partnerships
                </a>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link href="/about/">
                  About SwiftShopr
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
