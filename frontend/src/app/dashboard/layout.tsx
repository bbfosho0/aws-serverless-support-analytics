import type { ReactNode } from "react";

import { AppShell } from "../../components/layout/app-shell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell
      title="Executive overview"
      description="Live signal across calls, agents, and ETL health — ready for AWS handoff."
    >
      {children}
    </AppShell>
  );
}
