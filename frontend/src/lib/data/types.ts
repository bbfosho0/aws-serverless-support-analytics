export type Severity = "info" | "warning" | "critical";

export interface DashboardKpi {
  label: string;
  value: string;
  delta: number;
  trend: "up" | "down" | "flat";
  descriptor: string;
}

export interface VolumePoint {
  date: string;
  voice: number;
  chat: number;
  email: number;
  total: number;
}

export interface IssueBreakdownEntry {
  issue: string;
  count: number;
  percentage: number;
  trend: number;
}

export interface RegionPerformanceEntry {
  region: string;
  volume: number;
  csat: number;
  sla: number;
  escalations: number;
}

export interface InsightCard {
  title: string;
  detail: string;
  action: string;
  severity: Severity;
}

export interface MockCallRecord {
  id: string;
  caseId: string;
  agent: string;
  region: string;
  channel: "voice" | "chat" | "email" | "sms";
  issue: string;
  priority: "low" | "normal" | "high" | "urgent";
  sentiment: "positive" | "neutral" | "negative";
  status: "resolved" | "pending" | "escalated";
  durationSeconds: number;
  csat: number;
  npsDelta: number;
  openedAt: string;
  closedAt: string;
  firstResponseMinutes: number;
  firstContactResolution: boolean;
}

export interface AgentPerformance {
  id: string;
  name: string;
  region: string;
  role: string;
  callsHandled: number;
  avgHandleTime: number;
  csat: number;
  sla: number;
  scheduleAdherence: number;
  sentimentLift: number;
  focusAreas: string[];
}

export interface SettingsDiagnostic {
  label: string;
  value: string;
  hint?: string;
}

export interface RefreshEvent {
  id: string;
  timestamp: string;
  result: "success" | "partial" | "failed";
  durationSeconds: number;
  note?: string;
}
