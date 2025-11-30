"""Stub ETL helpers that describe how local CSV/JSON inputs become Parquet artifacts."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


@dataclass(slots=True)
class EtlInput:
    """Declarative description of the ETL inputs used by the local simulation."""

    calls_path: Path
    agents_path: Path
    manifest_path: Path


def build_local_parquet(inputs: EtlInput) -> Path:
    """Pretend to build a Parquet artifact from the provided sources.

    The real implementation will leverage Polars for speed and align column contracts with the
    FastAPI schemas. For now we simply echo the paths to prove the wiring works end-to-end.
    """

    print(f"[ETL] Ready to transform {inputs.calls_path} + {inputs.agents_path}")
    return inputs.manifest_path.with_name("cleaned_calls.parquet")


def infer_inputs(root: Path) -> EtlInput:
    """Return the conventional input locations documented in README.md."""

    calls = root / "data" / "sample_calls.json"
    agents = root / "data" / "agents.csv"
    manifest = root / "data" / "manifest.json"
    return EtlInput(calls_path=calls, agents_path=agents, manifest_path=manifest)


def refresh_artifacts(paths: Iterable[Path]) -> None:
    """Placeholder hook for future cache invalidation logic."""

    for path in paths:
        print(f"[ETL] Would refresh derived data at {path}")
