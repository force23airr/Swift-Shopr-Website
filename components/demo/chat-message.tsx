'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, User, AlertCircle, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ChatMessage as ChatMessageType } from '@/hooks/use-demo-chat';
import type { DemoChatOutfit, DemoChatProduct } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { ProductCard } from './product-card';

export function ChatMessage({
  message,
  wakingUp,
}: {
  message: ChatMessageType;
  wakingUp?: boolean;
}) {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        'flex w-full gap-3',
        isUser ? 'justify-end' : 'justify-start',
      )}
    >
      {!isUser && (
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-purple text-white shadow-md">
          <Sparkles className="h-4 w-4" />
        </div>
      )}

      <div
        className={cn(
          'max-w-[85%] space-y-3',
          isUser ? 'items-end text-right' : 'items-start',
        )}
      >
        <div
          className={cn(
            'inline-block rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
            isUser
              ? 'bg-gradient-to-br from-brand-blue to-brand-purple text-white'
              : 'border border-border bg-card text-card-foreground',
            !isUser && message.error && 'border-destructive/30 bg-destructive/10',
          )}
        >
          {!isUser && message.loading ? (
            <TypingIndicator wakingUp={wakingUp} />
          ) : !isUser && message.error ? (
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
              <span>{message.content}</span>
            </div>
          ) : (
            <div className="whitespace-pre-wrap">{message.content}</div>
          )}
        </div>

        {/* Outfit groups — each outfit has top + bottom + shoes */}
        {!isUser && message.outfits && message.outfits.length > 0 && (
          <div className="space-y-4">
            {message.outfits.slice(0, 3).map((outfit) => (
              <OutfitBlock key={outfit.outfit_id} outfit={outfit} />
            ))}
          </div>
        )}
      </div>

      {isUser && (
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-muted text-muted-foreground">
          <User className="h-4 w-4" />
        </div>
      )}
    </motion.div>
  );
}

function OutfitBlock({ outfit }: { outfit: DemoChatOutfit }) {
  const items = [outfit.top, outfit.bottom, outfit.shoes].filter(Boolean);
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

  const toggleSelect = (product: DemoChatProduct) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
      } else {
        next.add(product.id);
      }
      return next;
    });
  };

  const selected = items.filter((i) => selectedIds.has(i.id));
  const selectedTotalCents = selected.reduce(
    (sum, i) => sum + (typeof i.price_cents === 'number' ? i.price_cents : 0),
    0,
  );
  const hasSelection = selected.length > 0;

  const handleShopSelected = () => {
    // Opens each selected item's affiliate URL in a new tab. Triggered inside a
    // user-click handler so browsers generally allow multiple window.open calls.
    selected.forEach((item) => {
      const url = item.affiliate_url || item.product_url;
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    });
  };

  return (
    <div className="rounded-xl border border-border bg-background/60 p-3">
      {outfit.description && (
        <div className="mb-2 text-xs font-medium text-muted-foreground">
          {outfit.description}
        </div>
      )}
      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            compact
            selected={selectedIds.has(item.id)}
            onToggleSelect={toggleSelect}
          />
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-border/60 pt-3">
        <div className="min-w-0 text-xs">
          {hasSelection ? (
            <>
              <div className="font-semibold">
                {selected.length} {selected.length === 1 ? 'item' : 'items'} selected
              </div>
              {selectedTotalCents > 0 && (
                <div className="text-muted-foreground">
                  ${(selectedTotalCents / 100).toFixed(2)} total
                </div>
              )}
            </>
          ) : (
            <>
              <div className="text-muted-foreground">Check items to shop</div>
              {outfit.total_price && (
                <div className="text-muted-foreground">
                  Full outfit: {outfit.total_price}
                </div>
              )}
            </>
          )}
        </div>
        <Button
          variant={hasSelection ? 'gradient' : 'outline'}
          size="sm"
          disabled={!hasSelection}
          onClick={handleShopSelected}
          className="shrink-0"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          Shop Selected
        </Button>
      </div>
    </div>
  );
}

function TypingIndicator({ wakingUp }: { wakingUp?: boolean }) {
  if (wakingUp) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="flex gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: '150ms' }}
          />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: '300ms' }}
          />
        </div>
        <span className="text-xs">Waking up Swifty — first request takes a few seconds…</span>
      </div>
    );
  }
  return (
    <div className="flex gap-1 py-1">
      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" />
      <span
        className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40"
        style={{ animationDelay: '150ms' }}
      />
      <span
        className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40"
        style={{ animationDelay: '300ms' }}
      />
    </div>
  );
}
