interface KpiCardProps {
  label: string;
  value: string;
  delta: number;
  descriptor: string;
  trend: "up" | "down" | "flat";
}

export function KpiCard({ label, value, delta, descriptor, trend }: KpiCardProps) {
  const deltaColor =
    trend === "down" ? "text-success" : trend === "up" ? "text-accent" : "text-muted-foreground";
  const deltaSign = delta > 0 ? "+" : "";

  return (
    <div className="rounded-2xl border border-border/60 bg-surface/80 p-5 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-[0.3rem] text-muted-foreground">{label}</p>
      <p className="mt-3 font-display text-4xl font-semibold text-foreground">{value}</p>
      <div className="mt-2 flex items-center gap-3 text-sm">
        <span className={deltaColor}>
          {deltaSign}
          {delta}%
        </span>
        <span className="text-muted-foreground">{descriptor}</span>
      </div>
    </div>
  );
}
