import Link from 'next/link';
import { Sparkles } from 'lucide-react';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { href: '/for-shoppers/', label: 'For Shoppers' },
      { href: '/for-retailers/', label: 'For Retailers' },
      { href: '/ai-demo/', label: 'AI Shopping Demo' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about/', label: 'About' },
      { href: '/support/', label: 'Support' },
      { href: 'mailto:developer@swiftshopr.shop', label: 'Partnerships' },
      { href: 'mailto:support@swiftshopr.org', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy/', label: 'Privacy Policy' },
      { href: '/terms/', label: 'Terms of Service' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container-wide py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <span>SwiftShopr</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Skip the line. Scan. Pay. Go.
              <br />
              Modern retail checkout, powered by AI.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">Miami, Florida</p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {year} SwiftShopr Inc. All rights reserved.</p>
          <p>Transforming retail one transaction at a time.</p>
        </div>
      </div>
    </footer>
  );
}
