"""Utilities for producing placeholder Parquet files from the sample JSON inputs.

This script mirrors the AWS Glue job described in BackArc.md. The current version writes
informational log statements instead of touching disk so the rest of the stack can be built
incrementally. Replace the stubs once the ETL flow is ready to ingest large datasets.
"""

from __future__ import annotations

from pathlib import Path
from typing import Iterable


def generate_parquet(
    input_path: Path,
    agents_path: Path,
    output_path: Path,
    manifest_path: Path | None = None,
) -> None:
    """Log the intended ETL behavior as a placeholder for the real implementation.

    Parameters
    ----------
    input_path:
        Location of the raw JSON calls dataset.
    agents_path:
        CSV containing agent metadata used for enrichment.
    output_path:
        Destination for the cleaned Parquet artifact that simulates S3/Glue output.
    manifest_path:
        Optional manifest file describing the generated dataset.
    """

    message = (
        "[generate_parquet] Placeholder run — expected to combine %s and %s "
        "into %s (manifest: %s)"
    )
    print(message % (input_path, agents_path, output_path, manifest_path))


def main(args: Iterable[str] | None = None) -> None:
    """Entry point used by `python scripts/generate_parquet.py` during local dev."""

    print(
        "The ETL placeholder is wired up. Pass real CLI parsing once datasets are ready."
    )


if __name__ == "__main__":
    main()
