import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: "SwiftShopr's privacy policy. How we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="container-narrow py-16 md:py-24">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Effective date: April 16, 2026
        </p>

        <section className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            SwiftShopr Inc. ("SwiftShopr", "we", "us") respects your privacy.
            This policy explains what personal information we collect when you
            use the SwiftShopr mobile app or visit swiftshopr.shop, how we use
            it, and the rights you have over it.
          </p>
        </section>

        <Heading>1. Information We Collect</Heading>
        <Para>
          <strong>Account information:</strong> Your phone number (used for SMS
          one-time-password login via Twilio), a user ID we generate, and any
          profile data you choose to add (sizing, dietary flags, preferred
          retailers, style photos).
        </Para>
        <Para>
          <strong>Purchase information:</strong> Items scanned, transaction
          amounts, store location, and digital receipts. We do not store your
          full card number — payment details are tokenized and held by Stripe.
        </Para>
        <Para>
          <strong>Device and usage data:</strong> Device identifiers, app
          version, crash reports (anonymized via Sentry), and anonymous product
          analytics to improve the app. No advertising identifiers are
          collected.
        </Para>

        <Heading>2. How We Use Your Information</Heading>
        <Bullets
          items={[
            'Authenticate you and keep your account secure',
            'Process payments via Stripe and deliver digital receipts',
            'Personalize AI shopping recommendations to your preferences',
            'Flag allergens and dietary violations during scan',
            'Track cashback earnings and reward tier progression',
            'Improve the product through anonymous usage analytics',
            'Comply with legal and regulatory obligations',
          ]}
        />
        <Para>
          We do <strong>not</strong> sell your personal information. We do
          <strong> not</strong> use your data for advertising without your
          consent.
        </Para>

        <Heading>3. Who We Share Data With</Heading>
        <Para>We share data only with service providers necessary to operate the app:</Para>
        <Bullets
          items={[
            'Stripe — payment processing and card vault (no full card numbers stored on our servers)',
            'Twilio — SMS delivery for one-time-password login',
            'Retailer POS systems — order reconciliation (items purchased, totals) after you complete a transaction',
            'Sentry — anonymized error and crash reporting',
            'Render — cloud hosting for our backend infrastructure',
          ]}
        />
        <Para>
          We may disclose data if required by law, subpoena, or court order, or
          to protect the rights, property, or safety of SwiftShopr, our users,
          or the public.
        </Para>

        <Heading>4. Data Security</Heading>
        <Bullets
          items={[
            'All data in transit is encrypted via TLS 1.2+',
            'Data at rest is encrypted in our PostgreSQL database',
            'Payment details never touch our servers — tokenized via Stripe',
            'Access to production systems is audit-logged',
            'Regular security reviews and penetration testing',
          ]}
        />

        <Heading>5. Your Rights</Heading>
        <Para>
          You have the right to access, correct, delete, or export your personal
          information. You may delete your account in-app at any time (Settings
          → Delete Account). Account deletion is soft-deletion for 30 days, then
          permanently purged.
        </Para>
        <Para>
          If you are a resident of the EU, UK, or California, you have
          additional rights under GDPR or CCPA. To exercise these rights, email{' '}
          <a href="mailto:support@swiftshopr.org" className="text-primary hover:underline">
            support@swiftshopr.org
          </a>
          . We respond within 30 days.
        </Para>

        <Heading>6. Children</Heading>
        <Para>
          SwiftShopr is not intended for children under 13. We do not knowingly
          collect data from children under 13. If you believe we have collected
          such information, contact us and we will delete it.
        </Para>

        <Heading>7. Changes to this Policy</Heading>
        <Para>
          We may update this policy from time to time. Material changes will be
          announced in-app and via email to registered users. The effective date
          at the top of this page will always reflect the current version.
        </Para>

        <Heading>8. Contact</Heading>
        <Para>
          Questions, concerns, or requests? Email{' '}
          <a href="mailto:support@swiftshopr.org" className="text-primary hover:underline">
            support@swiftshopr.org
          </a>{' '}
          or write to SwiftShopr Inc., Miami, Florida.
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
