import type { VolumePoint } from "../../lib/data/types";

interface VolumeAreaProps {
  data: VolumePoint[];
  title: string;
  subTitle: string;
}

const channelPalette: Record<"voice" | "chat" | "email", string> = {
  voice: "bg-sky-500/20 text-sky-200 border-sky-500/30",
  chat: "bg-emerald-500/15 text-emerald-200 border-emerald-500/30",
  email: "bg-amber-500/15 text-amber-200 border-amber-500/30",
};

export function VolumeArea({ data, title, subTitle }: VolumeAreaProps) {
  const maxValue = Math.max(...data.map((point) => Math.max(point.total, point.forecast)));
  const actualPath = buildAreaPath(data.map((point) => point.total), maxValue);
  const forecastPath = buildLinePath(data.map((point) => point.forecast), maxValue);
  const lastPoint = data[data.length - 1];
  const avgVolume = Math.round(data.reduce((acc, point) => acc + point.total, 0) / data.length);
  const channelTotals: Array<{ key: keyof typeof channelPalette; label: string; value: number }> = [
    { key: "voice", label: "Voice", value: data.reduce((acc, point) => acc + point.voice, 0) },
    { key: "chat", label: "Chat", value: data.reduce((acc, point) => acc + point.chat, 0) },
    { key: "email", label: "Email", value: data.reduce((acc, point) => acc + point.email, 0) },
  ];

  return (
    <div className="rounded-[32px] border border-border/70 bg-surface/90 p-6 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.4rem] text-muted-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{subTitle}</p>
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>
            Last actual <span className="font-semibold text-foreground">{lastPoint.total}</span>
          </span>
          <span>
            Forecast <span className="font-semibold text-foreground">{lastPoint.forecast}</span>
          </span>
        </div>
      </div>
      <svg viewBox="0 0 120 80" className="mt-6 h-56 w-full">
        <defs>
          <linearGradient id="volumeActual" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(56,189,248,0.35)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0)" />
          </linearGradient>
        </defs>
        <path d={actualPath} fill="url(#volumeActual)" stroke="rgba(56,189,248,0.75)" strokeWidth="2" />
        <path
          d={forecastPath}
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />
      </svg>
      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-border/60 p-4">
          <p className="text-xs uppercase tracking-[0.3rem] text-muted-foreground">Avg daily</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">{avgVolume}</p>
          <p className="text-sm text-muted-foreground">calls per day</p>
        </div>
        {channelTotals.map((channel) => {
          const perDay = Math.round(channel.value / Math.max(1, data.length));
          return (
            <div
              key={channel.key}
              className={`rounded-2xl border px-4 py-3 text-sm ${channelPalette[channel.key]}`}
            >
              <p className="text-xs uppercase tracking-[0.2rem] text-muted-foreground">{channel.label}</p>
              <p className="text-2xl font-semibold text-white">{channel.value}</p>
              <p className="text-xs text-white/70">{perDay} daily avg</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function buildAreaPath(values: number[], maxValue: number) {
  const width = 120;
  const height = 80;
  const divisor = Math.max(1, values.length - 1);
  const coords = values.map((value, index) => {
    const x = (index / divisor) * width;
    const y = height - (value / maxValue) * (height - 10) - 5;
    return { x, y };
  });
  return `M0 ${height} ${coords.map(({ x, y }) => `L${x} ${y}`).join(" ")} L${width} ${height} Z`;
}

function buildLinePath(values: number[], maxValue: number) {
  const width = 120;
  const height = 80;
  const divisor = Math.max(1, values.length - 1);
  return values
    .map((value, index) => {
      const x = (index / divisor) * width;
      const y = height - (value / maxValue) * (height - 10) - 5;
      return `${index === 0 ? "M" : "L"}${x} ${y}`;
    })
    .join(" ");
}
