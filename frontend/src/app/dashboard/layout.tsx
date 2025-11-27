import type { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section>
      <header>
        <h1 className="text-2xl font-semibold">Support Analytics Dashboard</h1>
      </header>
      <main>{children}</main>
    </section>
  );
}
