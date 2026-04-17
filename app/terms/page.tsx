import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for SwiftShopr.',
};

export default function TermsPage() {
  return (
    <div className="container-narrow py-16 md:py-24">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Effective date: April 16, 2026
        </p>

        <section className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            These Terms of Service ("Terms") govern your use of the SwiftShopr
            mobile application and website (collectively, the "Service") operated
            by SwiftShopr Inc. ("SwiftShopr", "we", "us"). By using the Service,
            you agree to be bound by these Terms.
          </p>
        </section>

        <Heading>1. Description of Service</Heading>
        <Para>
          SwiftShopr provides a mobile scan-and-go checkout experience for
          partner retailers. Users scan product barcodes in-store, add items to
          a digital cart, complete payment through the app, and receive a
          digital receipt. SwiftShopr also includes an AI shopping assistant
          ("Swifty") for personalized product discovery.
        </Para>

        <Heading>2. Eligibility</Heading>
        <Para>
          You must be at least 13 years old to use the Service, and 18 or the
          age of majority in your jurisdiction to complete transactions.
        </Para>

        <Heading>3. Account & Authentication</Heading>
        <Para>
          We authenticate users via SMS one-time-password (OTP) through Twilio.
          You are responsible for maintaining access to the phone number
          associated with your account and for all activity that occurs under
          your account.
        </Para>

        <Heading>4. Payment Processing</Heading>
        <Para>
          Payment transactions are processed through Stripe. By making a
          purchase, you authorize SwiftShopr to charge the payment method on
          file. Payouts to retailers are handled via Stripe Connect. You can
          review Stripe's terms at{' '}
          <a href="https://stripe.com/legal" className="text-primary hover:underline" target="_blank" rel="noreferrer">
            stripe.com/legal
          </a>
          .
        </Para>

        <Heading>5. Refunds & Returns</Heading>
        <Para>
          SwiftShopr does not handle refunds or returns directly. All refund and
          return requests are subject to the policies of the retailer where the
          purchase was made. Please contact the retailer directly with your
          digital receipt.
        </Para>

        <Heading>6. User Responsibilities</Heading>
        <Bullets
          items={[
            'Provide accurate payment information',
            'Use the Service only for lawful purposes',
            'Scan all items you intend to purchase — attempting to exit with unscanned items is prohibited',
            'Comply with all store policies at participating retailers',
            'Notify us of any unauthorized account activity immediately',
          ]}
        />

        <Heading>7. Prohibited Uses</Heading>
        <Bullets
          items={[
            'Fraud, price manipulation, or theft of any kind',
            'Sharing accounts or using another person\'s account',
            'Reverse-engineering, scraping, or attempting to breach our security',
            'Automated interactions (bots) with the AI demo or commerce agent',
            'Reselling or redistributing SwiftShopr content without permission',
          ]}
        />

        <Heading>8. Intellectual Property</Heading>
        <Para>
          All trademarks, logos, content, and software associated with SwiftShopr
          are the property of SwiftShopr Inc. or its licensors. Nothing in these
          Terms grants you any right to use them except as expressly permitted.
        </Para>

        <Heading>9. Disclaimers</Heading>
        <Para>
          The Service is provided on an "as-is, as-available" basis. We make no
          warranties, express or implied, including warranties of
          merchantability, fitness for a particular purpose, or
          non-infringement.
        </Para>

        <Heading>10. Limitation of Liability</Heading>
        <Para>
          To the maximum extent permitted by law, SwiftShopr is not liable for
          any indirect, incidental, special, consequential, or punitive damages
          arising out of or related to your use of the Service.
        </Para>

        <Heading>11. Termination</Heading>
        <Para>
          We may suspend or terminate your account for violation of these Terms.
          You may terminate your account at any time via Settings → Delete
          Account.
        </Para>

        <Heading>12. Governing Law</Heading>
        <Para>
          These Terms are governed by the laws of the State of Florida, without
          regard to its conflict-of-law provisions.
        </Para>

        <Heading>13. Dispute Resolution</Heading>
        <Para>
          Any dispute arising under these Terms will be resolved through binding
          arbitration administered by the American Arbitration Association under
          its consumer rules. You waive the right to a jury trial and
          class-action lawsuits.
        </Para>

        <Heading>14. Changes</Heading>
        <Para>
          We may modify these Terms from time to time. Material changes will be
          announced in-app. Continued use of the Service after changes take
          effect constitutes acceptance.
        </Para>

        <Heading>15. Contact</Heading>
        <Para>
          Questions? Email{' '}
          <a href="mailto:support@swiftshopr.org" className="text-primary hover:underline">
            support@swiftshopr.org
          </a>
          . SwiftShopr Inc., Miami, Florida.
        </Para>
      </div>
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
      {children}
    </h2>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-muted-foreground leading-relaxed">{children}</p>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground leading-relaxed">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
