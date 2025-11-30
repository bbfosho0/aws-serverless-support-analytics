import type { ReactNode } from "react";

import type { MockCallRecord } from "../../lib/data/types";

interface CallsTableProps {
  data: MockCallRecord[];
  caption?: string;
}

export function CallsTable({ data, caption }: CallsTableProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-surface/90 shadow-card">
      {caption && <p className="px-6 pt-5 text-sm text-muted-foreground">{caption}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border/60">
          <thead>
            <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
              <th className="px-6 py-3">Case</th>
              <th className="px-4 py-3">Region</th>
              <th className="px-4 py-3">Intent</th>
              <th className="px-4 py-3">Channel</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">CSAT</th>
              <th className="px-4 py-3">Opened</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 text-sm">
            {data.map((call) => (
              <tr key={call.id} className="hover:bg-surface-strong/60">
                <td className="px-6 py-4">
                  <div className="font-medium text-foreground">{call.caseId}</div>
                  <p className="text-xs text-muted-foreground">Handled by {call.agent}</p>
                </td>
                <td className="px-4 py-4">
                  <Badge>{call.region}</Badge>
                </td>
                <td className="px-4 py-4">
                  <p>{call.issue}</p>
                  <p className="text-xs text-muted-foreground">{call.sentiment} sentiment</p>
                </td>
                <td className="px-4 py-4 capitalize">{call.channel}</td>
                <td className="px-4 py-4">
                  {Math.round(call.durationSeconds / 60)}m
                  <Progress value={(call.durationSeconds / 1500) * 100} />
                </td>
                <td className="px-4 py-4">
                  <PriorityLabel priority={call.priority} />
                </td>
                <td className="px-4 py-4">
                  <div className="font-semibold">{call.csat}%</div>
                  <p className="text-xs text-muted-foreground">Δ {call.npsDelta}</p>
                </td>
                <td className="px-4 py-4 text-xs text-muted-foreground">
                  {new Date(call.openedAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-border/70 px-3 py-1 text-xs font-semibold">
      {children}
    </span>
  );
}

function Progress({ value }: { value: number }) {
  return (
    <div className="mt-1 h-1.5 w-full rounded-full bg-border/60">
      <div className="h-full rounded-full bg-accent" style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}

function PriorityLabel({ priority }: { priority: MockCallRecord["priority"] }) {
  const palette: Record<MockCallRecord["priority"], string> = {
    low: "bg-success/15 text-success",
    normal: "bg-muted/20 text-foreground",
    high: "bg-warning/15 text-warning",
    urgent: "bg-danger/20 text-danger",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${palette[priority]}`}>
      {priority}
    </span>
  );
}
