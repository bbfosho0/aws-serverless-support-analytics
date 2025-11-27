"""Agent leaderboard aggregates."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict


class AgentStats(BaseModel):
    """Summaries consumed by the frontend agents view."""

    model_config = ConfigDict(extra="forbid")

    agent_id: str
    avg_rating: float
    total_calls: int
    avg_resolution_seconds: int
