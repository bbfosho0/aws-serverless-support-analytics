"""Metrics aggregation stubs."""

from __future__ import annotations

from ..models import MetricPoint


def get_metrics() -> list[MetricPoint]:
    """Provide a short synthetic time-series."""

    return [
        MetricPoint(timestamp="2025-11-25T00:00:00Z", value=120.0, delta=5.0),
        MetricPoint(timestamp="2025-11-26T00:00:00Z", value=132.0, delta=12.0),
    ]
