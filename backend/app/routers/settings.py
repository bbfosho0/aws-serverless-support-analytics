"""Settings and manifest diagnostics router."""

from __future__ import annotations

from pathlib import Path

from fastapi import APIRouter

from ..core.config import settings
from ..repositories import manifest_repo

router = APIRouter(prefix="/api/settings", tags=["settings"])


@router.get("/manifest")
async def get_manifest() -> dict[str, object]:
    """Expose manifest metadata so the frontend can display diagnostics."""

    record = manifest_repo.get_manifest(Path(settings.manifest_path))
    return {"data": record.__dict__}
