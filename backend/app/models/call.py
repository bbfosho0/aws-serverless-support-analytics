"""Call record model matching the ETL contract."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict


class CallRecord(BaseModel):
    """Minimal schema for tabular call data."""

    model_config = ConfigDict(extra="forbid")

    id: str
    agent_id: str
    customer_region: str
    issue_type: str
    duration_seconds: int
    resolution_status: str
