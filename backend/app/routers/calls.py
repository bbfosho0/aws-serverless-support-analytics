"""Calls API router."""

from __future__ import annotations

from fastapi import APIRouter, Depends

from ..schemas import CallFilters, PaginatedCallsResponse
from ..services import calls as call_service

router = APIRouter(prefix="/api/calls", tags=["calls"])


@router.get("", response_model=PaginatedCallsResponse)
async def list_calls(filters: CallFilters = Depends()) -> PaginatedCallsResponse:
    """Return a paginated list of call records."""

    records = await call_service.list_calls(filters)
    return PaginatedCallsResponse(
        data=records,
        meta={"page": filters.page, "per_page": filters.per_page, "total": len(records)},
        links={"next": None},
    )
