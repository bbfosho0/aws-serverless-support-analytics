import type { CallRecord } from "../api/generated/schema";

export function toVolumeSeries(records: CallRecord[]) {
  return records.map((record) => ({
    x: record.id,
    y: record.duration_seconds,
  }));
}
