import type { RegionPerformanceEntry } from "../../lib/data/types";

interface RegionGridProps {
  regions: RegionPerformanceEntry[];
}

export function RegionGrid({ regions }: RegionGridProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.4rem] text-muted-foreground">Regional posture</p>
          <p className="text-sm text-muted-foreground">Performance mirrors Amazon Connect workloads</p>
        </div>
        <span className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground">
          {regions.length} geos
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {regions.map((region) => (
          <RegionCard key={region.region} region={region} />
        ))}
      </div>
    </section>
  );
}

function RegionCard({ region }: { region: RegionPerformanceEntry }) {
  const queueTime = Math.max(4, Math.round(region.volume / 18));
  return (
    <article className="rounded-3xl border border-border/60 bg-surface/90 p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3rem] text-muted-foreground">Region</p>
          <h4 className="text-lg font-semibold text-foreground">{region.region}</h4>
        </div>
        <span className="rounded-full border border-border/40 px-3 py-1 text-xs text-muted-foreground">
          {region.volume} calls
        </span>
      </div>
      <div className="mt-4 grid gap-3 text-sm">
        <Metric label="CSAT" value={`${region.csat.toFixed(1)}%`} percentage={region.csat} accent="accent" />
        <Metric label="SLA" value={`${region.sla.toFixed(1)}%`} percentage={region.sla} accent="success" />
        <Metric label="Escalations" value={`${region.escalations}`} percentage={Math.min(100, region.escalations * 5)} accent="danger" />
        <Metric label="Queue" value={`${queueTime} mins`} percentage={Math.min(100, (queueTime / 15) * 100)} accent="warning" />
      </div>
    </article>
  );
}

function Metric({
  label,
  value,
  percentage,
  accent,
}: {
  label: string;
  value: string;
  percentage: number;
  accent: "accent" | "success" | "danger" | "warning";
}) {
  const palette: Record<"accent" | "success" | "danger" | "warning", string> = {
    accent: "bg-accent",
    success: "bg-success",
    danger: "bg-danger",
    warning: "bg-warning",
  };
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span className="font-semibold text-foreground">{value}</span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-border/50">
        <div className={`h-full rounded-full ${palette[accent]}`} style={{ width: `${Math.min(100, percentage)}%` }} />
      </div>
    </div>
  );
}
