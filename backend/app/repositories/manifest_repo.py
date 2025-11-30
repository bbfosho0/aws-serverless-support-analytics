"""Manifest repository stub that mirrors support_analytics.manifest."""

from __future__ import annotations

from pathlib import Path

from support_analytics.manifest import ManifestRecord, load_manifest


def get_manifest(manifest_path: Path) -> ManifestRecord:
    """Delegate to the shared manifest loader."""

    return load_manifest(manifest_path)
