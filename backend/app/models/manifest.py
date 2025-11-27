"""Manifest diagnostics results."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict


class ManifestInfo(BaseModel):
    """Metadata describing the generated Parquet artifact."""

    model_config = ConfigDict(extra="forbid")

    path: str
    hash: str
    size_bytes: int
    updated_at: str
