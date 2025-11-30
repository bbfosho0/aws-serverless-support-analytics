import type { IssueBreakdownEntry } from "../../lib/data/types";

interface CategoryBreakdownProps {
  items: IssueBreakdownEntry[];
}

export function CategoryBreakdown({ items }: CategoryBreakdownProps) {
  const max = Math.max(...items.map((item) => item.count));
  return (
    <div className="rounded-[32px] border border-border/70 bg-surface/90 p-6 shadow-card">
      <p className="text-xs uppercase tracking-[0.4rem] text-muted-foreground">Intent mix</p>
      <p className="text-sm text-muted-foreground">Top issues captured via Glue manifest</p>
      <div className="mt-5 space-y-3 text-sm">
        {items.map((item) => (
          <div key={item.issue} className="rounded-2xl border border-border/50 bg-surface px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{item.issue}</p>
                <p className="text-xs text-muted-foreground">{item.count} cases</p>
              </div>
              <TrendBadge value={item.trend} />
            </div>
            <div className="mt-3 h-2 rounded-full bg-border/40">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-indigo-400"
                style={{ width: `${(item.count / max) * 100}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{item.percentage}% of all interactions</span>
              <span>Trend window 7d</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendBadge({ value }: { value: number }) {
  const direction = value > 0 ? "up" : value < 0 ? "down" : "flat";
  const label = direction === "up" ? "Rising" : direction === "down" ? "Falling" : "Even";
  const color =
    direction === "up"
      ? "bg-warning/15 text-warning"
      : direction === "down"
      ? "bg-success/15 text-success"
      : "bg-muted/20 text-muted-foreground";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${color}`}>
      {direction === "up" && <span aria-hidden>↑</span>}
      {direction === "down" && <span aria-hidden>↓</span>}
      {direction === "flat" && <span aria-hidden>→</span>}
      {label}
    </span>
  );
}
