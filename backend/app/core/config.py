"""Centralized settings stub leveraging Pydantic BaseSettings."""

from __future__ import annotations

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Expose the minimal knobs required by the blueprints."""

    app_env: str = "local"
    data_source: str = "local"
    parquet_path: str = "data/cleaned_calls.parquet"
    manifest_path: str = "data/manifest.json"
    secret_key: str = "dev-secret"


settings = Settings()
