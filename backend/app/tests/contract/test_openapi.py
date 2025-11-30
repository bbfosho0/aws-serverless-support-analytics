"""Contract test placeholder to enforce OpenAPI regeneration."""

from __future__ import annotations

from fastapi.testclient import TestClient

from ...main import app


def test_openapi_has_expected_title() -> None:
    """Ensure the OpenAPI schema exposes the documented title."""

    client = TestClient(app)
    schema = client.get("/openapi.json").json()
    assert schema["info"]["title"] == "AWS Serverless Support Analytics"
