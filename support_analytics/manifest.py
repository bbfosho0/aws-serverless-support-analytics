"""Utilities for inspecting the manifest emitted by the placeholder ETL."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any


@dataclass(slots=True)
class ManifestRecord:
    """Lightweight representation of the manifest.json contract."""

    path: str
    hash: str
    row_count: int
    generated_at: str
    notes: str


def load_manifest(manifest_path: Path) -> ManifestRecord:
    """Load the manifest file and return a strongly typed placeholder instance."""

    content: dict[str, Any] = {
        "path": "data/cleaned_calls.parquet",
        "hash": "placeholder",
        "row_count": 0,
        "generated_at": "2025-11-27T00:00:00Z",
        "notes": "Manifest stub is ready for replacement once ETL logic lands.",
    }
    return ManifestRecord(**content)
