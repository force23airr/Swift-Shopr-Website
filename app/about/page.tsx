import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Target,
  Heart,
  Zap,
  MapPin,
  Mail,
  Handshake,
  Gift,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section, SectionHeader } from '@/components/shared/section';

export const metadata: Metadata = {
  title: 'About',
  description:
    "SwiftShopr is an AI-powered retail checkout app. Learn about our mission, our team, and the partners we work with to deliver a better shopping experience.",
};

const VALUES = [
  {
    icon: Zap,
    title: 'Speed without compromise',
    body: 'Sub-100ms barcode lookups. Instant payments. Zero waiting. Because every second in line is a second we can give back to shoppers.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy by default',
    body: 'No ad tracking. No data brokering. Your shopping is your business — we just make it better.',
  },
  {
    icon: Heart,
    title: 'Built for real people',
    body: 'Dietary profiles, allergen warnings, size-aware recommendations. We sweat the details that actually matter.',
  },
  {
    icon: Target,
    title: 'Retailers win too',
    body: 'No hardware replacement. Stripe Connect payouts. Modern checkout that makes stores faster, not more complicated.',
  },
];

const PARTNERS = [
  'Stripe',
  'Stripe Connect',
  'NCR BSP',
  'Twilio Verify',
  'Anthropic Claude',
  'OpenAI',
  'PostgreSQL',
  'Redis',
];

const AFFILIATE_NETWORKS = [
  'CJ Affiliate',
  'Impact',
  'ShareASale',
  'Rakuten Advertising',
  'Awin',
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 blur-3xl" />
        </div>
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="default" className="mb-6">
              <Sparkles className="mr-1.5 h-3 w-3" />
              About SwiftShopr
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Reimagining how <span className="text-gradient">people shop.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
              SwiftShopr is building the future of retail — an AI-powered mobile
              app that lets shoppers scan, pay, and discover products without
              ever standing in line.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Headquartered in Miami, Florida</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <Section contain="narrow">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-8 md:p-12">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              Our Mission
            </div>
            <p className="mt-4 text-2xl font-semibold leading-relaxed md:text-3xl">
              Give people back their time — one checkout at a time.
            </p>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Every year, shoppers spend billions of hours standing in line.
              That's time not spent with family, not spent on hobbies, not spent
              living. SwiftShopr turns your phone into the fastest checkout in
              the store, and — through our AI shopping assistant — into a
              helpful companion that understands your style, your diet, and
              your budget.
            </p>
          </CardContent>
        </Card>
      </Section>

      {/* Values */}
      <Section>
        <SectionHeader
          eyebrow="What we believe"
          title={<>Values that <span className="text-gradient">guide us.</span></>}
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <Card key={v.title}>
                <CardContent className="flex gap-4 pt-6">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{v.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {v.body}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* How we monetize — transparent disclosure for affiliate networks */}
      <Section className="bg-muted/30" contain="narrow">
        <SectionHeader
          eyebrow="How we make money"
          title="Transparent by design"
          description="We believe shoppers deserve to know exactly how our business works."
        />
        <div className="mt-10 grid gap-4">
          <Card>
            <CardContent className="flex gap-4 pt-6">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <Handshake className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Retailer processing fees</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  When you check out through SwiftShopr at a partner retailer,
                  we earn a small per-transaction fee from the retailer — not
                  the shopper. Shoppers never pay more than the posted price.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex gap-4 pt-6">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                <Gift className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Affiliate commissions on recommended products</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  When Swifty (our AI shopping assistant) recommends a product
                  outside a partner store and you buy it, we may earn a
                  commission from the merchant through established affiliate
                  networks. This never affects the price you pay. Clear{' '}
                  <Link href="/privacy/" className="text-primary hover:underline">
                    privacy disclosures
                  </Link>{' '}
                  are made in-app.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            We partner with industry-standard affiliate networks
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {AFFILIATE_NETWORKS.map((net) => (
              <span
                key={net}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium"
              >
                {net}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Technology partners */}
      <Section contain="narrow">
        <SectionHeader
          eyebrow="Built on trusted infrastructure"
          title="Technology partners"
          description="We stand on the shoulders of giants — production-grade services handle payments, auth, AI, and data."
        />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {PARTNERS.map((p) => (
            <span
              key={p}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
            >
              {p}
            </span>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
              Let's talk.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              Partnerships, press, investor questions, or just curious? We're
              responsive.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="gradient" size="xl">
                <a href="mailto:developer@swiftshopr.shop">
                  <Mail className="h-4 w-4" />
                  developer@swiftshopr.shop
                </a>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link href="/for-retailers/">
                  For Retailers
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
