interface DashboardHeroProps {
  totalInteractions: number;
  backlogMinutes: number;
  refreshEta: string;
  focusStreams: string[];
}

export function DashboardHero({ totalInteractions, backlogMinutes, refreshEta, focusStreams }: DashboardHeroProps) {
  return (
    <section className="rounded-3xl border border-border/70 bg-gradient-to-br from-surface via-surface-strong to-surface shadow-glow">
      <div className="grid gap-6 p-6 md:grid-cols-[2fr_1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.5rem] text-muted-foreground">Live signal</p>
          <h2 className="mt-2 font-display text-4xl font-semibold text-foreground">
            {totalInteractions.toLocaleString()} interactions streaming into the EFT mirror
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Real-time FastAPI endpoints replay S3 + Glue output so front-line teams can anticipate
            spikes hours before the production cutover.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs">
            <Tag label="Backlog" value={`${backlogMinutes}m`} subtle />
            <Tag label="Next refresh" value={refreshEta} />
            <Tag label="Simulated" value="Local-first" subtle />
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.4rem] text-muted-foreground">Focus streams</p>
          <ul className="mt-4 space-y-3 text-sm">
            {focusStreams.map((stream) => (
              <li key={stream} className="flex items-center justify-between">
                <span className="text-foreground">{stream}</span>
                <span className="rounded-full bg-accent/15 px-3 py-0.5 text-xs text-accent">tracking</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Tag({ label, value, subtle = false }: { label: string; value: string; subtle?: boolean }) {
  return (
    <span
      className={
        subtle
          ? "inline-flex items-center gap-2 rounded-full border border-border/50 px-3 py-1 text-muted-foreground"
          : "inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-accent"
      }
    >
      <span className="uppercase tracking-widest">{label}</span>
      <strong className="text-sm font-semibold text-foreground">{value}</strong>
    </span>
  );
}
