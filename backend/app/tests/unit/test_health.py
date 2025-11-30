"""Unit test placeholder for health router."""

from __future__ import annotations

from fastapi.testclient import TestClient

from ...main import app


def test_healthz_returns_ok() -> None:
    """Basic sanity check so pytest has something to run."""

    client = TestClient(app)
    response = client.get("/api/healthz")
    assert response.status_code == 200
