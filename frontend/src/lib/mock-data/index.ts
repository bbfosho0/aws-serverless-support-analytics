// Mock data for the static frontend demo
// This provides realistic sample data without requiring a backend connection

export interface Call {
  id: string;
  agent_id: string;
  agent_name: string;
  customer_region: string;
  issue_type: string;
  duration_seconds: number;
  resolution_status: "Resolved" | "Escalated" | "Pending" | "Transferred";
  started_at: string;
  ended_at: string;
  customer_rating: number;
  first_response_time: number;
  notes?: string;
}

export interface Agent {
  id: string;
  name: string;
  region: string;
  skill_rating: number;
  total_calls: number;
  avg_resolution_time: number;
  satisfaction_rate: number;
  avatar_url: string;
  specialties: string[];
}

export interface MetricSummary {
  total_calls: number;
  avg_duration: number;
  resolution_rate: number;
  avg_rating: number;
  escalation_rate: number;
  active_agents: number;
}

export interface TimeSeriesData {
  date: string;
  calls: number;
  resolved: number;
  escalated: number;
}

export interface IssueBreakdown {
  type: string;
  count: number;
  percentage: number;
}

export interface RegionData {
  region: string;
  calls: number;
  avg_rating: number;
  resolution_rate: number;
}

// Generate realistic calls data
export const mockCalls: Call[] = [
  {
    id: "call-001",
    agent_id: "A-101",
    agent_name: "Jordan Li",
    customer_region: "NA",
    issue_type: "Billing",
    duration_seconds: 540,
    resolution_status: "Resolved",
    started_at: "2025-11-27T14:03:00Z",
    ended_at: "2025-11-27T14:12:00Z",
    customer_rating: 5,
    first_response_time: 45,
    notes: "Customer had questions about recent invoice charges.",
  },
  {
    id: "call-002",
    agent_id: "A-102",
    agent_name: "Mina Flores",
    customer_region: "EU",
    issue_type: "Technical",
    duration_seconds: 780,
    resolution_status: "Escalated",
    started_at: "2025-11-27T15:17:00Z",
    ended_at: "2025-11-27T15:30:00Z",
    customer_rating: 4,
    first_response_time: 30,
    notes: "Complex API integration issue requiring L2 support.",
  },
  {
    id: "call-003",
    agent_id: "A-103",
    agent_name: "Ben Park",
    customer_region: "APAC",
    issue_type: "Account",
    duration_seconds: 320,
    resolution_status: "Resolved",
    started_at: "2025-11-27T16:45:00Z",
    ended_at: "2025-11-27T16:50:20Z",
    customer_rating: 5,
    first_response_time: 20,
    notes: "Password reset and account recovery.",
  },
  {
    id: "call-004",
    agent_id: "A-101",
    agent_name: "Jordan Li",
    customer_region: "NA",
    issue_type: "Technical",
    duration_seconds: 1200,
    resolution_status: "Resolved",
    started_at: "2025-11-27T09:00:00Z",
    ended_at: "2025-11-27T09:20:00Z",
    customer_rating: 4,
    first_response_time: 35,
    notes: "Assisted with EC2 instance troubleshooting.",
  },
  {
    id: "call-005",
    agent_id: "A-104",
    agent_name: "Sarah Chen",
    customer_region: "APAC",
    issue_type: "Billing",
    duration_seconds: 450,
    resolution_status: "Resolved",
    started_at: "2025-11-27T10:30:00Z",
    ended_at: "2025-11-27T10:37:30Z",
    customer_rating: 5,
    first_response_time: 25,
    notes: "Refund processed for duplicate charge.",
  },
  {
    id: "call-006",
    agent_id: "A-105",
    agent_name: "Alex Johnson",
    customer_region: "EU",
    issue_type: "Feature Request",
    duration_seconds: 600,
    resolution_status: "Transferred",
    started_at: "2025-11-27T11:15:00Z",
    ended_at: "2025-11-27T11:25:00Z",
    customer_rating: 4,
    first_response_time: 40,
    notes: "Customer requesting new dashboard feature.",
  },
  {
    id: "call-007",
    agent_id: "A-102",
    agent_name: "Mina Flores",
    customer_region: "NA",
    issue_type: "Technical",
    duration_seconds: 900,
    resolution_status: "Resolved",
    started_at: "2025-11-27T12:00:00Z",
    ended_at: "2025-11-27T12:15:00Z",
    customer_rating: 5,
    first_response_time: 28,
    notes: "Lambda function timeout configuration.",
  },
  {
    id: "call-008",
    agent_id: "A-103",
    agent_name: "Ben Park",
    customer_region: "APAC",
    issue_type: "Account",
    duration_seconds: 240,
    resolution_status: "Pending",
    started_at: "2025-11-27T13:30:00Z",
    ended_at: "2025-11-27T13:34:00Z",
    customer_rating: 3,
    first_response_time: 55,
    notes: "Waiting for customer verification documents.",
  },
  {
    id: "call-009",
    agent_id: "A-104",
    agent_name: "Sarah Chen",
    customer_region: "EU",
    issue_type: "Billing",
    duration_seconds: 380,
    resolution_status: "Resolved",
    started_at: "2025-11-27T14:45:00Z",
    ended_at: "2025-11-27T14:51:20Z",
    customer_rating: 5,
    first_response_time: 22,
    notes: "Updated payment method successfully.",
  },
  {
    id: "call-010",
    agent_id: "A-105",
    agent_name: "Alex Johnson",
    customer_region: "NA",
    issue_type: "Technical",
    duration_seconds: 1500,
    resolution_status: "Escalated",
    started_at: "2025-11-27T15:00:00Z",
    ended_at: "2025-11-27T15:25:00Z",
    customer_rating: 3,
    first_response_time: 42,
    notes: "Complex networking issue with VPC configuration.",
  },
  {
    id: "call-011",
    agent_id: "A-101",
    agent_name: "Jordan Li",
    customer_region: "EU",
    issue_type: "Account",
    duration_seconds: 180,
    resolution_status: "Resolved",
    started_at: "2025-11-27T16:00:00Z",
    ended_at: "2025-11-27T16:03:00Z",
    customer_rating: 5,
    first_response_time: 15,
    notes: "MFA setup assistance.",
  },
  {
    id: "call-012",
    agent_id: "A-106",
    agent_name: "Emily Davis",
    customer_region: "NA",
    issue_type: "Billing",
    duration_seconds: 420,
    resolution_status: "Resolved",
    started_at: "2025-11-27T08:30:00Z",
    ended_at: "2025-11-27T08:37:00Z",
    customer_rating: 4,
    first_response_time: 32,
    notes: "Explained reserved instance pricing.",
  },
  {
    id: "call-013",
    agent_id: "A-106",
    agent_name: "Emily Davis",
    customer_region: "APAC",
    issue_type: "Technical",
    duration_seconds: 660,
    resolution_status: "Resolved",
    started_at: "2025-11-27T09:45:00Z",
    ended_at: "2025-11-27T09:56:00Z",
    customer_rating: 5,
    first_response_time: 18,
    notes: "S3 bucket policy configuration.",
  },
  {
    id: "call-014",
    agent_id: "A-102",
    agent_name: "Mina Flores",
    customer_region: "EU",
    issue_type: "Feature Request",
    duration_seconds: 540,
    resolution_status: "Transferred",
    started_at: "2025-11-27T10:15:00Z",
    ended_at: "2025-11-27T10:24:00Z",
    customer_rating: 4,
    first_response_time: 38,
    notes: "Feature request logged for product team.",
  },
  {
    id: "call-015",
    agent_id: "A-103",
    agent_name: "Ben Park",
    customer_region: "NA",
    issue_type: "Billing",
    duration_seconds: 300,
    resolution_status: "Resolved",
    started_at: "2025-11-27T11:00:00Z",
    ended_at: "2025-11-27T11:05:00Z",
    customer_rating: 5,
    first_response_time: 20,
    notes: "Cost optimization recommendations provided.",
  },
];

// Generate agent data
export const mockAgents: Agent[] = [
  {
    id: "A-101",
    name: "Jordan Li",
    region: "NA",
    skill_rating: 4.8,
    total_calls: 342,
    avg_resolution_time: 8.5,
    satisfaction_rate: 96,
    avatar_url: "",
    specialties: ["Billing", "Technical", "Account"],
  },
  {
    id: "A-102",
    name: "Mina Flores",
    region: "EU",
    skill_rating: 4.6,
    total_calls: 289,
    avg_resolution_time: 12.3,
    satisfaction_rate: 93,
    avatar_url: "",
    specialties: ["Technical", "Feature Request"],
  },
  {
    id: "A-103",
    name: "Ben Park",
    region: "APAC",
    skill_rating: 4.2,
    total_calls: 256,
    avg_resolution_time: 6.8,
    satisfaction_rate: 91,
    avatar_url: "",
    specialties: ["Account", "Billing"],
  },
  {
    id: "A-104",
    name: "Sarah Chen",
    region: "APAC",
    skill_rating: 4.9,
    total_calls: 315,
    avg_resolution_time: 7.2,
    satisfaction_rate: 98,
    avatar_url: "",
    specialties: ["Billing", "Technical"],
  },
  {
    id: "A-105",
    name: "Alex Johnson",
    region: "NA",
    skill_rating: 4.4,
    total_calls: 278,
    avg_resolution_time: 14.5,
    satisfaction_rate: 88,
    avatar_url: "",
    specialties: ["Technical", "Feature Request"],
  },
  {
    id: "A-106",
    name: "Emily Davis",
    region: "EU",
    skill_rating: 4.7,
    total_calls: 301,
    avg_resolution_time: 9.1,
    satisfaction_rate: 95,
    avatar_url: "",
    specialties: ["Billing", "Technical", "Account"],
  },
];

// Dashboard metrics summary
export const mockMetrics: MetricSummary = {
  total_calls: 1845,
  avg_duration: 9.2,
  resolution_rate: 87.3,
  avg_rating: 4.5,
  escalation_rate: 8.2,
  active_agents: 6,
};

// Time series data for charts (last 7 days)
export const mockTimeSeriesData: TimeSeriesData[] = [
  { date: "2025-11-21", calls: 245, resolved: 215, escalated: 18 },
  { date: "2025-11-22", calls: 289, resolved: 252, escalated: 22 },
  { date: "2025-11-23", calls: 198, resolved: 175, escalated: 14 },
  { date: "2025-11-24", calls: 167, resolved: 148, escalated: 11 },
  { date: "2025-11-25", calls: 312, resolved: 278, escalated: 24 },
  { date: "2025-11-26", calls: 334, resolved: 295, escalated: 26 },
  { date: "2025-11-27", calls: 300, resolved: 262, escalated: 20 },
];

// Issue type breakdown
export const mockIssueBreakdown: IssueBreakdown[] = [
  { type: "Technical", count: 682, percentage: 37 },
  { type: "Billing", count: 534, percentage: 29 },
  { type: "Account", count: 387, percentage: 21 },
  { type: "Feature Request", count: 168, percentage: 9 },
  { type: "Other", count: 74, percentage: 4 },
];

// Region data
export const mockRegionData: RegionData[] = [
  { region: "NA", calls: 723, avg_rating: 4.6, resolution_rate: 89.2 },
  { region: "EU", calls: 612, avg_rating: 4.4, resolution_rate: 86.5 },
  { region: "APAC", calls: 510, avg_rating: 4.5, resolution_rate: 85.8 },
];

// Helper function to format duration
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

// Helper function to get status color
export function getStatusColor(status: Call["resolution_status"]): string {
  switch (status) {
    case "Resolved":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "Escalated":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "Transferred":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
  }
}

// Helper to get region badge color
export function getRegionColor(region: string): string {
  switch (region) {
    case "NA":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
    case "EU":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
    case "APAC":
      return "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
  }
}
