'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, RotateCcw, Sparkles, Download, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ChatInput } from '@/components/demo/chat-input';
import { ChatMessage } from '@/components/demo/chat-message';
import { SuggestionChips } from '@/components/demo/suggestion-chips';
import { useDemoChat } from '@/hooks/use-demo-chat';

export default function SwiftyPage() {
  const { messages, sending, rateLimit, wakingUp, sendMessage, reset } = useDemoChat();
  const [showRateLimit, setShowRateLimit] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (rateLimit) setShowRateLimit(true);
  }, [rateLimit]);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const appStoreUrl =
    rateLimit?.ctaUrl ||
    process.env.NEXT_PUBLIC_APP_STORE_URL ||
    'https://apps.apple.com/us/app/swift-shopr/id6751731104';

  return (
    <>
      <section className="relative overflow-hidden border-b border-border pt-20 pb-10 md:pt-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 blur-3xl" />
        </div>
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="gradient" className="mb-6">
              <Sparkles className="mr-1.5 h-3 w-3" />
              Swifty AI
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-gradient">Shop smarter.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Swifty is SwiftShopr's AI shopping assistant. Ask for outfits,
              meals, or products — get real recommendations with images, prices,
              and direct links.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                Anonymous · No sign-up
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-primary" />
                Real AI · Real products
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container-wide">
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
              {/* Chat header */}
              <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-purple text-white">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Swifty</div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                      <span>AI shopping assistant · online</span>
                    </div>
                  </div>
                </div>
                {messages.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={reset}
                    className="text-xs"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </Button>
                )}
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="max-h-[520px] min-h-[400px] overflow-y-auto px-5 py-6"
              >
                {messages.length === 0 ? (
                  <EmptyState onPick={sendMessage} disabled={sending} />
                ) : (
                  <div className="space-y-5">
                    {messages.map((m) => (
                      <ChatMessage
                        key={m.id}
                        message={m}
                        wakingUp={wakingUp && m.role === 'assistant' && m.loading}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-border bg-background/60 p-4">
                <ChatInput
                  onSend={sendMessage}
                  disabled={sending}
                  placeholder={
                    sending
                      ? 'Swifty is thinking…'
                      : 'Ask Swifty for outfits, recipes, or product ideas…'
                  }
                />
                <div className="mt-3 text-center text-xs text-muted-foreground">
                  Personalized picks, unlimited use, and in-store scan-and-go —{' '}
                  <Link href={appStoreUrl} className="font-medium text-primary hover:underline" target="_blank" rel="noreferrer">
                    get the app
                  </Link>.
                </div>
              </div>
            </div>

            {/* Below chat */}
            <div className="mt-12 grid gap-6 text-center md:grid-cols-3">
              <InfoBlock
                title="Real AI, real products"
                body="Swifty is powered by Claude and queries our live catalog — not canned responses."
              />
              <InfoBlock
                title="Personalization in-app"
                body="In the mobile app, Swifty learns your style, size, and dietary profile for better picks."
              />
              <InfoBlock
                title="No sign-up required"
                body="Try Swifty here anonymously. Your session resets when you close the tab."
              />
            </div>

            <div className="mt-12 text-center">
              <Button asChild variant="gradient" size="xl">
                <Link href={appStoreUrl} target="_blank" rel="noreferrer">
                  <Download className="h-4 w-4" />
                  Get the Full App
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Rate limit modal */}
      <Dialog open={showRateLimit} onOpenChange={setShowRateLimit}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-purple text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <DialogTitle className="text-center">Keep the conversation going</DialogTitle>
            <DialogDescription className="text-center">
              {rateLimit?.message ||
                "You've hit the free message limit for the hour. Get SwiftShopr for unlimited AI shopping and personalized picks."}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-2">
            <Button asChild variant="gradient" size="lg">
              <Link href={appStoreUrl} target="_blank" rel="noreferrer">
                <Download className="h-4 w-4" />
                Download SwiftShopr
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRateLimit(false)}
            >
              Maybe later
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function EmptyState({
  onPick,
  disabled,
}: {
  onPick: (msg: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
      <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple text-white shadow-lg">
        <Sparkles className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold">How can I help you shop?</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Ask for outfit ideas, meal plans, or specific products. Try one of these:
      </p>
      <div className="mt-6 max-w-xl">
        <SuggestionChips onPick={onPick} disabled={disabled} />
      </div>
    </div>
  );
}

function InfoBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{body}</div>
    </div>
  );
}
