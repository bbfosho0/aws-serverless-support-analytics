"""Filter controls shared by the Streamlit fallback experience."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(slots=True)
class FilterState:
    """Simple value object that mirrors the filters exposed in the modern frontend."""

    time_range: str = "30d"
    region: str | None = None
    issue_type: str | None = None
