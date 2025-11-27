"""Manual refresh hooks for the manifest endpoint."""

from __future__ import annotations

from pathlib import Path


def trigger_refresh(script_path: Path) -> str:
    """Document the intent to call the ETL script once implemented."""

    return f"Would execute ETL script at {script_path}"
