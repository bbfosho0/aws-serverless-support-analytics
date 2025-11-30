import type { IssueBreakdownEntry } from "../../lib/data/types";

interface CategoryBreakdownProps {
  items: IssueBreakdownEntry[];
}

export function CategoryBreakdown({ items }: CategoryBreakdownProps) {
  const max = Math.max(...items.map((item) => item.count));
  return (
    <div className="rounded-3xl border border-border/70 bg-surface p-5 shadow-card">
      <p className="text-xs uppercase tracking-[0.4rem] text-muted-foreground">Intent mix</p>
      <div className="mt-4 space-y-3 text-sm">
        {items.map((item) => (
          <div key={item.issue}>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-foreground">{item.issue}</p>
              <p className="text-xs text-muted-foreground">{item.percentage}%</p>
            </div>
            <div className="mt-1 h-2 rounded-full bg-border/60">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-strong"
                style={{ width: `${(item.count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
