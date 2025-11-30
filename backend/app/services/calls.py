"""Business logic placeholder for call queries."""

from __future__ import annotations

from ..models import CallRecord
from ..schemas import CallFilters


async def list_calls(filters: CallFilters) -> list[CallRecord]:
    """Return a handful of records until Polars-backed queries are implemented."""

    dummy = CallRecord(
        id="call-001",
        agent_id="A-101",
        customer_region=filters.region or "NA",
        issue_type=filters.issue_type or "Billing",
        duration_seconds=540,
        resolution_status="Resolved",
    )
    return [dummy]
