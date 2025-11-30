"""Data loader utilities for the legacy visualization layer."""

from __future__ import annotations

from pathlib import Path
from typing import Any


def load_sample_dataframe(path: Path) -> list[dict[str, Any]]:
    """Return a simple JSON-like representation for prototyping charts."""

    print(f"[visualization] Would load {path}")
    return []
