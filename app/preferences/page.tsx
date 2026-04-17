'use client';

import * as React from 'react';
import Link from 'next/link';
import { Sparkles, Check, Trash2, Save, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SectionCard } from '@/components/preferences/section-card';
import { ChipSingleSelect, ChipMultiSelect } from '@/components/preferences/chip';
import { usePreferences } from '@/hooks/use-preferences';
import {
  CLOTHING_PREFERENCE_OPTIONS,
  SIZE_OPTIONS,
  BODY_TYPE_OPTIONS,
  STYLE_OPTIONS,
  FIT_OPTIONS,
  COLOR_OPTIONS,
  OCCASION_OPTIONS,
  CLIMATE_OPTIONS,
  MATERIAL_OPTIONS,
} from '@/lib/preferences';
import { cn } from '@/lib/utils';

export default function PreferencesPage() {
  const {
    preferences,
    isLoaded,
    saveStatus,
    updateField,
    toggleArrayField,
    flushSave,
    reset,
  } = usePreferences();

  const [resetOpen, setResetOpen] = React.useState(false);
  const [resetting, setResetting] = React.useState(false);

  // Flush pending save on unmount
  React.useEffect(() => {
    return () => {
      flushSave();
    };
  }, [flushSave]);

  const handleReset = async () => {
    setResetting(true);
    await reset();
    setResetting(false);
    setResetOpen(false);
  };

  // Budget field controlled as string (empty = null)
  const [budgetMinStr, setBudgetMinStr] = React.useState('');
  const [budgetMaxStr, setBudgetMaxStr] = React.useState('');
  React.useEffect(() => {
    setBudgetMinStr(
      typeof preferences.budget_default_min_cents === 'number'
        ? String(preferences.budget_default_min_cents / 100)
        : '',
    );
    setBudgetMaxStr(
      typeof preferences.budget_default_max_cents === 'number'
        ? String(preferences.budget_default_max_cents / 100)
        : '',
    );
  }, [isLoaded, preferences.budget_default_min_cents, preferences.budget_default_max_cents]);

  const commitBudget = (which: 'min' | 'max', raw: string) => {
    const clean = raw.replace(/[^0-9.]/g, '');
    const parsed = clean === '' ? null : Math.round(parseFloat(clean) * 100);
    const value = Number.isFinite(parsed as number) ? parsed : null;
    if (which === 'min') updateField('budget_default_min_cents', value);
    else updateField('budget_default_max_cents', value);
  };

  const brandsText =
    (preferences.preferred_retailers ?? []).join(', ');

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border pt-20 pb-10 md:pt-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 blur-3xl" />
        </div>
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="default" className="mb-6">
              <Sparkles className="mr-1.5 h-3 w-3" />
              My Preferences
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Tell Swifty what <span className="text-gradient">you love.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Your preferences power every recommendation. Set your style, sizes,
              colors, fabrics, and budget — Swifty uses them across every shopping
              query, in this browser and the mobile app.
            </p>
            <p className="mt-6 text-xs text-muted-foreground">
              Saved anonymously in your browser. No sign-up required.
            </p>
          </div>
        </div>
      </section>

      {/* Save status bar */}
      <div
        className={cn(
          'sticky top-16 z-40 border-b border-border backdrop-blur-xl transition-colors',
          saveStatus === 'error'
            ? 'bg-destructive/10'
            : saveStatus === 'saved'
              ? 'bg-primary/5'
              : 'bg-background/80',
        )}
      >
        <div className="container-wide flex h-10 items-center justify-end text-xs font-medium">
          <SaveIndicator status={saveStatus} />
        </div>
      </div>

      {/* Main content */}
      <section className="py-10 md:py-14">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl space-y-8">
            {!isLoaded ? (
              <LoadingSkeleton />
            ) : (
              <>
                <SectionCard
                  title="Shopping For"
                  subtitle="Who are you shopping for? Affects what Swifty shows first."
                >
                  <ChipSingleSelect
                    options={CLOTHING_PREFERENCE_OPTIONS}
                    value={preferences.gender_presentation ?? null}
                    onChange={(v) => updateField('gender_presentation', v)}
                  />
                </SectionCard>

                <SectionCard
                  title="Your Sizes"
                  subtitle="Size hints help Swifty prioritize items available in your size."
                >
                  <div className="space-y-5">
                    <div>
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Top Size
                      </div>
                      <ChipSingleSelect
                        options={SIZE_OPTIONS}
                        value={preferences.size_tops ?? null}
                        onChange={(v) => updateField('size_tops', v)}
                      />
                    </div>
                    <div>
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Bottom Size
                      </div>
                      <ChipSingleSelect
                        options={SIZE_OPTIONS}
                        value={preferences.size_bottoms ?? null}
                        onChange={(v) => updateField('size_bottoms', v)}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Shoe Size (US)
                      </label>
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder="e.g. 8.5"
                        value={preferences.size_shoes ?? ''}
                        onChange={(e) =>
                          updateField(
                            'size_shoes',
                            e.target.value ? e.target.value : null,
                          )
                        }
                        className="w-full max-w-[180px] rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary/60 focus:outline-none"
                      />
                    </div>
                    <div>
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Body Type
                      </div>
                      <ChipSingleSelect
                        options={BODY_TYPE_OPTIONS}
                        value={preferences.body_type ?? null}
                        onChange={(v) => updateField('body_type', v)}
                      />
                    </div>
                  </div>
                </SectionCard>

                <SectionCard
                  title="Your Style"
                  subtitle="Describe your personal style in your own words. Swifty uses this to find outfits that feel like you."
                >
                  <textarea
                    value={preferences.style_description ?? ''}
                    onChange={(e) => updateField('style_description', e.target.value)}
                    maxLength={500}
                    rows={4}
                    placeholder={'e.g. "European minimalist with a coastal vibe" or "Y2K streetwear with a pop of color"'}
                    className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm leading-relaxed focus:border-primary/60 focus:outline-none"
                  />
                  <div className="mt-1 text-right text-xs text-muted-foreground">
                    {(preferences.style_description ?? '').length} / 500
                  </div>
                </SectionCard>

                <SectionCard
                  title="Styles You Love"
                  subtitle="Pick the aesthetics you gravitate toward."
                >
                  <ChipMultiSelect
                    options={STYLE_OPTIONS}
                    values={preferences.style_keywords ?? []}
                    onToggle={(v) => toggleArrayField('style_keywords', v)}
                  />
                </SectionCard>

                <SectionCard title="Fit Preference" subtitle="How do you like your clothes to fit?">
                  <ChipSingleSelect
                    options={FIT_OPTIONS}
                    value={preferences.fit_preference ?? null}
                    onChange={(v) => updateField('fit_preference', v)}
                  />
                </SectionCard>

                <SectionCard
                  title="Colors You Love"
                  subtitle="Swifty will prioritize outfits in these colors."
                >
                  <ChipMultiSelect
                    options={COLOR_OPTIONS}
                    values={preferences.colors_love ?? []}
                    onToggle={(v) => toggleArrayField('colors_love', v)}
                  />
                </SectionCard>

                <SectionCard
                  title="Colors to Avoid"
                  subtitle="Swifty will filter these out."
                >
                  <ChipMultiSelect
                    options={COLOR_OPTIONS}
                    values={preferences.colors_avoid ?? []}
                    onToggle={(v) => toggleArrayField('colors_avoid', v)}
                    danger
                  />
                </SectionCard>

                <SectionCard
                  title="What Do You Dress For?"
                  subtitle="Pick your main occasions so outfits feel situationally right."
                >
                  <ChipMultiSelect
                    options={OCCASION_OPTIONS}
                    values={preferences.dress_for_occasions ?? []}
                    onToggle={(v) => toggleArrayField('dress_for_occasions', v)}
                  />
                </SectionCard>

                <SectionCard
                  title="Your Climate"
                  subtitle="Helps Swifty pick weather-appropriate fabrics."
                >
                  <ChipSingleSelect
                    options={CLIMATE_OPTIONS}
                    value={preferences.climate ?? null}
                    onChange={(v) => updateField('climate', v)}
                  />
                </SectionCard>

                <SectionCard
                  title="Budget Per Item"
                  subtitle="Optional range to guide Swifty's picks."
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Min $
                      </label>
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder="0"
                        value={budgetMinStr}
                        onChange={(e) => setBudgetMinStr(e.target.value)}
                        onBlur={() => commitBudget('min', budgetMinStr)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary/60 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Max $
                      </label>
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder="500"
                        value={budgetMaxStr}
                        onChange={(e) => setBudgetMaxStr(e.target.value)}
                        onBlur={() => commitBudget('max', budgetMaxStr)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary/60 focus:outline-none"
                      />
                    </div>
                  </div>
                </SectionCard>

                <SectionCard
                  title="Fabrics You Love"
                  subtitle="Soft signal for Swifty to prioritize."
                >
                  <ChipMultiSelect
                    options={MATERIAL_OPTIONS}
                    values={preferences.material_likes ?? []}
                    onToggle={(v) => toggleArrayField('material_likes', v)}
                  />
                </SectionCard>

                <SectionCard
                  title="Fabrics to Avoid"
                  subtitle="Swifty will filter these out of all outfits."
                >
                  <ChipMultiSelect
                    options={MATERIAL_OPTIONS}
                    values={preferences.material_dislikes ?? []}
                    onToggle={(v) => toggleArrayField('material_dislikes', v)}
                    danger
                  />
                </SectionCard>

                <SectionCard
                  title="Favorite Brands"
                  subtitle="Comma-separated — Swifty will give these a boost."
                >
                  <input
                    type="text"
                    placeholder="e.g. Aritzia, Everlane, COS"
                    defaultValue={brandsText}
                    onBlur={(e) => {
                      const next = e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean)
                        .slice(0, 50);
                      updateField('preferred_retailers', next);
                    }}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary/60 focus:outline-none"
                  />
                </SectionCard>

                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => setResetOpen(true)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Reset All Preferences
                  </Button>
                </div>

                <div className="pt-2 text-center">
                  <Button asChild variant="gradient" size="lg">
                    <Link href="/swifty/">
                      Try Swifty with your preferences
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Reset confirmation */}
      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-destructive/10 text-destructive">
              <AlertCircle className="h-5 w-5" />
            </div>
            <DialogTitle className="text-center">Reset all preferences?</DialogTitle>
            <DialogDescription className="text-center">
              This clears every field and generates a fresh anonymous identity.
              Your saved profile will be deleted from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-2">
            <Button
              variant="destructive"
              size="lg"
              disabled={resetting}
              onClick={handleReset}
            >
              {resetting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              Yes, reset everything
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setResetOpen(false)}
              disabled={resetting}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function SaveIndicator({ status }: { status: 'idle' | 'saving' | 'saved' | 'error' }) {
  if (status === 'saving') {
    return (
      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        Saving…
      </span>
    );
  }
  if (status === 'saved') {
    return (
      <span className="inline-flex items-center gap-1.5 text-primary">
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
        Saved
      </span>
    );
  }
  if (status === 'error') {
    return (
      <span className="inline-flex items-center gap-1.5 text-destructive">
        <AlertCircle className="h-3.5 w-3.5" />
        Save failed — changes reverted
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground/60">
      <Save className="h-3.5 w-3.5" />
      Auto-saves as you change anything
    </span>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
}
