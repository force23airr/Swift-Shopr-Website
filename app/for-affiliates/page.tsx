import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  DollarSign,
  Users,
  Target,
  BarChart3,
  Shield,
  Clock,
  CheckCircle2,
  Mail,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section, SectionHeader } from '@/components/shared/section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Affiliate Program',
  description:
    'Earn commission by promoting SwiftShopr. Dedicated partner program for content creators, influencers, and affiliate networks. Competitive commissions, 30-day cookies, real-time dashboard.',
};

const BENEFITS = [
  {
    icon: DollarSign,
    title: 'Competitive Commissions',
    body: 'Earn a share on every qualified sale driven through your links. Tiered structure rewards top performers.',
  },
  {
    icon: Clock,
    title: '30-Day Cookie Window',
    body: 'Generous attribution window means you still earn if your audience converts within 30 days of clicking.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Reporting',
    body: 'Track clicks, conversions, and earnings in your partner dashboard. Exportable, API-accessible.',
  },
  {
    icon: Shield,
    title: 'FTC Compliant by Design',
    body: 'Clear disclosure templates, tracking transparency, and brand-safe creative kit included.',
  },
  {
    icon: Target,
    title: 'High-Intent Audience',
    body: 'Our AI shopping demo converts curious visitors into app installs at industry-leading rates.',
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    body: 'A partner manager assigned to every approved affiliate. We help you succeed — no tickets, just Slack.',
  },
];

const STEPS = [
  {
    n: '01',
    title: 'Apply',
    body: 'Tell us about your audience, channels, and content focus. Approvals turn around in 48 hours.',
  },
  {
    n: '02',
    title: 'Get your links',
    body: 'Generate tracked deep-links to the app, AI demo, or specific product categories. Use them anywhere.',
  },
  {
    n: '03',
    title: 'Share what you love',
    body: 'Post, blog, stream, or email. Attribution tracks automatically across devices within the cookie window.',
  },
  {
    n: '04',
    title: 'Get paid',
    body: 'Monthly payouts via Stripe (direct deposit) or PayPal. Net-30 schedule, $50 minimum.',
  },
];

const FAQS = [
  {
    q: 'Who is eligible to join the affiliate program?',
    a: 'Content creators, reviewers, newsletter authors, YouTubers, TikTok creators, podcast hosts, bloggers, and any affiliate network partners (CJ, Impact, ShareASale, Awin). We look for audience alignment — shopping, tech, food, fashion, lifestyle, or deals content performs best.',
  },
  {
    q: 'What are the commission rates?',
    a: 'Commission rates are set during the affiliate agreement based on your audience, channel, and volume. We offer competitive, category-standard rates with performance tiers. Full terms are disclosed in the partner agreement at sign-up — contact us for specifics.',
  },
  {
    q: 'What counts as a qualified conversion?',
    a: 'A qualified conversion is a first-time app install followed by a completed purchase within 30 days of the click. Returns, chargebacks, or fraudulent transactions do not qualify and will be reversed.',
  },
  {
    q: 'Do I need to disclose the partnership?',
    a: 'Yes — all affiliates must comply with FTC guidelines and disclose their relationship with SwiftShopr clearly (e.g., "#ad", "#sponsored", "affiliate link"). We provide a compliance guide and pre-approved disclosure templates.',
  },
  {
    q: 'Which affiliate networks do you work with?',
    a: 'We accept direct affiliates and are actively expanding partnerships with major networks. If you represent a network, please reach out to discuss integration.',
  },
  {
    q: 'How do I track my performance?',
    a: 'Every approved affiliate gets access to a real-time dashboard showing clicks, conversions, earnings, and top-performing content. Data is also available via API for your own analytics stack.',
  },
  {
    q: 'When and how do I get paid?',
    a: 'Payouts are processed monthly on a Net-30 schedule once your balance hits $50 USD. Paid via direct deposit (Stripe), PayPal, or wire for international partners.',
  },
  {
    q: 'Can I promote SwiftShopr on paid media?',
    a: 'Yes, with some guardrails. Paid social (TikTok, Instagram, YouTube) is generally fine. Brand bidding on paid search (Google Ads targeting "SwiftShopr") requires explicit written approval to avoid conflicts with our own campaigns.',
  },
];

export default function ForAffiliatesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 blur-3xl" />
        </div>
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" className="mb-6">
              <Sparkles className="mr-1.5 h-3 w-3" />
              Affiliate Program
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Earn by sharing what <span className="text-gradient">you love.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
              Join the SwiftShopr partner program — built for content creators,
              affiliate networks, and shopping influencers who want to earn on
              every app install and purchase they drive.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="gradient" size="xl">
                <a href="mailto:affiliates@swiftshopr.shop?subject=Affiliate%20Program%20Application">
                  Apply to the Program
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="xl">
                <a href="#faq">Read the FAQ</a>
              </Button>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Direct partners · Networks welcome · International payouts
            </p>
          </div>
        </div>
      </section>

      {/* Key stats / credibility row */}
      <section className="border-y border-border bg-muted/30">
        <div className="container-wide py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <KpiItem value="30 days" label="Cookie window" />
            <KpiItem value="Net-30" label="Payout schedule" />
            <KpiItem value="48 hrs" label="Approval time" />
            <KpiItem value="Monthly" label="Payout frequency" />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <Section>
        <SectionHeader
          eyebrow="Why partner with us"
          title={<>Built for <span className="text-gradient">modern creators.</span></>}
          description="We've designed our program around what affiliates actually want: fair pay, real tools, and fast support."
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

      {/* How it works */}
      <Section className="bg-muted/30">
        <SectionHeader
          eyebrow="How it works"
          title={<>Four steps to <span className="text-gradient">start earning.</span></>}
        />
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.n} className="relative">
              <div className="text-5xl font-bold text-gradient">{step.n}</div>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* FTC Compliance callout */}
      <Section contain="narrow">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex gap-4 p-8">
            <Shield className="h-6 w-6 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold">FTC compliance is non-negotiable.</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                All affiliates must disclose their relationship with SwiftShopr in
                a clear and conspicuous way on every piece of promotional content.
                This protects your audience and your account. We provide a
                compliance guide, disclosure templates, and an automated auditing
                tool to help you stay compliant — at no cost.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Violations may result in withheld commissions or program
                termination per our partner agreement.
              </p>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="bg-muted/30" contain="narrow">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions"
        />
        <div className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Apply CTA */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              <CheckCircle2 className="h-3 w-3" />
              Applications open
            </div>
            <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
              Ready to partner with us?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-muted-foreground">
              Tell us a bit about your audience. We'll respond with next steps
              within 48 hours — usually faster.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="gradient" size="xl">
                <a href="mailto:affiliates@swiftshopr.shop?subject=Affiliate%20Program%20Application&body=Tell%20us%20about%3A%0A%0A1.%20Your%20audience%20%26%20channels%3A%0A2.%20Monthly%20reach%3A%0A3.%20Content%20focus%3A%0A4.%20Preferred%20network%20(if%20any)%3A%0A">
                  <Mail className="h-4 w-4" />
                  Apply via Email
                </a>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link href="/for-retailers/">
                  Retailer Program
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="mt-8 text-xs text-muted-foreground">
              Prefer to apply through an affiliate network? We work with CJ Affiliate, Impact, and ShareASale. Mention your network ID in your email.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function KpiItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold tracking-tight text-gradient md:text-4xl">
        {value}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground md:text-sm">
        {label}
      </div>
    </div>
  );
}
