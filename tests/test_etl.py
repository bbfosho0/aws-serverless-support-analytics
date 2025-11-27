"""Smoke tests for the ETL placeholder functions."""

from __future__ import annotations

from support_analytics import etl


def test_infer_inputs_returns_expected_paths(repo_root) -> None:
    """Infer inputs should stick to the documented resources inside data/."""

    inputs = etl.infer_inputs(repo_root)
    assert inputs.calls_path.name == "sample_calls.json"
    assert inputs.agents_path.name == "agents.csv"
    assert inputs.manifest_path.name == "manifest.json"
