"use client";

import { useMemo, useState } from "react";

const timeRanges = ["24h", "3d", "7d", "30d", "90d"];
const regions = ["Global", "NA", "EMEA", "APAC", "LATAM", "ANZ"];
const issues = ["All intents", "Billing", "Connectivity", "Refunds", "Security"];
const scenarios = ["Migration lab", "Production", "Playbook"];

export function GlobalFilters() {
  const [selection, setSelection] = useState({
    scenario: "Migration lab",
    window: "7d",
    region: "Global",
    intent: "Billing",
  });

  const summary = useMemo(
    () => `${selection.window} • ${selection.region} • ${selection.intent.toLowerCase()}`,
    [selection.window, selection.region, selection.intent],
  );

  return (
    <section className="rounded-[32px] border border-border/60 bg-gradient-to-br from-surface via-surface-strong to-surface shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 px-6 py-5">
        <div>
          <p className="text-xs uppercase tracking-[0.4rem] text-muted-foreground">Simulation lane</p>
          <p className="text-sm text-muted-foreground">Choose the story clients will experience.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {scenarios.map((scenario) => (
            <ScenarioChip
              key={scenario}
              label={scenario}
              active={scenario === selection.scenario}
              onSelect={() => setSelection((prev) => ({ ...prev, scenario }))}
            />
          ))}
        </div>
      </div>
      <div className="grid gap-6 px-6 py-6 md:grid-cols-3">
        <FilterGroup
          label="Window"
          options={timeRanges}
          active={selection.window}
          onSelect={(option) => setSelection((prev) => ({ ...prev, window: option }))}
        />
        <FilterGroup
          label="Region"
          options={regions}
          active={selection.region}
          onSelect={(option) => setSelection((prev) => ({ ...prev, region: option }))}
        />
        <FilterGroup
          label="Intent"
          options={issues}
          active={selection.intent}
          onSelect={(option) => setSelection((prev) => ({ ...prev, intent: option }))}
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/40 px-6 py-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-success" />
          Streaming latest sample set
        </span>
        <div className="flex flex-wrap gap-2">
          <StatusBadge label="Now showing" value={summary} />
          <StatusBadge label="Scenario" value={selection.scenario} />
          <StatusBadge label="Mood" value={selection.scenario === "Playbook" ? "Celebratory" : "Confident"} />
        </div>
      </div>
    </section>
  );
}

function FilterGroup({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: string[];
  active: string;
  onSelect: (option: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.4rem] text-muted-foreground">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={
              option === active
                ? "rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-white shadow-glow"
                : "rounded-full border border-border/50 px-4 py-1.5 text-xs text-muted-foreground hover:border-accent/60"
            }
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function ScenarioChip({ label, active, onSelect }: { label: string; active?: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={
        active
          ? "rounded-full bg-foreground/90 px-4 py-1.5 text-xs font-semibold text-surface"
          : "rounded-full border border-border/60 px-4 py-1.5 text-xs text-muted-foreground hover:text-foreground"
      }
    >
      {label}
    </button>
  );
}

function StatusBadge({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border/50 px-3 py-1">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </span>
  );
}
