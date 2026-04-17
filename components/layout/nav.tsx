'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/shared/theme-toggle';

const NAV_LINKS = [
  { href: '/for-shoppers/', label: 'Shoppers' },
  { href: '/for-retailers/', label: 'Retailers' },
  { href: '/about/', label: 'About' },
  { href: '/ai-demo/', label: 'AI Demo', highlight: true },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border/60 bg-background/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-background/0',
      )}
    >
      <nav className="container-wide flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold tracking-tight text-lg"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple text-white shadow-lg shadow-brand-blue/20">
            <Sparkles className="h-4 w-4" />
          </span>
          <span>SwiftShopr</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                  link.highlight &&
                    'text-accent hover:text-accent dark:text-accent',
                )}
              >
                {link.label}
                {link.highlight && (
                  <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            variant="gradient"
            size="sm"
            className="hidden md:inline-flex"
          >
            <Link
              href={process.env.NEXT_PUBLIC_APP_STORE_URL || '#'}
              target="_blank"
              rel="noreferrer"
            >
              Download
            </Link>
          </Button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-wide flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-lg px-3 py-3 text-sm font-medium',
                  pathname === link.href
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  link.highlight && 'text-accent',
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              variant="gradient"
              className="mt-2 w-full"
            >
              <Link
                href={process.env.NEXT_PUBLIC_APP_STORE_URL || '#'}
                target="_blank"
                rel="noreferrer"
              >
                Download the App
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
