"""Parquet repository stub."""

from __future__ import annotations

from pathlib import Path


def fetch_rows(parquet_path: Path) -> list[dict[str, str]]:
    """Return an illustrative payload instead of hitting disk."""

    return [
        {
            "id": "call-001",
            "agent_id": "A-101",
            "note": f"Simulated row from {parquet_path}",
        }
    ]
