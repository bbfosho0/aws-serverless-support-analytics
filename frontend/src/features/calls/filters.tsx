"use client";

import { useMemo } from "react";

import {
  intentOptions,
  regionOptions,
  timeRangeOptions,
  useDemoFilters,
} from "../../lib/state/demoFilters";
import { buildFilterSummary } from "../../lib/utils/callFiltering";

export function CallsFilters() {
  const { selection, setWindow, setRegion, setIntent } = useDemoFilters((state) => ({
    selection: state.selection,
    setWindow: state.setWindow,
    setRegion: state.setRegion,
    setIntent: state.setIntent,
  }));
  const summary = useMemo(() => buildFilterSummary(selection), [selection]);

  return (
    <div className="rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-[0.4rem] text-muted-foreground">Filters</p>
      <div className="mt-4 space-y-4 text-sm">
        <FilterRow label="Window" options={timeRangeOptions} active={selection.window} onSelect={setWindow} />
        <FilterRow label="Region" options={regionOptions} active={selection.region} onSelect={setRegion} />
        <FilterRow label="Intent" options={intentOptions} active={selection.intent} onSelect={setIntent} />
        <div className="rounded-xl border border-border/40 bg-surface-strong/50 px-3 py-2 text-xs text-muted-foreground">
          <p className="uppercase tracking-[0.35rem] text-muted-foreground">Current selection</p>
          <p className="mt-1 text-foreground">{summary}</p>
        </div>
      </div>
    </div>
  );
}

function FilterRow({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: readonly string[];
  active: string;
  onSelect: (option: string) => void;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.35rem] text-muted-foreground">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={
              option === active
                ? "rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent"
                : "rounded-full border border-border/50 px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
            }
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
