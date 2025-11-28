"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import {
  LayoutDashboard,
  Phone,
  Users,
  Settings,
  BarChart3,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Calls",
    href: "/calls",
    icon: Phone,
  },
  {
    title: "Agents",
    href: "/agents",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function PrimaryNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 p-4">
      <div className="mb-6 flex items-center gap-2 px-2">
        <BarChart3 className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-lg font-bold">Support Analytics</h1>
          <p className="text-xs text-muted-foreground">AWS Serverless</p>
        </div>
      </div>
      <div className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent",
                isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
