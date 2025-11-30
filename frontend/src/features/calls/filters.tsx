const intents = ["All intents", "Billing", "Security", "Onboarding", "Voice" ];
const priorities = ["Any", "High", "Urgent"];
const channels = ["Voice", "Chat", "Email", "SMS"];

export function CallsFilters() {
  return (
    <div className="rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-[0.4rem] text-muted-foreground">Filters</p>
      <div className="mt-4 space-y-4 text-sm">
        <FilterRow label="Intent" options={intents} active="Billing" />
        <FilterRow label="Priority" options={priorities} active="High" />
        <FilterRow label="Channel" options={channels} active="Voice" />
        <div>
          <p className="text-xs uppercase tracking-[0.35rem] text-muted-foreground">Duration</p>
          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <span>4m</span>
            <div className="h-1 flex-1 rounded-full bg-border/70">
              <div className="h-full w-3/4 rounded-full bg-accent" />
            </div>
            <span>22m</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterRow({ label, options, active }: { label: string; options: string[]; active: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.35rem] text-muted-foreground">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <span
            key={option}
            className={
              option === active
                ? "rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent"
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
