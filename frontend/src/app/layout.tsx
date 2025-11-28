import type { Metadata } from "next";
import "../styles/globals.css";

import { QueryProvider } from "../providers/query-provider";
import { ThemeProvider } from "../providers/theme-provider";
import { AppShell } from "../components/layout/app-shell";

export const metadata: Metadata = {
  title: "AWS Serverless Support Analytics",
  description: "Local-first dashboards backed by FastAPI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <QueryProvider>
            <AppShell>{children}</AppShell>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
