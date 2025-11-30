import { callsDataset } from "./calls-data";
import type { DashboardKpi } from "./types";

export interface ChannelMetric {
  channel: string;
  share: number;
  csat: number;
  automation: number;
  avgHandleTime: number;
}

export interface SlaTrendPoint {
  label: string;
  sla: number;
  backlogMinutes: number;
}

export interface AutomationProgram {
  id: string;
  name: string;
  coverage: number;
  target: number;
  owner: string;
  descriptor: string;
}

const totalCalls = callsDataset.length;
const firstResponseAvg =
  callsDataset.reduce((acc, call) => acc + call.firstResponseMinutes, 0) / totalCalls;
const firstContactResolutionRate =
  (callsDataset.filter((call) => call.firstContactResolution).length / totalCalls) * 100;
const automationAssistRate = 38.5;
const proactiveSaveMinutes = Math.round(totalCalls * 0.18);

export const metricsKpis: DashboardKpi[] = [
  {
    label: "First response",
    value: `${firstResponseAvg.toFixed(1)}m`,
    delta: -1.1,
    trend: "down",
    descriptor: "Target under 9m",
  },
  {
    label: "FCR",
    value: `${firstContactResolutionRate.toFixed(1)}%`,
    delta: 2.8,
    trend: "up",
    descriptor: "First contact resolution",
  },
  {
    label: "Automation assist",
    value: `${automationAssistRate.toFixed(1)}%`,
    delta: 4.2,
    trend: "up",
    descriptor: "Conversations using co-pilot",
  },
  {
    label: "Minutes saved",
    value: `${proactiveSaveMinutes.toLocaleString()}m`,
    delta: 6.4,
    trend: "up",
    descriptor: "Deflected via proactive alerts",
  },
];

function buildChannelMetrics(): ChannelMetric[] {
  const map = new Map<string, ChannelMetric>();
  callsDataset.forEach((call, index) => {
    const entry =
      map.get(call.channel) ?? {
        channel: call.channel,
        share: 0,
        csat: 0,
        automation: 20,
        avgHandleTime: 0,
      };
    entry.share += 1;
    entry.csat += call.csat;
    entry.avgHandleTime += call.durationSeconds / 60;
    entry.automation = 25 + ((index % 7) - 2) * 2.5;
    map.set(call.channel, entry);
  });
  return Array.from(map.values()).map((entry) => ({
    channel: entry.channel,
    share: parseFloat(((entry.share / totalCalls) * 100).toFixed(1)),
    csat: parseFloat((entry.csat / entry.share).toFixed(1)),
    automation: parseFloat(entry.automation.toFixed(1)),
    avgHandleTime: parseFloat((entry.avgHandleTime / entry.share).toFixed(1)),
  }));
}

export const channelMetrics = buildChannelMetrics();

export const slaTrend: SlaTrendPoint[] = [
  { label: "Week -3", sla: 94.2, backlogMinutes: 62 },
  { label: "Week -2", sla: 95.1, backlogMinutes: 54 },
  { label: "Week -1", sla: 96.3, backlogMinutes: 48 },
  { label: "Current", sla: 96.8, backlogMinutes: 41 },
];

export const automationPrograms: AutomationProgram[] = [
  {
    id: "auto-01",
    name: "Billing whisper",
    coverage: 64,
    target: 70,
    owner: "Nova Carter",
    descriptor: "LLM guided refund trees",
  },
  {
    id: "auto-02",
    name: "Voice deflect",
    coverage: 42,
    target: 55,
    owner: "Selene Ward",
    descriptor: "Carrier-grade IVR intents",
  },
  {
    id: "auto-03",
    name: "Outage radar",
    coverage: 78,
    target: 80,
    owner: "Theo Laurent",
    descriptor: "Telemetry + proactive pages",
  },
];
