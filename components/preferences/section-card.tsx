import * as React from 'react';
import { cn } from '@/lib/utils';

export function SectionCard({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('space-y-3', className)}>
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground/80">{subtitle}</p>
        )}
      </div>
      <div className="rounded-xl border border-border bg-card p-4">
        {children}
      </div>
    </section>
  );
}
