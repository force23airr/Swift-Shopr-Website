'use client';

import * as React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Option } from '@/lib/preferences';

interface BaseChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
}

function Chip({ label, selected, onClick, danger, disabled }: BaseChipProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all',
        'disabled:pointer-events-none disabled:opacity-50',
        !selected &&
          'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground',
        selected && !danger &&
          'border-primary bg-primary/10 text-primary',
        selected && danger &&
          'border-destructive bg-destructive/10 text-destructive',
      )}
    >
      {selected && !danger && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      {selected && danger && <X className="h-3.5 w-3.5" strokeWidth={3} />}
      <span>{label}</span>
    </button>
  );
}

export function ChipSingleSelect<V extends string>({
  options,
  value,
  onChange,
  danger,
  disabled,
}: {
  options: Option<V>[];
  value: V | null | undefined;
  onChange: (v: V | null) => void;
  danger?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <Chip
          key={String(opt.key)}
          label={opt.label}
          selected={value === opt.key}
          danger={danger}
          disabled={disabled}
          onClick={() => onChange(value === opt.key ? null : opt.key)}
        />
      ))}
    </div>
  );
}

export function ChipMultiSelect<V extends string>({
  options,
  values,
  onToggle,
  danger,
  disabled,
}: {
  options: Option<V>[];
  values: V[];
  onToggle: (v: V) => void;
  danger?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <Chip
          key={String(opt.key)}
          label={opt.label}
          selected={values.includes(opt.key)}
          danger={danger}
          disabled={disabled}
          onClick={() => onToggle(opt.key)}
        />
      ))}
    </div>
  );
}
