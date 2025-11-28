"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  mockCalls,
  formatDuration,
  getStatusColor,
  getRegionColor,
} from "@/lib/mock-data";
import {
  ArrowLeft,
  Phone,
  Clock,
  Star,
  User,
  MapPin,
  FileText,
  Calendar,
  Timer,
} from "lucide-react";
import { notFound } from "next/navigation";

interface CallDetailPageProps {
  params: { callId: string };
}

export default function CallDetailPage({ params }: CallDetailPageProps) {
  const call = mockCalls.find((c) => c.id === params.callId);

  if (!call) {
    notFound();
  }

  const startDate = new Date(call.started_at);
  const endDate = new Date(call.ended_at);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back Button */}
      <Link href="/calls">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Calls
        </Button>
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Call {call.id}
              </h1>
              <p className="text-muted-foreground">
                {call.issue_type} support request
              </p>
            </div>
          </div>
        </div>
        <Badge className={getStatusColor(call.resolution_status)} >
          {call.resolution_status}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Call Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Agent Info */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">
                  {call.agent_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <p className="font-semibold text-lg">{call.agent_name}</p>
                <p className="text-sm text-muted-foreground">Agent ID: {call.agent_id}</p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg border p-4 text-center">
                <Clock className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                <p className="text-lg font-bold">{formatDuration(call.duration_seconds)}</p>
                <p className="text-xs text-muted-foreground">Duration</p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <Star className="h-5 w-5 mx-auto text-amber-500 fill-amber-500 mb-2" />
                <p className="text-lg font-bold">{call.customer_rating}/5</p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <Timer className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                <p className="text-lg font-bold">{call.first_response_time}s</p>
                <p className="text-xs text-muted-foreground">First Response</p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <MapPin className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                <Badge className={getRegionColor(call.customer_region)}>
                  {call.customer_region}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">Region</p>
              </div>
            </div>

            {/* Notes */}
            {call.notes && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">Notes</p>
                </div>
                <p className="text-muted-foreground p-4 rounded-lg bg-muted/50">
                  {call.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <div className="flex-1 w-px bg-border my-1" />
                </div>
                <div>
                  <p className="font-medium">Call Started</p>
                  <p className="text-sm text-muted-foreground">
                    {startDate.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <div className="flex-1 w-px bg-border my-1" />
                </div>
                <div>
                  <p className="font-medium">First Response</p>
                  <p className="text-sm text-muted-foreground">
                    {call.first_response_time} seconds after start
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                </div>
                <div>
                  <p className="font-medium">Call Ended</p>
                  <p className="text-sm text-muted-foreground">
                    {endDate.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-2">Issue Type</p>
              <Badge variant="secondary" className="text-sm">
                {call.issue_type}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
