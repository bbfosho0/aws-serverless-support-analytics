"""Reusable chart helpers for the historical Streamlit prototype."""

from __future__ import annotations

from typing import Any


def render_placeholder_chart(data: list[dict[str, Any]]) -> None:
    """Serve as a stub for the future Plotly/Nivo bridge."""

    print(f"Rendering {len(data)} data points in the legacy dashboard stub.")
