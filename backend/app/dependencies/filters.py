"""Query parameter parsers."""

from __future__ import annotations

from fastapi import Depends

from ..schemas import CallFilters


def get_call_filters(filters: CallFilters = Depends()) -> CallFilters:
    """Pass-through dependency placeholder."""

    return filters
