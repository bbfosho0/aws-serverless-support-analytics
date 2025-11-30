"""Authentication dependency stubs."""

from __future__ import annotations

from fastapi import Depends, HTTPException, status


def get_current_user(token: str | None = None) -> dict[str, str]:
    """Return a fake admin user when token is present."""

    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing token")
    return {"username": "admin"}
