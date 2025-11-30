"use client";

import { useCallback, useMemo, useState } from "react";
import type { InsightCard } from "../../lib/data/types";

interface InsightBoardProps {
  insights: InsightCard[];
}

const severityPalette: Record<InsightCard["severity"], { border: string; badge: string; accent: string; icon: string }> = {
  info: { border: "border-sky-500/30", badge: "bg-sky-500/15 text-sky-200", accent: "text-sky-200", icon: "ℹ" },
  warning: {
    border: "border-amber-500/30",
    badge: "bg-amber-500/15 text-amber-200",
    accent: "text-amber-200",
    icon: "⚠",
  },
  critical: {
    border: "border-rose-500/30",
    badge: "bg-rose-500/15 text-rose-200",
    accent: "text-rose-200",
    icon: "⛑",
  },
};

export function InsightBoard({ insights }: InsightBoardProps) {
  const [message, setMessage] = useState("Cue up a talking point and we&apos;ll keep score for you.");
  const [activeInsight, setActiveInsight] = useState<InsightCard | null>(null);

  const briefingText = useMemo(
    () =>
      insights
        .map((insight) => `${insight.title} — ${insight.detail} | Action: ${insight.action}`)
        .join("\n"),
    [insights],
  );

  const handleExport = useCallback(() => {
    const blob = new Blob([briefingText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "client-briefing.txt";
    link.click();
    URL.revokeObjectURL(link.href);
    setMessage("Briefing exported — share it before the meeting starts.");
  }, [briefingText]);

  const handlePlaybook = useCallback((insight: InsightCard) => {
    setActiveInsight(insight);
    setMessage(`Playbook opened for “${insight.title}”. Reference the quick notes below.`);
  }, []);

  return (
    <section id="insights" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.4rem] text-muted-foreground">Insights stream</p>
          <p className="text-sm text-muted-foreground">Friendly sound bites for your client walk-through.</p>
          <p className="text-xs text-accent">{message}</p>
        </div>
        <button
          type="button"
          onClick={handleExport}
          className="rounded-full border border-border/60 px-4 py-2 text-xs font-semibold text-foreground"
        >
          Export briefing
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {insights.map((insight) => {
          const palette = severityPalette[insight.severity];
          return (
            <article
              key={insight.title}
              className={`rounded-3xl border ${palette.border} bg-surface/95 p-5 shadow-card backdrop-blur`}
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3rem]">
                <span className={`rounded-full px-3 py-1 text-[10px] ${palette.badge}`}>{insight.severity}</span>
                <span className={palette.accent}>{palette.icon}</span>
              </div>
              <h4 className="mt-3 text-lg font-semibold text-foreground">{insight.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{insight.detail}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>Action</span>
                <span className="font-semibold text-foreground">{insight.action}</span>
              </div>
              <button
                type="button"
                onClick={() => handlePlaybook(insight)}
                className="mt-3 w-full rounded-2xl border border-border/50 px-3 py-2 text-xs font-semibold text-foreground hover:border-foreground"
              >
                Open playbook
              </button>
            </article>
          );
        })}
      </div>
      {activeInsight && (
        <div className="rounded-3xl border border-border/60 bg-surface/90 p-4 text-sm text-foreground">
          <p className="text-xs uppercase tracking-[0.35rem] text-muted-foreground">Playbook notes</p>
          <h4 className="mt-1 text-lg font-semibold">{activeInsight.title}</h4>
          <p className="mt-2 text-muted-foreground">{activeInsight.detail}</p>
          <p className="mt-3 text-foreground">
            <strong>Next step:</strong> {activeInsight.action}
          </p>
        </div>
      )}
    </section>
  );
}
