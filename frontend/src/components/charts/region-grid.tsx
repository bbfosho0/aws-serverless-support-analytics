import type { RegionPerformanceEntry } from "../../lib/data/types";

interface RegionGridProps {
  regions: RegionPerformanceEntry[];
}

export function RegionGrid({ regions }: RegionGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {regions.map((region) => (
        <div
          key={region.region}
          className="rounded-2xl border border-border/70 bg-surface p-4 shadow-card"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">{region.region}</h4>
            <span className="text-xs text-muted-foreground">{region.volume} calls</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Metric label="CSAT" value={`${region.csat.toFixed(1)}%`} />
            <Metric label="SLA" value={`${region.sla.toFixed(1)}%`} />
            <Metric label="Escalations" value={`${region.escalations}`} />
            <Metric label="Queue" value={`${Math.max(4, Math.round(region.volume / 18))} min`} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold text-foreground">{value}</p>
    </div>
  );
}
