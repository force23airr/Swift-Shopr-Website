import * as React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  contain?: 'narrow' | 'wide';
}

export function Section({
  contain = 'wide',
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn('py-16 md:py-24', className)} {...props}>
      <div className={contain === 'narrow' ? 'container-narrow' : 'container-wide'}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mx-auto max-w-3xl',
        align === 'center' ? 'text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow && (
        <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
      {description && (
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
