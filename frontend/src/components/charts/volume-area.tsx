import type { VolumePoint } from "../../lib/data/types";

interface VolumeAreaProps {
  data: VolumePoint[];
  title: string;
  subTitle: string;
}

export function VolumeArea({ data, title, subTitle }: VolumeAreaProps) {
  const max = Math.max(...data.map((point) => point.total));
  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - (point.total / max) * 80;
    return `${x},${y}`;
  });
  const path = `M0,100 L${points.join(" ")} L100,100 Z`;

  return (
    <div className="rounded-3xl border border-border/70 bg-surface p-5 shadow-card">
      <p className="text-xs uppercase tracking-[0.4rem] text-muted-foreground">{title}</p>
      <p className="text-sm text-muted-foreground">{subTitle}</p>
      <svg viewBox="0 0 100 100" className="mt-4 h-48 w-full">
        <defs>
          <linearGradient id="volumeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.4)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0)" />
          </linearGradient>
        </defs>
        <path d={path} fill="url(#volumeGradient)" stroke="rgba(56,189,248,0.65)" strokeWidth={1.5} />
      </svg>
    </div>
  );
}
