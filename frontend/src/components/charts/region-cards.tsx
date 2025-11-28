"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

interface RegionCardProps {
  data: Array<{
    region: string;
    calls: number;
    avg_rating: number;
    resolution_rate: number;
  }>;
}

const regionConfig: Record<string, { name: string; color: string; bgColor: string }> = {
  NA: {
    name: "North America",
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-500",
  },
  EU: {
    name: "Europe",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-500",
  },
  APAC: {
    name: "Asia Pacific",
    color: "text-teal-600 dark:text-teal-400",
    bgColor: "bg-teal-500",
  },
};

export function RegionCards({ data }: RegionCardProps) {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg">Regional Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((region) => {
            const config = regionConfig[region.region] || {
              name: region.region,
              color: "text-gray-600",
              bgColor: "bg-gray-500",
            };
            return (
              <div
                key={region.region}
                className="rounded-lg border p-4 transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn("h-3 w-3 rounded-full", config.bgColor)} />
                    <div>
                      <p className={cn("font-semibold", config.color)}>
                        {config.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {region.calls.toLocaleString()} calls
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{region.avg_rating.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground">Avg Rating</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Resolution Rate</span>
                    <span className="font-medium">{region.resolution_rate}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all", config.bgColor)}
                      style={{ width: `${region.resolution_rate}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
