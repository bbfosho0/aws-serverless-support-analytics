"""Placeholder data access layer for local Parquet files."""

from __future__ import annotations

from pathlib import Path

from ..core.config import settings


def load_calls_frame() -> str:
    """Return a human-readable message until Polars integration lands."""

    return f"Would load {Path(settings.parquet_path).resolve()}"
