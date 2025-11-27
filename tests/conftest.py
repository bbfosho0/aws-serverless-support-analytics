"""Pytest fixtures shared across placeholder test modules."""

from __future__ import annotations

from pathlib import Path

import pytest


@pytest.fixture(scope="session")
def repo_root() -> Path:
    """Return the repository root so tests can resolve sample fixtures."""

    return Path(__file__).resolve().parents[1]
