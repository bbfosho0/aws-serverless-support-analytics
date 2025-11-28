"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Moon,
  Sun,
  Monitor,
  RefreshCw,
  Database,
  CheckCircle,
  HardDrive,
  Settings as SettingsIcon,
  Palette,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils/cn";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLastRefresh(new Date());
    setIsRefreshing(false);
  };

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  // Simulated manifest data
  const manifestData = {
    dataset: "cleaned_calls",
    path: "data/cleaned_calls.parquet",
    source: "local-simulation",
    hash: "0x4f8e2d1a",
    row_count: 1845,
    generated_at: "2025-11-27T00:00:00Z",
    size_bytes: 4183721,
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your preferences and system configuration.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Appearance</CardTitle>
            </div>
            <CardDescription>
              Customize the look and feel of the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-3">Theme</p>
              <div className="grid grid-cols-3 gap-3">
                {themeOptions.map((option) => {
                  const isActive = mounted && theme === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setTheme(option.value)}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-lg border p-4 transition-all hover:border-primary",
                        isActive && "border-primary bg-primary/5"
                      )}
                    >
                      <option.icon className="h-6 w-6" />
                      <span className="text-sm font-medium">{option.label}</span>
                      {isActive && (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Refresh */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Data Management</CardTitle>
            </div>
            <CardDescription>
              Refresh data from the ETL pipeline.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">Manual Refresh</p>
                <p className="text-sm text-muted-foreground">
                  Trigger a data refresh from the local pipeline.
                </p>
              </div>
              <Button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="gap-2"
              >
                <RefreshCw
                  className={cn("h-4 w-4", isRefreshing && "animate-spin")}
                />
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </Button>
            </div>

            {lastRefresh && (
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <CheckCircle className="h-4 w-4" />
                <span>
                  Last refreshed: {lastRefresh.toLocaleTimeString()}
                </span>
              </div>
            )}

            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground">
                Note: In production, this would trigger the FastAPI backend to
                reload data from the Parquet files.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Diagnostics */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">System Diagnostics</CardTitle>
          </div>
          <CardDescription>
            View information about the data pipeline and system status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Status */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium">System Status</span>
              </div>
              <Badge variant="success">Operational</Badge>
            </div>

            {/* Data Source */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 mb-2">
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Data Source</span>
              </div>
              <Badge variant="secondary">Local Simulation</Badge>
            </div>

            {/* API Status */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 mb-2">
                <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">API Status</span>
              </div>
              <Badge variant="warning">Mock Mode</Badge>
            </div>
          </div>

          {/* Manifest Details */}
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-3">Manifest Details</h3>
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-medium text-muted-foreground">
                      Dataset
                    </td>
                    <td className="px-4 py-3 font-mono">
                      {manifestData.dataset}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-medium text-muted-foreground">
                      Path
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {manifestData.path}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-medium text-muted-foreground">
                      Hash
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {manifestData.hash}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-medium text-muted-foreground">
                      Row Count
                    </td>
                    <td className="px-4 py-3">
                      {manifestData.row_count.toLocaleString()} records
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-medium text-muted-foreground">
                      File Size
                    </td>
                    <td className="px-4 py-3">
                      {(manifestData.size_bytes / 1024 / 1024).toFixed(2)} MB
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-muted-foreground">
                      Generated
                    </td>
                    <td className="px-4 py-3">
                      {new Date(manifestData.generated_at).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Version Info */}
      <div className="text-center text-sm text-muted-foreground">
        <p>AWS Serverless Support Analytics v0.1.0</p>
        <p className="mt-1">
          Running in local-first mode • Static frontend with mock data
        </p>
      </div>
    </div>
  );
}
