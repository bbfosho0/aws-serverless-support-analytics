"""Agent leaderboard helpers."""

from __future__ import annotations

from ..models import AgentStats


def list_agent_stats() -> list[AgentStats]:
    """Return placeholder agent summaries."""

    return [
        AgentStats(
            agent_id="A-101",
            avg_rating=4.8,
            total_calls=120,
            avg_resolution_seconds=480,
        )
    ]
