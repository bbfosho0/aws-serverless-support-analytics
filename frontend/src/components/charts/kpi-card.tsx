import type { DashboardKpi } from "../../lib/data/types";

type KpiCardProps = DashboardKpi;

const palette: Record<DashboardKpi["category"], { gradient: [string, string]; stroke: string; badge: string }> = {
  stability: {
    gradient: ["#38bdf8", "#22d3ee"],
    stroke: "rgba(56,189,248,0.9)",
    badge: "bg-sky-500/15 text-sky-200",
  },
  efficiency: {
    gradient: ["#c084fc", "#a855f7"],
    stroke: "rgba(192,132,252,0.9)",
    badge: "bg-violet-500/15 text-violet-200",
  },
};

export function KpiCard({ label, value, delta, descriptor, trend, category, sparkline, goal }: KpiCardProps) {
  const deltaColor =
    trend === "down" ? "text-success" : trend === "up" ? "text-accent" : "text-muted-foreground";
  const deltaSign = delta > 0 ? "+" : "";
  const { gradient, stroke, badge } = palette[category];
  const { areaPath, linePath } = buildSparklinePath(sparkline);
  const gradientId = `spark-${category}-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3rem] text-muted-foreground">
        <p>{label}</p>
        <span className={`rounded-full px-2 py-0.5 text-[10px] ${badge}`}>{category}</span>
      </div>
      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <p className="font-display text-4xl font-semibold text-foreground">{value}</p>
          <p className="mt-1 text-sm text-muted-foreground">{descriptor}</p>
        </div>
        {goal && (
          <span className="rounded-xl border border-border/60 px-3 py-1 text-xs text-muted-foreground">
            Goal {goal}
          </span>
        )}
      </div>
      <div className="mt-4 flex items-center gap-3 text-sm">
        <span className={`inline-flex items-center gap-1 font-semibold ${deltaColor}`}>
          {trend === "down" && <span aria-hidden>↓</span>}
          {trend === "up" && <span aria-hidden>↑</span>}
          {trend === "flat" && <span aria-hidden>→</span>}
          {deltaSign}
          {delta}%
        </span>
        <span className="text-muted-foreground">vs previous window</span>
      </div>
      <div className="mt-4 h-16 w-full">
        <svg viewBox="0 0 120 60" className="h-full w-full">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradient[0]} stopOpacity="0.4" />
              <stop offset="100%" stopColor={gradient[1]} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#${gradientId})`} opacity={0.8} />
          <path d={linePath} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

function buildSparklinePath(points: number[]) {
  const width = 120;
  const height = 60;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const divisor = Math.max(1, points.length - 1);

  const coords = points.map((value, index) => {
    const x = (index / divisor) * width;
    const normalized = (value - min) / range;
    const y = height - normalized * (height - 10) - 5;
    return { x, y };
  });

  const linePath = coords.map(({ x, y }, index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" ");
  const areaPath = `M0 ${height} ${coords
    .map(({ x, y }) => `L${x} ${y}`)
    .join(" ")} L${width} ${height} Z`;

  return { areaPath, linePath };
}
