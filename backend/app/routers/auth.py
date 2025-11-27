"""Auth stub router."""

from __future__ import annotations

from fastapi import APIRouter

from ..core.security import issue_dev_token
from ..schemas import AuthCredentials

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/sign-in")
async def sign_in(payload: AuthCredentials) -> dict[str, object]:
    """Issue a dev token for the provided credentials."""

    return {"data": issue_dev_token(payload.username)}
