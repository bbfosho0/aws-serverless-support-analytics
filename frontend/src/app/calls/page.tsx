import { AppShell } from "../../components/layout/app-shell";
import { CallsTable } from "../../components/tables/calls-table";
import { CallsFilters } from "../../features/calls/filters";
import { callsDataset, highlightedCalls, longRunningCalls } from "../../lib/data/calls-data";

export default function CallsPage() {
  const callsSubset = callsDataset.slice(0, 40);
  return (
    <AppShell title="Calls explorer" description="Filters feed the EFT so QA teams can spot drift before AWS cutover.">
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-6">
          <CallsFilters />
          <FocusCard title="Longest running" items={longRunningCalls.slice(0, 4).map((call) => `${call.caseId} · ${Math.round(call.durationSeconds / 60)}m`)} />
          <FocusCard title="Escalations" items={highlightedCalls.filter((call) => call.status === "escalated").map((call) => `${call.caseId} · ${call.region}`)} />
        </div>
        <div className="space-y-6">
          <CallsTable data={callsSubset} caption="Streamed from local Parquet sample" />
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard label="Avg sentiment" value="+2.8" detail="AI assist uplift" />
            <StatCard label="FCR" value="71%" detail="First contact resolution" />
            <StatCard label="SLA" value="96.4%" detail="Premium queues" />
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function FocusCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-surface p-4 shadow-card">
      <p className="text-xs uppercase tracking-[0.4rem] text-muted-foreground">{title}</p>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item} className="rounded-xl bg-surface-strong/70 px-3 py-2 text-foreground">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-surface/80 p-4 text-sm shadow-card">
      <p className="text-xs uppercase tracking-[0.4rem] text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}
