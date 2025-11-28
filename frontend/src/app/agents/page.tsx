"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockAgents, getRegionColor } from "@/lib/mock-data";
import {
  Star,
  Clock,
  Phone,
  TrendingUp,
  Award,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function AgentsPage() {
  // Sort agents by skill rating for leaderboard
  const sortedAgents = [...mockAgents].sort(
    (a, b) => b.skill_rating - a.skill_rating
  );

  // Calculate team averages
  const teamAverages = {
    avgRating:
      mockAgents.reduce((sum, a) => sum + a.skill_rating, 0) / mockAgents.length,
    avgCalls:
      mockAgents.reduce((sum, a) => sum + a.total_calls, 0) / mockAgents.length,
    avgSatisfaction:
      mockAgents.reduce((sum, a) => sum + a.satisfaction_rate, 0) /
      mockAgents.length,
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Agent Performance</h1>
        <p className="text-muted-foreground mt-1">
          Monitor and compare agent metrics and performance.
        </p>
      </div>

      {/* Team Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Agents</p>
                <p className="text-2xl font-bold">{mockAgents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-amber-500/10 p-3">
                <Star className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Skill Rating</p>
                <p className="text-2xl font-bold">
                  {teamAverages.avgRating.toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-green-500/10 p-3">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Satisfaction</p>
                <p className="text-2xl font-bold">
                  {teamAverages.avgSatisfaction.toFixed(0)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-blue-500/10 p-3">
                <Phone className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Calls/Agent</p>
                <p className="text-2xl font-bold">
                  {Math.round(teamAverages.avgCalls)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-lg">Agent Leaderboard</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedAgents.map((agent, index) => (
              <div
                key={agent.id}
                className={cn(
                  "flex items-center gap-4 rounded-lg border p-4 transition-all hover:shadow-md",
                  index === 0 && "border-amber-200 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-900/10"
                )}
              >
                {/* Rank */}
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full font-bold",
                    index === 0 &&
                      "bg-amber-500 text-white",
                    index === 1 &&
                      "bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-200",
                    index === 2 &&
                      "bg-orange-400 text-white",
                    index > 2 && "bg-muted text-muted-foreground"
                  )}
                >
                  {index + 1}
                </div>

                {/* Avatar & Name */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">
                      {agent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{agent.name}</p>
                    <Badge className={getRegionColor(agent.region)}>
                      {agent.region}
                    </Badge>
                  </div>
                </div>

                {/* Stats */}
                <div className="hidden sm:grid sm:grid-cols-4 gap-6 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span className="font-semibold">{agent.skill_rating}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Calls</p>
                    <p className="font-semibold">{agent.total_calls}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Time</p>
                    <p className="font-semibold">{agent.avg_resolution_time}m</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Satisfaction</p>
                    <p className="font-semibold text-green-600 dark:text-green-400">
                      {agent.satisfaction_rate}%
                    </p>
                  </div>
                </div>

                {/* Mobile Stats */}
                <div className="sm:hidden text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="font-semibold">{agent.skill_rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {agent.total_calls} calls
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Agent Cards Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Agent Details</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockAgents.map((agent) => (
            <Card key={agent.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {agent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{agent.name}</h3>
                    <Badge className={cn("mt-1", getRegionColor(agent.region))}>
                      {agent.region}
                    </Badge>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted/50 p-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span className="text-lg font-bold">{agent.skill_rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Rating</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-center">
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      {agent.satisfaction_rate}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Satisfaction</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Specialties</p>
                  <div className="flex flex-wrap gap-1">
                    {agent.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    <span>{agent.total_calls} calls</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{agent.avg_resolution_time}m avg</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
