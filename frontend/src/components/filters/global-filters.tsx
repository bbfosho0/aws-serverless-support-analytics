const timeRanges = ["24h", "3d", "7d", "30d", "90d"];
const regions = ["Global", "NA", "EMEA", "APAC", "LATAM", "ANZ"];
const issues = ["All intents", "Billing", "Connectivity", "Refunds", "Security"];

export function GlobalFilters() {
  return (
    <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-surface via-surface-strong/50 to-surface shadow-card">
      <div className="grid gap-6 px-6 py-5 md:grid-cols-3">
        <FilterGroup label="Window" options={timeRanges} active="7d" />
        <FilterGroup label="Region" options={regions} active="Global" />
        <FilterGroup label="Intent" options={issues} active="Billing" />
      </div>
    </div>
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
          <span
            key={option}
            className={
              option === active
                ? "rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-white shadow-glow"
                : "rounded-full border border-border/50 px-3 py-1 text-xs text-muted-foreground"
            }
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
}
