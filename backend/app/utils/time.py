"""Time helper stubs."""

from __future__ import annotations

from datetime import datetime, timezone


def utcnow() -> str:
    """Return ISO formatted UTC timestamp."""

    return datetime.now(tz=timezone.utc).isoformat()
