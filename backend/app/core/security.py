"""Security placeholder describing JWT helpers."""

from __future__ import annotations

from datetime import datetime, timedelta


def issue_dev_token(username: str, expires_in_minutes: int = 60) -> dict[str, str]:
    """Return a fake token payload consumed by the auth router stub."""

    expires_at = datetime.utcnow() + timedelta(minutes=expires_in_minutes)
    return {"access_token": f"token-for-{username}", "expires_at": expires_at.isoformat()}
