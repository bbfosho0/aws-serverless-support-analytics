import type { RefreshEvent, SettingsDiagnostic } from "./types";

export const diagnostics: SettingsDiagnostic[] = [
  {
    label: "Manifest hash",
    value: "0x4f8e-91c2",
    hint: "Matches ETL output from Nov 24",
  },
  {
    label: "Parquet size",
    value: "4.18 MB",
    hint: "425k rows / 42 columns",
  },
  {
    label: "Last refresh",
    value: "2025-11-24 05:17 UTC",
    hint: "Triggered automatically via cron",
  },
  {
    label: "Data source",
    value: "Local Parquet (Glue sim)",
    hint: "Flip DATA_SOURCE=s3 during migration",
  },
];

export const refreshHistory: RefreshEvent[] = [
  {
    id: "refresh_1052",
    timestamp: "2025-11-24T05:17:00Z",
    result: "success",
    durationSeconds: 146,
    note: "Daily schedule",
  },
  {
    id: "refresh_1051",
    timestamp: "2025-11-23T05:17:00Z",
    result: "success",
    durationSeconds: 153,
  },
  {
    id: "refresh_1050",
    timestamp: "2025-11-22T05:17:00Z",
    result: "partial",
    durationSeconds: 312,
    note: "Manifest checksum mismatch",
  },
  {
    id: "refresh_1049",
    timestamp: "2025-11-21T12:44:00Z",
    result: "failed",
    durationSeconds: 88,
    note: "Parquet write lock",
  },
];
