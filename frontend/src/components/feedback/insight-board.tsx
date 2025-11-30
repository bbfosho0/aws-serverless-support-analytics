import type { InsightCard } from "../../lib/data/types";

interface InsightBoardProps {
  insights: InsightCard[];
}

export function InsightBoard({ insights }: InsightBoardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {insights.map((insight) => (
        <article
          key={insight.title}
          className="rounded-2xl border border-border/60 bg-surface p-5 shadow-card"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4rem] text-muted-foreground">
            {insight.severity}
          </p>
          <h4 className="mt-2 font-semibold text-foreground">{insight.title}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{insight.detail}</p>
          <p className="mt-3 text-xs font-semibold text-accent">{insight.action}</p>
        </article>
      ))}
    </div>
  );
}
