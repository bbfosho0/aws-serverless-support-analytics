"""Metrics API router."""

from __future__ import annotations

from fastapi import APIRouter

from ..models import MetricPoint
from ..services import metrics as metrics_service

router = APIRouter(prefix="/api/metrics", tags=["metrics"])


@router.get("", response_model=list[MetricPoint])
async def get_metrics() -> list[MetricPoint]:
    """Return synthetic KPI data."""

    return metrics_service.get_metrics()
