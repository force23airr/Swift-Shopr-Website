'use client';

import * as React from 'react';
import { Package, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DemoChatProduct } from '@/lib/api';

export function ProductCard({
  product,
  compact = false,
  selected,
  onToggleSelect,
}: {
  product: DemoChatProduct;
  compact?: boolean;
  selected?: boolean;
  onToggleSelect?: (product: DemoChatProduct) => void;
}) {
  const name = product.name || 'Product';
  const brand = product.brand;
  const image =
    (Array.isArray(product.image_urls) && product.image_urls[0]) || undefined;
  const priceString =
    product.price ||
    (typeof product.price_cents === 'number'
      ? `$${(product.price_cents / 100).toFixed(2)}`
      : undefined);
  const url = product.affiliate_url || product.product_url;
  const isSelectable = typeof onToggleSelect === 'function';

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleSelect?.(product);
  };

  const content = (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border bg-card transition-all',
        compact ? 'text-xs' : 'text-sm',
        selected
          ? 'border-primary ring-2 ring-primary/30'
          : 'border-border hover:border-primary/40',
      )}
    >
      {isSelectable && (
        <button
          type="button"
          onClick={handleCheckboxClick}
          aria-label={selected ? 'Deselect item' : 'Select item'}
          aria-pressed={selected}
          className={cn(
            'absolute right-2 top-2 z-10 grid h-6 w-6 place-items-center rounded-md border-2 transition-all',
            selected
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-background/90 text-transparent backdrop-blur hover:border-primary/50',
          )}
        >
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </button>
      )}

      <div
        className={cn(
          'relative bg-muted',
          compact ? 'aspect-square' : 'aspect-[4/3]',
        )}
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <Package className="h-6 w-6 text-muted-foreground/40" />
          </div>
        )}
      </div>
      <div className={compact ? 'p-2' : 'p-3'}>
        {brand && (
          <div className="truncate text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {brand}
          </div>
        )}
        <div className={cn('truncate font-medium', compact ? 'text-xs' : 'text-sm')}>
          {name}
        </div>
        {priceString && (
          <div className="mt-1 text-sm font-semibold text-primary">
            {priceString}
          </div>
        )}
      </div>
    </div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noreferrer" className="block">
        {content}
      </a>
    );
  }
  return content;
}
