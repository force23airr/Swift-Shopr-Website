'use client';

import { useSuggestions } from '@/hooks/use-suggestions';
import { cn } from '@/lib/utils';

export function SuggestionChips({
  onPick,
  disabled,
}: {
  onPick: (text: string) => void;
  disabled?: boolean;
}) {
  const { suggestions } = useSuggestions();

  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((s, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onPick(s.text)}
          disabled={disabled}
          className={cn(
            'rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all',
            'hover:border-primary/40 hover:bg-primary/5 hover:text-foreground',
            'disabled:pointer-events-none disabled:opacity-50',
          )}
        >
          {s.text}
        </button>
      ))}
    </div>
  );
}
