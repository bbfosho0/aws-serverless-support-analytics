"""Manifest unit tests ensure the loader returns descriptive placeholders."""

from __future__ import annotations

from pathlib import Path

from support_analytics import manifest


def test_load_manifest_uses_placeholder_contract(tmp_path: Path) -> None:
    """The stubbed manifest should describe the simulated dataset."""

    dummy_manifest = tmp_path / "manifest.json"
    dummy_manifest.write_text("{}", encoding="utf-8")
    record = manifest.load_manifest(dummy_manifest)
    assert record.path.endswith("cleaned_calls.parquet")
