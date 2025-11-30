const timeRanges = ["24h", "3d", "7d", "30d", "90d"];
const regions = ["Global", "NA", "EMEA", "APAC", "LATAM", "ANZ"];
const issues = ["All intents", "Billing", "Connectivity", "Refunds", "Security"];
const scenarios = ["Migration lab", "Production", "Playbook"];

export function GlobalFilters() {
  return (
    <section className="rounded-[32px] border border-border/60 bg-gradient-to-br from-surface via-surface-strong to-surface shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 px-6 py-5">
        <div>
          <p className="text-xs uppercase tracking-[0.4rem] text-muted-foreground">Simulation lane</p>
          <p className="text-sm text-muted-foreground">Toggle the narrative employers will see during the demo.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {scenarios.map((scenario) => (
            <ScenarioChip key={scenario} label={scenario} active={scenario === "Migration lab"} />
          ))}
        </div>
      </div>
      <div className="grid gap-6 px-6 py-6 md:grid-cols-3">
        <FilterGroup label="Window" options={timeRanges} active="7d" />
        <FilterGroup label="Region" options={regions} active="Global" />
        <FilterGroup label="Intent" options={issues} active="Billing" />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/40 px-6 py-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-success" />
          Streaming from sample_calls.json
        </span>
        <div className="flex flex-wrap gap-2">
          <StatusBadge label="Timezone" value="UTC" />
          <StatusBadge label="Version" value="rev-14" />
          <StatusBadge label="Snapshot" value="Today 04:00" />
        </div>
      </div>
    </section>
  );
}

function FilterGroup({
  label,
  options,
  active,
}: {
  label: string;
  options: string[];
  active: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.4rem] text-muted-foreground">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
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

function ScenarioChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      type="button"
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
