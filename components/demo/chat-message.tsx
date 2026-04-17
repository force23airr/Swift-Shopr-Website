'use client';

import { motion } from 'framer-motion';
import { Sparkles, User, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ChatMessage as ChatMessageType } from '@/hooks/use-demo-chat';
import { ProductCard } from './product-card';

export function ChatMessage({ message, wakingUp }: { message: ChatMessageType; wakingUp?: boolean }) {
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

        {/* Product recommendations */}
        {!isUser && message.products && message.products.length > 0 && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {message.products.slice(0, 4).map((p, i) => (
              <ProductCard key={p.id || i} product={p} />
            ))}
          </div>
        )}

        {/* Outfit groups */}
        {!isUser && message.outfits && message.outfits.length > 0 && (
          <div className="space-y-3">
            {message.outfits.slice(0, 3).map((outfit, idx) => (
              <div key={idx}>
                {outfit.caption && (
                  <div className="mb-2 text-xs font-medium text-muted-foreground">
                    {outfit.caption}
                  </div>
                )}
                <div className="grid grid-cols-3 gap-2">
                  {outfit.products.slice(0, 3).map((p, j) => (
                    <ProductCard key={p.id || j} product={p} compact />
                  ))}
                </div>
              </div>
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
        <span className="text-xs">Waking up our AI — first request takes a few seconds…</span>
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
