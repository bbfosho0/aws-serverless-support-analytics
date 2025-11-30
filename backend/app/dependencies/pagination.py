"""Standard pagination dependency placeholder."""

from __future__ import annotations

from pydantic import BaseModel, conint


class PaginationParams(BaseModel):
    """Simple pagination envelope."""

    page: conint(ge=1) = 1
    per_page: conint(ge=1, le=200) = 50
