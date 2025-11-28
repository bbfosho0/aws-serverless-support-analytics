"use client";

import { KpiCard } from "@/components/charts/kpi-card";
import { TrendChart } from "@/components/charts/trend-chart";
import { IssueBreakdownChart } from "@/components/charts/issue-breakdown-chart";
import { RegionCards } from "@/components/charts/region-cards";
import {
  Phone,
  Clock,
  CheckCircle2,
  Star,
  AlertTriangle,
  Users,
} from "lucide-react";
import {
  mockMetrics,
  mockTimeSeriesData,
  mockIssueBreakdown,
  mockRegionData,
  mockCalls,
} from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDuration, getStatusColor } from "@/lib/mock-data";

export default function DashboardPage() {
  // Get the most recent calls for the activity feed
  const recentCalls = mockCalls.slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here&apos;s your support analytics overview.
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard
          title="Total Calls"
          value={mockMetrics.total_calls.toLocaleString()}
          change={12.5}
          changeLabel="vs last week"
          icon={Phone}
        />
        <KpiCard
          title="Avg Duration"
          value={`${mockMetrics.avg_duration}m`}
          change={-3.2}
          changeLabel="vs last week"
          icon={Clock}
        />
        <KpiCard
          title="Resolution Rate"
          value={`${mockMetrics.resolution_rate}%`}
          change={2.1}
          changeLabel="vs last week"
          icon={CheckCircle2}
        />
        <KpiCard
          title="Avg Rating"
          value={mockMetrics.avg_rating.toFixed(1)}
          change={0.3}
          changeLabel="vs last week"
          icon={Star}
          valueClassName="text-amber-500"
        />
        <KpiCard
          title="Escalation Rate"
          value={`${mockMetrics.escalation_rate}%`}
          change={-1.5}
          changeLabel="vs last week"
          icon={AlertTriangle}
        />
        <KpiCard
          title="Active Agents"
          value={mockMetrics.active_agents}
          icon={Users}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TrendChart title="Call Volume Trend (Last 7 Days)" data={mockTimeSeriesData} />
        <IssueBreakdownChart title="Issues by Category" data={mockIssueBreakdown} />
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <RegionCards data={mockRegionData} />
        
        {/* Recent Activity */}
        <Card className="lg:col-span-2 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCalls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{call.agent_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {call.issue_type} • {call.customer_region}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={getStatusColor(call.resolution_status)}
                      variant="secondary"
                    >
                      {call.resolution_status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDuration(call.duration_seconds)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
