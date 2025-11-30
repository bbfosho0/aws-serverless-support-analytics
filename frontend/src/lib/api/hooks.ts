import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "./client";
import type { CallRecord } from "./generated/schema";

export function useCalls() {
  return useQuery({
    queryKey: ["calls"],
    queryFn: async () => {
      const response = await apiFetch<{ data: CallRecord[] }>("/api/calls");
      return response.data;
    },
    staleTime: 30_000,
  });
}
