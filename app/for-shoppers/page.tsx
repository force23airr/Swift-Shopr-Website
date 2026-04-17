import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ScanLine,
  Sparkles,
  Coins,
  Heart,
  Share2,
  Receipt,
  Camera,
  CreditCard,
  ArrowRight,
  ShoppingBag,
  Globe,
  Shirt,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section, SectionHeader } from '@/components/shared/section';

export const metadata: Metadata = {
  title: 'For Shoppers',
  description:
    'Scan items, pay from your phone, earn cashback. Get personalized AI shopping, dietary flagging, shared lists, and digital receipts — all in one app.',
};

const FEATURES = [
  {
    icon: ScanLine,
    title: 'Scan-and-Go',
    body: 'Scan items as you shop with your camera. Sub-100ms barcode lookup, real-time cart, no register needed.',
  },
  {
    icon: Sparkles,
    title: 'Swifty AI Shopping',
    body: 'Ask for outfits, meals, or swaps. Get 3 curated options with real products, sized to you, in your budget.',
  },
  {
    icon: Coins,
    title: 'Cashback Tiers',
    body: 'Earn 0.5% → 4% cashback. Bronze to Platinum tiers reward loyal shoppers with better rates.',
  },
  {
    icon: Heart,
    title: 'Allergen Flagging',
    body: 'Set dietary profile once. Get instant warnings if a scanned item contains your allergens or violates your diet.',
  },
  {
    icon: Share2,
    title: 'Shared Lists',
    body: "Shop lists together. Check items off in real-time — your household sees updates instantly.",
  },
  {
    icon: Receipt,
    title: 'Digital Receipts',
    body: 'Every purchase saved. Search, filter, share, or show at the exit. No paper, no clutter.',
  },
  {
    icon: Globe,
    title: 'Global Food Market',
    body: 'Discover international food & wellness products. Curated collections with health scores and dietary flags.',
  },
  {
    icon: Shirt,
    title: 'Style Profiles',
    body: 'Upload a style photo, set sizing & budget. Swifty remembers and matches every recommendation to your taste.',
  },
  {
    icon: Camera,
    title: 'Discover Feed',
    body: 'Swipe through product discoveries reel-style. Find new favorites based on what others love.',
  },
];

export default function ForShoppersPage() {
  const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL || '#';
  return (
    <>
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 blur-3xl" />
        </div>
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="default" className="mb-6">For Shoppers</Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              A better way to <span className="text-gradient">shop.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
              SwiftShopr turns your phone into the fastest checkout line in the
              store — and your personal shopping assistant when you need ideas.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="gradient" size="xl">
                <Link href={appStoreUrl} target="_blank" rel="noreferrer">
                  <ShoppingBag className="h-4 w-4" />
                  Download for iOS
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link href="/ai-demo/">
                  Try the AI Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="What you get"
          title={<>Nine features. <span className="text-gradient">One app.</span></>}
          description="SwiftShopr is packed with tools built for the way people actually shop — not the way POS systems were designed in 1990."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title}>
                <CardContent className="pt-6">
                  <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {feature.body}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeader
          eyebrow="Rewards"
          title={<>Cashback that <span className="text-gradient">grows with you.</span></>}
          description="Our tier system means frequent shoppers earn more on every purchase. Starts at Bronze automatically — no signup hoops."
        />
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { tier: 'Bronze', rate: '0.5%', color: 'from-amber-600/30 to-amber-800/20' },
            { tier: 'Silver', rate: '1%', color: 'from-slate-400/30 to-slate-600/20' },
            { tier: 'Gold', rate: '2%', color: 'from-yellow-400/30 to-amber-500/20' },
            { tier: 'Platinum', rate: '4%', color: 'from-indigo-400/30 to-purple-500/20' },
          ].map((t) => (
            <Card key={t.tier}>
              <CardContent
                className={`flex flex-col items-center bg-gradient-to-br ${t.color} pt-8 pb-8`}
              >
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {t.tier}
                </div>
                <div className="mt-2 text-4xl font-bold tracking-tight">
                  {t.rate}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">cashback</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Payments"
          title={<>Pay however you <span className="text-gradient">want.</span></>}
          description="Secure card vault powered by Stripe. Never retype a card, never expose your numbers."
        />
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {['Apple Pay', 'Google Pay', 'Visa', 'Mastercard', 'Amex', 'Discover'].map(
            (method) => (
              <div
                key={method}
                className="flex items-center gap-2 rounded-xl border border-border bg-card/50 px-5 py-3"
              >
                <CreditCard className="h-4 w-4 text-primary" />
                <span className="font-medium">{method}</span>
              </div>
            ),
          )}
        </div>
      </Section>
    </>
  );
}
