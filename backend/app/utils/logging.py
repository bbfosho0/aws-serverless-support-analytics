"""Structured logging bootstrap."""

from __future__ import annotations

import logging


def configure_logging(level: str = "INFO") -> None:
    """Set up basic logging config so future services can opt-in."""

    logging.basicConfig(level=getattr(logging, level.upper(), logging.INFO))
