# Customer Support Calls Analytics – Local-First Pipeline

A cost-friendly analytics sandbox that simulates customer support call logs, cleans them locally (mirroring our future AWS Glue logic), stores the curated result as Parquet, and visualizes insights through a Streamlit dashboard. Everything in this repository runs locally by default so you can iterate without AWS credentials; the AWS sections below describe the roadmap.

> **Scope note:** Only the local workflow (`scripts/generate_parquet.py` + `visualization/streamlit_app.py`) ships today. The Glue ETL and infrastructure directories referenced in the roadmap are placeholders.

![Architecture diagram placeholder](assets/architecture_diagram.png)

## Quickstart

1. **Create and activate a virtualenv**

    ```bash
    python -m venv .venv
    source .venv/bin/activate  # Windows: .\\.venv\\Scripts\\Activate.ps1
    ```

1. **Install dependencies**

    ```bash
    pip install --upgrade pip
    pip install -r requirements.txt
    ```

1. **Regenerate curated data whenever raw files change**

    ```bash
    python scripts/generate_parquet.py \\
        --calls data/sample_calls.json \\
        --agents data/agents.csv \\
        --output data/cleaned_calls.parquet \\
        --manifest data/manifest.json
    ```

    CLI flags are optional; omit them to use the defaults shown above.

1. **Preview the dashboard**

    ```bash
    streamlit run visualization/streamlit_app.py
    ```

1. **Run automated tests**

    ```bash
    pytest
    ```

    Tests currently cover the ETL + manifest helpers (`tests/test_etl.py`, `tests/test_manifest.py`). Streamlit coverage is manual for now.

## Repository Layout

```text
aws-serverless-support-analytics/
├── data/
│   ├── agents.csv                # Agent lookup table (hand-authored)
│   ├── manifest.json             # Updated by scripts/generate_parquet.py
│   ├── sample_calls.json         # Line-delimited JSON with synthetic calls
│   └── cleaned_calls.parquet     # Generated output consumed by Streamlit
├── scripts/
│   └── generate_parquet.py       # CLI wrapper around support_analytics.etl
├── support_analytics/
│   ├── etl.py                    # Load + clean helpers shared by CLI/tests
│   └── manifest.py               # Manifest hashing/read/write utilities
├── visualization/
│   ├── streamlit_app.py          # Entry point
│   ├── data_loader.py            # Cached Parquet reader using manifest hash
│   ├── filters.py                # Session-state friendly sidebar filters
│   ├── charts.py                 # Plotly/Altair charts + tables
│   ├── labels.py                 # Human-friendly label helpers
│   └── styles.py                 # Global CSS + layout constants
├── tests/
│   ├── test_etl.py               # Validates derived columns & filtering
│   └── test_manifest.py          # Ensures manifest hashing/updates work
└── requirements.txt              # pandas, pyarrow, streamlit, plotly, altair, pytest, etc.
```

## Data Schema & Contract

`data/cleaned_calls.parquet` must contain the columns below for the dashboard to function:

| Column | Type | Notes |
| --- | --- | --- |
| `call_id` | string | Primary identifier |
| `agent_id`, `agent_name`, `region` | string | Enriched from `agents.csv` |
| `customer_id` | string | Raw input field |
| `start_time`, `end_time` | timezone-aware datetime (UTC) | Naive timestamps will break filters |
| `call_duration_minutes` | float | Rounded to two decimals |
| `issue_type`, `resolution`, `rating` | categorical/numeric | Used by charts & filters |
| `call_date` | date | Derived date part of `start_time` |
| `hour_of_day` | int | Derived hour (0–23) used by histograms |

The ETL drops any row with missing timestamps or non-positive durations to keep downstream metrics clean.

## Local Pipeline Details

### Input data

- `data/sample_calls.json`: line-delimited JSON with realistic support call samples. Edit this file to simulate new scenarios.
- `data/agents.csv`: small lookup table containing `agent_id`, `agent_name`, and `region`.

### `scripts/generate_parquet.py`

1. Parses CLI arguments (customizable paths for calls, agents, output, manifest).
2. Delegates to `support_analytics.etl` for loading/cleaning.
3. Writes `cleaned_calls.parquet` and updates `manifest.json` via `support_analytics.manifest`.

### `support_analytics.etl`

- `load_calls(path)` and `load_agents(path)` wrap pandas readers with validation.
- `clean_calls(calls_df, agents_df)` performs:
  - UTC conversion for `start_time`/`end_time`.
  - Duration calculation, rounding, and anomaly filtering (`duration <= 0`, missing timestamps).
  - Agent join, derived `call_date` and `hour_of_day`, column ordering.
- Shared between the CLI and pytest suite to guarantee parity.

### `support_analytics.manifest`

- `read_manifest(path)` and `write_manifest(path, payload)` centralize JSON handling.
- `manifest_hash(manifest)` feeds Streamlit caching so data reloads only when Parquet metadata changes.
- `update_cleaned_calls_manifest(output_path, manifest_path)` stores `file_mtime`, `file_size`, and a sha256 hash after each ETL run, ensuring the dashboard knows when to invalidate its cache.

## Streamlit Dashboard (Local Preview)

`visualization/streamlit_app.py` stitches together several focused modules:

- `data_loader.py`: reads `data/cleaned_calls.parquet`, enforces UTC, computes friendly display columns, and caches the frame using `manifest_hash` as the cache key.
- `filters.py`: manages sidebar widgets, session-state defaults, presets, and reset workflow. Filtering happens on the server-side DataFrame, not inside Plotly.
- `charts.py`: contains KPI metrics, agent rankers, duration histograms, issue breakdowns, and time-series plots (Plotly Express + Altair). When the frame is empty, each chart shows a friendly “no data” state.
- `styles.py` and `labels.py`: keep CSS tweaks, color constants, and human-readable label mappings out of the entry file.

### Troubleshooting & Tips

- **`FileNotFoundError: data/cleaned_calls.parquet`** – run `python scripts/generate_parquet.py` to refresh the curated dataset.
- **Stale metrics after editing raw JSON** – rerun the generator script, then restart `streamlit run ...` to pick up the new manifest hash.
- **Pyright or IDE import warnings** – confirm the active interpreter matches `.venv` and reinstall with `pip install -r requirements.txt`.
- **Manifest reset** – delete `data/manifest.json` if it becomes corrupt; the next ETL run will recreate it.

## Testing & Quality

- `pytest` runs fast unit tests for ETL cleaning logic and manifest hashing. Extend `tests/` with fixtures under `tests/fixtures/` if you add more coverage.
- Manual Streamlit smoke test: regenerate data, launch the dashboard, filter by region/issue, and click “Reset all” to ensure session-state wiring still works.

## Roadmap: AWS Glue & S3 (Future Work)

The long-term plan is to mirror the local pipeline with managed AWS services:

1. **S3 layout** – `raw_calls/`, `reference_data/`, and `cleaned_calls/` prefixes inside a bucket such as `support-calls-data`.
2. **Glue crawlers** – catalog the raw JSON calls and `agents.csv` lookup for PySpark consumption.
3. **Glue job (`etl/support_calls_etl.py`)** – implements the same transformations as `support_analytics.etl` using `GlueContext`, producing partitioned Parquet in `cleaned_calls/`.
4. **Manifest on S3** – store `manifest.json` alongside the cleaned outputs so the Streamlit app can fetch only new files.
5. **Streamlit Cloud deployment** – host `visualization/streamlit_app.py`, configure AWS creds via secrets, and reuse the same caching logic. No Athena queries are required because we read Parquet directly via `s3fs`.

These items remain roadmap notes; contributions toward the AWS pieces are welcome once the local workflow stabilizes.

## Assets

Dashboard screenshots and architecture diagrams can live under `assets/`. The placeholder image reference at the top will begin working once `assets/architecture_diagram.png` is added.


