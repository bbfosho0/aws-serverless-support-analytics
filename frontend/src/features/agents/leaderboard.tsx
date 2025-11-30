import type { AgentPerformance } from "../../lib/data/types";

interface AgentsLeaderboardProps {
  agents: AgentPerformance[];
}

export function AgentsLeaderboard({ agents }: AgentsLeaderboardProps) {
  return (
    <div className="rounded-2xl border border-border/60 bg-surface shadow-card">
      <table className="min-w-full divide-y divide-border/60 text-sm">
        <thead className="text-xs uppercase tracking-widest text-muted-foreground">
          <tr>
            <th className="px-6 py-3 text-left">Agent</th>
            <th className="px-4 py-3 text-left">Region</th>
            <th className="px-4 py-3 text-left">CSAT</th>
            <th className="px-4 py-3 text-left">SLA</th>
            <th className="px-4 py-3 text-left">Focus</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/40">
          {agents.map((agent) => (
            <tr key={agent.id} className="hover:bg-surface-strong/60">
              <td className="px-6 py-4">
                <div className="font-semibold text-foreground">{agent.name}</div>
                <p className="text-xs text-muted-foreground">{agent.role}</p>
              </td>
              <td className="px-4 py-4">
                <span className="rounded-full border border-border/70 px-3 py-1 text-xs font-semibold">
                  {agent.region}
                </span>
              </td>
              <td className="px-4 py-4">
                <div className="font-semibold">{agent.csat}%</div>
                <p className="text-xs text-muted-foreground">Sentiment +{agent.sentimentLift}</p>
              </td>
              <td className="px-4 py-4">
                <div className="font-semibold">{agent.sla}%</div>
                <p className="text-xs text-muted-foreground">{agent.avgHandleTime}m AHT</p>
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-wrap gap-2">
                  {agent.focusAreas.map((focus) => (
                    <span key={focus} className="rounded-full bg-muted/20 px-3 py-1 text-xs text-muted-foreground">
                      {focus}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
