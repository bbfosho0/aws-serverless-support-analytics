import { callsDataset } from "./calls-data";
import type {
  DashboardKpi,
  InsightCard,
  IssueBreakdownEntry,
  RegionPerformanceEntry,
  VolumePoint,
} from "./types";

const totalDuration = callsDataset.reduce((acc, call) => acc + call.durationSeconds, 0);
const resolvedCalls = callsDataset.filter((call) => call.status === "resolved");
const escalationRate =
  (callsDataset.filter((call) => call.status === "escalated").length / callsDataset.length) * 100;

function buildSparkline(seed: number, length = 12): number[] {
  return Array.from({ length }, (_, index) => {
    const base = seed + index * 0.6;
    const wave = Math.sin((index + seed) / 2.5) * 3;
    return parseFloat((base + wave).toFixed(1));
  });
}

export const dashboardKpis: DashboardKpi[] = [
  {
    label: "Total interactions",
    value: callsDataset.length.toLocaleString(),
    delta: 8.2,
    trend: "up",
    descriptor: "vs. previous 7 days",
    category: "stability",
    sparkline: buildSparkline(68),
    goal: "+5%",
  },
  {
    label: "Avg handle time",
    value: `${Math.round(totalDuration / callsDataset.length / 60)}m`,
    delta: -4.3,
    trend: "down",
    descriptor: "target 12m",
    category: "efficiency",
    sparkline: buildSparkline(14),
    goal: "≤ 12m",
  },
  {
    label: "Resolution rate",
    value: `${((resolvedCalls.length / callsDataset.length) * 100).toFixed(1)}%`,
    delta: 2.1,
    trend: "up",
    descriptor: "cases closed first touch",
    category: "stability",
    sparkline: buildSparkline(82),
    goal: "≥ 90%",
  },
  {
    label: "Escalation",
    value: `${escalationRate.toFixed(1)}%`,
    delta: 1.3,
    trend: "down",
    descriptor: "critical transfers",
    category: "efficiency",
    sparkline: buildSparkline(9),
    goal: "< 8%",
  },
];

function buildVolumeSeries(): VolumePoint[] {
  const seriesMap = new Map<string, VolumePoint>();
  callsDataset.forEach((call) => {
    const dateKey = call.openedAt.slice(0, 10);
    const existing = seriesMap.get(dateKey) ?? {
      date: dateKey,
      voice: 0,
      chat: 0,
      email: 0,
      total: 0,
      forecast: 0,
    };
    const next = { ...existing };
    next.total += 1;
    if (call.channel === "voice") next.voice += 1;
    if (call.channel === "chat") next.chat += 1;
    if (call.channel === "email") next.email += 1;
    seriesMap.set(dateKey, next);
  });
  const compacted = Array.from(seriesMap.values()).slice(-14);
  return compacted.map((point, index, arr) => {
    const seasonalWave = Math.sin(index / 2.2) * 6;
    const growthDrift = index - arr.length / 2;
    const adjusted = point.total + seasonalWave + growthDrift;
    return {
      ...point,
      forecast: Math.max(0, Math.round(adjusted + 5)),
    };
  });
}

export const callVolumeSeries = buildVolumeSeries();

function buildIssueBreakdown(): IssueBreakdownEntry[] {
  const map = new Map<string, number>();
  callsDataset.forEach((call) => {
    map.set(call.issue, (map.get(call.issue) ?? 0) + 1);
  });
  return Array.from(map.entries())
    .map(([issue, count], index) => ({
      issue,
      count,
      percentage: parseFloat(((count / callsDataset.length) * 100).toFixed(1)),
      trend: (index % 3) * 1.5 - 1,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}

export const issueBreakdown = buildIssueBreakdown();

function buildRegionPerformance(): RegionPerformanceEntry[] {
  const map = new Map<string, RegionPerformanceEntry>();
  callsDataset.forEach((call, index) => {
    const entry =
      map.get(call.region) ?? {
        region: call.region,
        volume: 0,
        csat: 78,
        sla: 88,
        escalations: 0,
      };
    entry.volume += 1;
    entry.csat = Math.min(97, entry.csat + ((index % 5) - 2) * 0.3);
    entry.sla = Math.min(98, entry.sla + ((index % 7) - 3) * 0.4);
    if (call.status === "escalated") entry.escalations += 1;
    map.set(call.region, entry);
  });
  return Array.from(map.values()).sort((a, b) => b.volume - a.volume);
}

export const regionPerformance = buildRegionPerformance();

export const proactiveInsights: InsightCard[] = [
  {
    title: "Voice volume spiked in EMEA",
    detail: "37% WoW increase tied to carrier migrations. NOC already deployed traffic shaping.",
    action: "Review carrier routing table",
    severity: "warning",
  },
  {
    title: "Billing chat backlog cleared",
    detail: "Queue wait dropped below 60s after AI deflection update shipped last night.",
    action: "Extend intent model to refund flows",
    severity: "info",
  },
  {
    title: "Security escalations contained",
    detail: "Only 3 escalations triggered in last 24h; still above baseline but trending downward.",
    action: "Keep purple team on-call until Friday",
    severity: "critical",
  },
];

export const recentCalls = callsDataset.slice(0, 20);
