"""Reusable validation helpers."""

from __future__ import annotations


def ensure_positive(value: int) -> int:
    """Guard utility referenced by services."""

    if value < 0:
        raise ValueError("Value must be positive")
    return value
