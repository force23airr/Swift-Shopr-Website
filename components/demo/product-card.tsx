import { Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DemoChatProduct } from '@/lib/api';

export function ProductCard({
  product,
  compact = false,
}: {
  product: DemoChatProduct;
  compact?: boolean;
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

  const content = (
    <div
      className={cn(
        'group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40',
        compact ? 'text-xs' : 'text-sm',
      )}
    >
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
