"""Health and readiness endpoints."""

from __future__ import annotations

from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["health"])


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    """Basic liveness check."""

    return {"status": "ok"}
