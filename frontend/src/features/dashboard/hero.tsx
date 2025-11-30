interface DashboardHeroProps {
  totalInteractions: number;
  backlogMinutes: number;
  refreshEta: string;
  focusStreams: string[];
  slaAttainment: number;
  slaTarget: number;
}

export function DashboardHero({
  totalInteractions,
  backlogMinutes,
  refreshEta,
  focusStreams,
  slaAttainment,
  slaTarget,
}: DashboardHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-border/60 bg-gradient-to-br from-surface via-surface-strong to-surface shadow-glow">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-32 left-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-primary/20 blur-[180px]" />
      </div>
      <div className="relative grid gap-8 p-8 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.4rem] text-white/80">
            Local-first mirror
          </span>
          <div>
            <h1 className="font-display text-4xl font-semibold text-foreground md:text-5xl">
              Observability cockpit for AWS contact centers
            </h1>
            <p className="mt-4 text-base text-muted-foreground">
              FastAPI streams replay last-night&apos;s Glue tables so you can model migrations, prove
              SLAs, and demo a full contact-center telemetry stack entirely on a laptop.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs md:text-sm">
            <Tag label="Live backlog" value={`${backlogMinutes}m`} subtle />
            <Tag label="Next refresh" value={refreshEta} subtle={false} />
            <Tag label="View manifests" value="data/manifest.json" subtle />
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-surface transition hover:translate-y-0.5">
              Launch dashboard
              <span aria-hidden>↗</span>
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-border/60 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-foreground">
              Trigger ETL refresh
            </button>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            {focusStreams.map((stream) => (
              <span
                key={stream}
                className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-surface/60 px-4 py-1 text-xs uppercase tracking-widest text-muted-foreground"
              >
                <span className="h-2 w-2 rounded-full bg-accent" />
                {stream}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-5 rounded-3xl border border-border/60 bg-surface/90 p-6 shadow-lg">
          <div>
            <p className="text-xs uppercase tracking-[0.4rem] text-muted-foreground">SLA attainment</p>
            <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
              <SlaDial value={slaAttainment} target={slaTarget} />
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-foreground">{slaAttainment.toFixed(1)}%</p>
                  <p className="text-muted-foreground">Current simulated SLA</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{slaTarget}%</p>
                  <p className="text-muted-foreground">Target set for employer demo</p>
                </div>
                <p className="rounded-2xl bg-accent/10 px-4 py-2 text-xs text-accent">
                  Holding steady — surge playbook not required.
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4rem] text-muted-foreground">Mirror timeline</p>
            <div className="mt-4 grid gap-3 text-sm">
              <TimelineItem label="Parquet ingest" value="00:02" detail="Polars ETL replay" />
              <TimelineItem label="Schema sync" value="00:45" detail="openapi-typescript clients" />
              <TimelineItem label="Next.js hydrate" value="00:58" detail="All dashboards warm" />
            </div>
          </div>
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
          ? "inline-flex items-center gap-2 rounded-full border border-border/40 bg-surface/70 px-3 py-1 text-muted-foreground"
          : "inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-accent"
      }
    >
      <span className="uppercase tracking-widest">{label}</span>
      <strong className="text-sm font-semibold text-foreground">{value}</strong>
    </span>
  );
}

function SlaDial({ value, target }: { value: number; target: number }) {
  const radius = 56;
  const stroke = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / 100, 1);
  const offset = circumference - progress * circumference;

  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
        <defs>
          <linearGradient id="dialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(148, 163, 184, 0.3)" strokeWidth={stroke} />
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="url(#dialGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-3xl font-semibold text-foreground">{value.toFixed(1)}%</p>
        <p className="text-xs uppercase tracking-[0.3rem] text-muted-foreground">SLA</p>
        <p className="text-[11px] text-muted-foreground">Target {target}%</p>
      </div>
    </div>
  );
}

function TimelineItem({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border/40 bg-surface px-4 py-2">
      <div>
        <p className="text-xs uppercase tracking-[0.3rem] text-muted-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">{detail}</p>
      </div>
      <p className="text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}
