"""Integration test placeholder verifying the calls endpoint shape."""

from __future__ import annotations

from fastapi.testclient import TestClient

from ...main import app


def test_calls_endpoint_returns_envelope() -> None:
    """Ensure response includes data/meta/links keys."""

    client = TestClient(app)
    response = client.get("/api/calls")
    body = response.json()
    assert set(body.keys()) == {"data", "meta", "links"}
