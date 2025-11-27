"""Authentication input/output schemas."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict


class AuthCredentials(BaseModel):
    """Simple username/password payload for the local stub."""

    model_config = ConfigDict(extra="forbid")

    username: str
    password: str
