"""Metrics DTOs used by dashboard widgets."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict


class MetricPoint(BaseModel):
    """One value within a KPI time-series."""

    model_config = ConfigDict(extra="forbid")

    timestamp: str
    value: float
    delta: float | None = None
