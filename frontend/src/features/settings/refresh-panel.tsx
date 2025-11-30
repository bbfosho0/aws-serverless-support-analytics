import type { RefreshEvent, SettingsDiagnostic } from "../../lib/data/types";

interface RefreshPanelProps {
  diagnostics: SettingsDiagnostic[];
  history: RefreshEvent[];
}

export function RefreshPanel({ diagnostics, history }: RefreshPanelProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.4rem] text-muted-foreground">Data plane</p>
        <dl className="mt-4 space-y-4 text-sm">
          {diagnostics.map((item) => (
            <div key={item.label} className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{item.label}</dt>
              <dd className="text-right font-semibold text-foreground">
                {item.value}
                {item.hint && <p className="text-xs font-normal text-muted-foreground">{item.hint}</p>}
              </dd>
            </div>
          ))}
        </dl>
        <button className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white">
          Trigger refresh
        </button>
      </div>
      <div className="rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.4rem] text-muted-foreground">History</p>
        <ul className="mt-4 space-y-4 text-sm">
          {history.map((event) => (
            <li key={event.id} className="rounded-xl border border-border/60 p-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">{event.timestamp.replace("T", " ")}</span>
                <StatusPill status={event.result} />
              </div>
              <p className="text-xs text-muted-foreground">
                {event.durationSeconds}s · {event.note ?? "Scheduled"}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: RefreshEvent["result"] }) {
  const palette: Record<RefreshEvent["result"], string> = {
    success: "bg-success/20 text-success",
    partial: "bg-warning/20 text-warning",
    failed: "bg-danger/20 text-danger",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${palette[status]}`}>
      {status}
    </span>
  );
}
