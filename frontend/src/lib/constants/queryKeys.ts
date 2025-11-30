export const queryKeys = {
  calls: (filters?: unknown) => ["calls", filters] as const,
  agents: ["agents"] as const,
  metrics: (range?: string) => ["metrics", range] as const,
};
