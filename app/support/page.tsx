import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageSquare, HelpCircle, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Section, SectionHeader } from '@/components/shared/section';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with SwiftShopr. Contact support, read FAQs, report an issue.',
};

const CHANNELS = [
  {
    icon: Mail,
    title: 'Email Support',
    body: 'General questions, account issues, refund requests.',
    cta: 'support@swiftshopr.org',
    href: 'mailto:support@swiftshopr.org',
  },
  {
    icon: MessageSquare,
    title: 'Partnerships',
    body: 'Retailer pilots, white-label SDK, enterprise requests.',
    cta: 'developer@swiftshopr.shop',
    href: 'mailto:developer@swiftshopr.shop',
  },
  {
    icon: ShieldCheck,
    title: 'Press & Media',
    body: 'Press inquiries, media kit, brand assets.',
    cta: 'press@swiftshopr.shop',
    href: 'mailto:press@swiftshopr.shop',
  },
  {
    icon: HelpCircle,
    title: 'Feature Requests',
    body: "Have an idea? We'd love to hear it.",
    cta: 'ideas@swiftshopr.shop',
    href: 'mailto:ideas@swiftshopr.shop',
  },
];

const FAQS = [
  {
    q: 'How does scan-and-go work?',
    a: 'You scan each item\'s barcode as you shop. The app shows you the price, flags allergens, and builds your cart. When you\'re done, pay from your phone and show the digital receipt at the exit.',
  },
  {
    q: 'What retailers support SwiftShopr?',
    a: 'We\'re actively onboarding partners. Check the homepage for the current live list. If you\'re a retailer interested in a pilot, contact our partnerships team.',
  },
  {
    q: 'Is my payment information secure?',
    a: 'Yes. We use Stripe\'s card vault, which is PCI DSS Level 1 certified. We never store your full card number — only a tokenized reference held by Stripe.',
  },
  {
    q: 'How do I get a refund?',
    a: 'Refunds are handled by the retailer where you made the purchase, per their standard return policy. Bring your digital receipt (available in the app under Receipts).',
  },
  {
    q: 'How do I delete my account?',
    a: 'Open the app → Settings → Account → Delete Account. Deletion is soft for 30 days (in case you change your mind), then permanently purged.',
  },
  {
    q: 'Does SwiftShopr work on Android?',
    a: 'iOS is live today. Android is in active development — follow us or join the waitlist to be notified when it ships.',
  },
];

export default function SupportPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 blur-3xl" />
        </div>
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="default" className="mb-6">Support</Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              How can we <span className="text-gradient">help?</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              Reach the right team directly. We respond within one business day.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {CHANNELS.map((ch) => {
            const Icon = ch.icon;
            return (
              <Card key={ch.title}>
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{ch.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{ch.body}</p>
                    <a
                      href={ch.href}
                      className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
                    >
                      {ch.cta} →
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section className="bg-muted/30" contain="narrow">
        <SectionHeader
          eyebrow="FAQ"
          title="Answers to common questions"
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
        <div className="mt-12 text-center text-sm text-muted-foreground">
          Still stuck? Email{' '}
          <Link
            href="mailto:support@swiftshopr.org"
            className="font-medium text-primary hover:underline"
          >
            support@swiftshopr.org
          </Link>
          . We read every message.
        </div>
      </Section>
    </>
  );
}
