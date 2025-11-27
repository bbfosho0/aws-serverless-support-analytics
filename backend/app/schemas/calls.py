"""Schemas powering the /api/calls endpoints."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, conint

from ..models import CallRecord


class CallFilters(BaseModel):
    """Filter options accepted by the calls router."""

    model_config = ConfigDict(extra="forbid")

    page: conint(ge=1) = 1
    per_page: conint(ge=1, le=200) = 50
    region: str | None = None
    issue_type: str | None = None


class PaginatedCallsResponse(BaseModel):
    """Envelope matching the frontend expectations."""

    data: list[CallRecord]
    meta: dict[str, int]
    links: dict[str, str | None]
