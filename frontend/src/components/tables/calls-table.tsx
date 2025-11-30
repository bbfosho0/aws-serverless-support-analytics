import type { ReactNode } from "react";

import type { MockCallRecord } from "../../lib/data/types";

interface CallsTableProps {
  data: MockCallRecord[];
  caption?: string;
}

export function CallsTable({ data, caption }: CallsTableProps) {
  const resolved = data.filter((call) => call.status === "resolved").length;
  const urgent = data.filter((call) => call.priority === "urgent").length;
  const avgHandle = Math.round(
    data.reduce((acc, call) => acc + call.durationSeconds, 0) / Math.max(1, data.length) / 60,
  );

  return (
    <section className="rounded-[32px] border border-border/70 bg-surface/95 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 px-6 py-5">
        <div>
          {caption && <p className="text-xs uppercase tracking-[0.4rem] text-muted-foreground">{caption}</p>}
          <p className="text-sm text-muted-foreground">Synthetic transcript table for recruiters</p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <StatusPill label="Resolved" value={`${resolved}/${data.length}`} />
          <StatusPill label="Urgent" value={urgent.toString()} />
          <StatusPill label="Avg AHT" value={`${avgHandle}m`} />
        </div>
        <button className="rounded-full border border-border/60 px-4 py-2 text-xs font-semibold text-foreground">
          Download CSV
        </button>
      </div>
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
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">First response</th>
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
                <td className="px-4 py-4">
                  <ChannelPill channel={call.channel} />
                </td>
                <td className="px-4 py-4">
                  <span className="font-semibold">{Math.round(call.durationSeconds / 60)}m</span>
                  <Progress value={(call.durationSeconds / 1500) * 100} />
                </td>
                <td className="px-4 py-4">
                  <PriorityLabel priority={call.priority} />
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={call.status} />
                </td>
                <td className="px-4 py-4">
                  <span className="font-semibold">{call.firstResponseMinutes}m</span>
                  <p className="text-xs text-muted-foreground">First touch</p>
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
    </section>
  );
}

function StatusPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border/50 px-3 py-1">
      <span className="uppercase tracking-[0.2rem] text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </span>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-border/70 px-3 py-1 text-xs font-semibold">
      {children}
    </span>
  );
}

function ChannelPill({ channel }: { channel: MockCallRecord["channel"] }) {
  const palette: Record<MockCallRecord["channel"], string> = {
    voice: "bg-sky-500/15 text-sky-200",
    chat: "bg-emerald-500/15 text-emerald-200",
    email: "bg-amber-500/15 text-amber-200",
    sms: "bg-indigo-500/15 text-indigo-200",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${palette[channel]}`}>
      {channel}
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

function StatusBadge({ status }: { status: MockCallRecord["status"] }) {
  const palette: Record<MockCallRecord["status"], string> = {
    resolved: "bg-success/15 text-success",
    pending: "bg-warning/15 text-warning",
    escalated: "bg-danger/15 text-danger",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${palette[status]}`}>
      {status}
    </span>
  );
}
