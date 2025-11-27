import type { Metadata } from "next";
import "../styles/globals.css";

import { QueryProvider } from "../providers/query-provider";
import { ThemeProvider } from "../providers/theme-provider";

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
    <html lang="en">
      <body>
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
