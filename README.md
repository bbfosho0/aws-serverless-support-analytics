# AWS Serverless Support Analytics (Local-First Simulation)

_A local-first analytics workbench that mirrors an AWS S3 + Glue + FastAPI + Next.js stack while running entirely on your laptop. The backend reads ETL artifacts in `data/` to emulate an S3 lakehouse, exposes typed APIs through FastAPI, and the frontend consumes those APIs via Next.js dashboards—ensuring a seamless later migration to managed AWS services._

> Architectural details originate from [FrontArc.md](FrontArc.md) (Next.js blueprint) and [BackArc.md](BackArc.md) (FastAPI blueprint). This README focuses on day-to-day development aligned with those plans.

## Quick Start (pip + npm)

1. **Clone the repo**

  ```powershell
  git clone https://github.com/bbfosho0/aws-serverless-support-analytics.git
  cd aws-serverless-support-analytics
  ```

1. **Create & activate a Python virtual environment, then install backend deps with `pip`**

  ```powershell
  winget install -e --id Python.Python.3.11
  python -3.11 -m venv .venv
  .\.venv\Scripts\Activate.ps1
  pip install --upgrade pip
  pip install -r requirements.txt
  pip install -r backend/requirements.txt
  ```

1. **Generate sample Parquet + manifest assets (simulated Glue job)**

   ```powershell
   # run from the repo root after activating .venv
   python scripts/generate_parquet.py --input data/sample_calls.json --agents data/agents.csv --output data/cleaned_calls.parquet
   ```

1. **Run the FastAPI backend**

  ```powershell
  .\.venv\Scripts\Activate.ps1
  cd backend
  uvicorn app.main:app --reload --port 8000
  ```

1. **Install frontend dependencies with `npm` and start Next.js**

  ```powershell
  cd ../frontend
  npm install
  npm run dev -- --port=3000   # "--" passes the flag to Next.js; replace with pnpm dev --port=3000 if you prefer pnpm
  ```

  Visit `http://localhost:3000/dashboard` (frontend) and `http://localhost:8000/api/healthz` (backend health) to confirm everything is running. You can swap `npm` for `pnpm` if desired.


## Table of Contents

- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Usage & API Examples](#usage--api-examples)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Technology Stack

| Layer | Tooling |
| --- | --- |
| **Frontend** | Next.js (App Router, React 18, TypeScript), Tailwind CSS, shadcn/ui (Radix UI), TanStack Query & Table, Zustand, Nivo + Recharts, framer-motion, Storybook + Vitest + Playwright |
| **Backend** | FastAPI, Pydantic v2, Uvicorn, Polars/Pandas for Parquet reads, Python BaseSettings, JWT auth stub, structlog, pytest, Ruff, mypy |
| **Data & ETL** | `support_analytics/etl.py`, `scripts/generate_parquet.py`, Parquet + JSON manifest artifacts, optional Redis cache, future S3fs + boto3 adapters |
| **Infrastructure Targets** | Local filesystem today; future-ready for AWS S3 data lake, AWS Glue crawlers, Fargate/App Runner deployment, OpenAPI-driven client generation via `openapi-typescript` |
| **Tooling & DX** | pnpm, uv/poetry (or pip), Prettier + ESLint, Husky, Thunder Client, VS Code Tailwind/TS/Ruff extensions |

## Architecture

The solution pairs a typed FastAPI backend with a streaming-first Next.js frontend to simulate an AWS-native analytics workflow without cloud dependencies.

```text
┌────────────┐      ETL (Python)       ┌──────────────┐       REST + OpenAPI       ┌─────────────┐
│ data/ raw  │ ──▶ generate_parquet ▶ │ Parquet +    │ ──▶ FastAPI Routers ──▶ TS │ Next.js App │
│ CSV / JSON │      scripts/          │ manifest.json│      (calls, agents,       │ (Dashboards)│
└────────────┘                         └──────────────┘      metrics, settings)     └─────────────┘
                                        ▲                     │          ▲
                                        │ Pydantic models     │          │ TanStack Query hooks
                                        ▼                     ▼          │ w/ generated clients
                                   Future AWS: S3 bucket + Glue catalog  │
```


1. **Data flow** – `support_analytics.etl` normalizes contact-center data into `data/cleaned_calls.parquet` and `data/manifest.json`, emulating an AWS Glue ETL output stored in S3.
2. **Backend** – FastAPI loads those artifacts via repositories (`parquet_repo.py`, `manifest_repo.py`), layers business logic in services (`calls.py`, `metrics.py`, `agents.py`), and exposes versioned REST endpoints plus OpenAPI metadata.
3. **Frontend** – Next.js App Router renders dashboards using TanStack Query hooks that call OpenAPI-generated clients (`src/lib/api/generated`). Tailwind + shadcn/ui supply the design system, and Zustand controls local UI state.
4. **Future S3/Glue** – Switching the backend to AWS is a config flip (`DATA_SOURCE=s3`), keeping the frontend unchanged thanks to strong typing and consistent routes.

## Getting Started

### 1. Prerequisites

- Node.js 20+ with `pnpm` (or `npm` if you prefer)
- Python 3.11+
- [`uv`](https://github.com/astral-sh/uv) for painless virtualenv + dependency management (alternatively use `python -m venv` + `pip`)
- Git, VS Code, and the Parquet dependencies already pinned in `requirements.txt`

### 2. Clone & bootstrap

```powershell
cd C:\Users\Yoshi\Documents\GitHub
git clone https://github.com/bbfosho0/aws-serverless-support-analytics.git
cd aws-serverless-support-analytics
```

### 3. Install Python dependencies with pip

```powershell
# Windows (PowerShell)
python -3.11 -m venv .venv
\.\.venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r requirements.txt          # shared ETL + test deps
pip install -r backend/requirements.txt   # FastAPI-specific deps
```

```bash
# macOS / Linux
python3.11 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
pip install -r backend/requirements.txt
```

### 4. Generate local ETL artifacts (simulated Glue job)

```powershell
python scripts/generate_parquet.py --input data/sample_calls.json --agents data/agents.csv --output data/cleaned_calls.parquet
```

This placeholder logs the intended transformation and keeps folder wiring intact until real ETL logic lands.

### 5. Configure environment variables

Create `.env` (backend) and `.env.local` (frontend) using the snippets below:

```ini
# backend/.env
APP_ENV=local
DATA_SOURCE=local
PARQUET_PATH=data/cleaned_calls.parquet
MANIFEST_PATH=data/manifest.json
SECRET_KEY=dev-secret
ENABLE_REFRESH_ENDPOINT=true
CORS_ORIGINS=http://localhost:3000
```

```ini
# frontend/.env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_DEFAULT_TIME_RANGE=30d
```

### 6. Start the FastAPI backend

```powershell
.\.venv\Scripts\Activate.ps1
cd backend
uvicorn app.main:app --reload --port 8000
```
Verify the simulation:

```bash
curl http://localhost:8000/api/healthz
```

### 7. Start the Next.js frontend

```powershell
cd frontend
pnpm install    # or: npm install
pnpm dev --port 3000
```
Navigate to `http://localhost:3000/dashboard` to see local dashboards backed by the simulated AWS pipeline.

### 8. (Optional) Regenerate typed API clients

```bash
cd frontend
pnpm api:generate   # runs openapi-typescript against http://localhost:8000/openapi.json
pnpm lint && pnpm test
```
Run this after any FastAPI schema change so the React hooks stay in sync.

## Project Structure

```text
aws-serverless-support-analytics/
├── plan.md                      # Alignment checklist documenting the scaffold goals
├── FrontArc.md                 # Frontend architecture blueprint (authoritative UI guide)
├── BackArc.md                  # Backend architecture blueprint (authoritative API guide)
├── data/                       # Local-first "S3" artifacts (CSV sources, manifest, sample JSON)
├── scripts/
│   └── generate_parquet.py     # Logs the intended Glue ETL transformation for now
├── support_analytics/          # Python ETL helper package (descriptive stubs today)
├── backend/
│   ├── requirements.txt        # FastAPI dependency pinning
│   └── app/
│       ├── main.py             # FastAPI app wiring all routers
│       ├── core/               # Settings + security helpers
│       ├── models/, schemas/   # Pydantic contracts
│       ├── services/, repos/   # Business logic + IO stubs
│       ├── routers/            # Agents, calls, metrics, settings, auth
│       └── tests/              # unit / integration / contract placeholders
├── frontend/
│   ├── package.json            # Next.js + Tailwind + TanStack Query setup
│   ├── src/app/                # App Router routes (dashboard, calls, agents, settings)
│   ├── src/components/         # Layout, charts, tables, filters, feedback, ui stubs
│   ├── src/features/           # Feature modules per blueprint section
│   ├── src/lib/                # api/, state/, viz/, utils/, constants/
│   ├── src/providers/          # Theme/Query/Auth providers
│   ├── src/styles/             # globals.css, themes.css, typography.css
│   └── src/tests/              # Vitest + Playwright placeholders
├── visualization/              # Legacy Streamlit artifacts (reference for data viz requirements)
├── tests/                      # Pytest suites for ETL helpers (support_analytics/*)
└── README.md
```

(See [FrontArc.md](FrontArc.md) and [BackArc.md](BackArc.md) for deeper per-directory notes.)

## Placeholder Scaffolding Strategy

- **Descriptive Python stubs** – `support_analytics/`, `backend/app/services/*`, and `scripts/generate_parquet.py` log their intent so FastAPI contracts can be developed before real ETL logic exists.
- **Frontend skeletons** – Every route, feature module, and provider from `FrontArc.md` has a matching component that renders placeholder copy, keeping routing/API imports stable for future work.
- **Testing hooks** – Pytest, Vitest, and Playwright directories already exist with smoke tests so CI wiring can begin immediately.
- **Documentation parity** – `plan.md` plus this README ensure the documented structure and the filesystem can stay in sync as real implementations replace the placeholders.

## Key Features

- **Local AWS simulation** – Parquet + manifest files emulate S3/Glue outputs; switching to real AWS storage later is a config-only change.
- **Typed FastAPI layer** – Routers for calls, agents, metrics, settings, health, and auth stub share Pydantic models across services.
- **Next.js dashboards** – App Router layouts, KPI cards, charts (Nivo/Recharts), and TanStack Table explorer deliver modern UX.
- **Employer-facing narrative layer** – Revamped hero, scenario filters, KPI runways, dual actual/forecast visuals, and severity-aware insights ensure the `/dashboard` route feels like a polished on-site demo even when running locally.
- **Extensible design system** – Tailwind tokens, shadcn/ui primitives, and Radix-driven accessibility guidelines.
- **Query-driven data layer** – TanStack Query hooks encapsulate caching, streaming, and optimistic updates tied to generated OpenAPI clients.
- **Operational insights** – Settings page surfaces manifest details, manual refresh button, and ETL health checks.
- **AWS-ready workflow** – Config toggles for `DATA_SOURCE=s3`, optional Redis cache, and OpenTelemetry hooks keep the stack cloud-ready.

## Dashboard Experience (Employer Demo)

The November 2025 refresh turned the `/dashboard` route into a scripted story recruiters can walk through without touching AWS:

- **Narrative hero** – `DashboardHero` now mixes a glassmorphism panel, CTA buttons, and a custom SVG SLA dial so you can talk through backlog, refresh cadence, and service targets in one glance.
- **Scenario-aware filter dock** – `GlobalFilters` introduces "simulation lanes" (Migration Lab, Production, Playbook) plus status badges showing the manifest, timezone, and snapshot powering the demo.
- **Dual KPI runways** – KPIs are split into stability vs efficiency tracks. Each `KpiCard` includes category badges, goal chips, and sparkline gradients generated from the richer mock data.
- **Actual vs forecast coverage** – `VolumeArea` renders actual interaction volumes with forecast overlays, per-channel callouts, and supporting stats so you can narrate mitigations around upcoming surges.
- **Intent and region intelligence** – `CategoryBreakdown` adds trend badges + progress tiles and `RegionGrid` surfaces CSAT/SLA/queue progress bars per geo for an ops-grade view.
- **Insight stream + transcripts** – Severity-colored `InsightBoard` cards provide talking points while the revamped `CallsTable` adds summary pills, channel badges, SLA indicators, and CSV export affordances.

These upgrades all run locally against `data/sample_calls.json` → `data/cleaned_calls.parquet`, keeping the portfolio-friendly visuals tightly coupled with the simulated Glue outputs.

## Usage & API Examples

### 1. Regenerate ETL artifacts & refresh manifest

```bash
python scripts/generate_parquet.py --input data/sample_calls.json --output data/cleaned_calls.parquet
curl -X POST http://localhost:8000/api/settings/refresh \
  -H "Authorization: Bearer <admin-jwt>"
```

### 2. Start backend + frontend together (PowerShell)

```powershell
Start-Job { .\.venv\Scripts\Activate.ps1; uvicorn app.main:app --reload }
Start-Job { cd frontend; pnpm dev }
```

### 3. Generate OpenAPI clients for the frontend

```bash
make openapi           # backend exports openapi.json
cd frontend
pnpm api:generate      # regenerates src/lib/api/generated
```

### 4. REST API reference (local simulation)

| Endpoint | Method | Description | Sample |
| --- | --- | --- | --- |
| `/api/calls` | GET | Paginated, filterable call records from Parquet | `curl "http://localhost:8000/api/calls?page=1&per_page=50&region=NA"` |
| `/api/calls/{id}` | GET | Detailed call payload (timeline, notes, derived metrics) | `curl http://localhost:8000/api/calls/12345` |
| `/api/agents` | GET | Agent leaderboard aggregations | `curl http://localhost:8000/api/agents?sort=rating` |
| `/api/metrics` | GET | KPI snapshots + time-series arrays | `curl "http://localhost:8000/api/metrics?range=30d"` |
| `/api/settings/manifest` | GET | Manifest diagnostics (hash, updated_at, file size) | `curl http://localhost:8000/api/settings/manifest` |
| `/api/auth/sign-in` | POST | Auth stub issuing JWTs for local dev | `curl -X POST http://localhost:8000/api/auth/sign-in -d '{"username":"admin","password":"dev"}' -H "Content-Type: application/json"` |

**Sample `/api/calls` response**

```json
{
  "data": [
    {
      "id": "call_123",
      "agent_id": "a-17",
      "customer_region": "NA",
      "issue_type": "Billing",
      "duration_seconds": 612,
      "resolution_status": "Resolved",
      "started_at": "2024-11-10T14:32:00Z",
      "ended_at": "2024-11-10T14:42:12Z",
      "derived": {
        "duration_label": "10m 12s",
        "first_response_sla_met": true
      }
    }
  ],
  "meta": {
    "page": 1,
    "per_page": 50,
    "total": 1845
  },
  "links": {
    "next": "/api/calls?page=2&per_page=50"
  }
}
```

**Sample `/api/settings/manifest` response**

```json
{
  "data": {
    "path": "data/cleaned_calls.parquet",
    "hash": "0x4f8e...",
    "size_bytes": 4183721,
    "updated_at": "2024-11-10T15:00:01Z"
  }
}
```

### 5. Frontend TanStack Query usage example

```ts
// src/lib/api/hooks.ts
import { useQuery } from '@tanstack/react-query';
import { client } from './client';
import { CallsService } from '../generated';

export function useCalls(filters: CallsFilters) {
  return useQuery({
    queryKey: ['calls', filters],
    queryFn: async () => {
      const api = new CallsService(client);
      return api.getCalls(filters);
    },
    staleTime: 30_000,
  });
}
```

Then inside `src/app/calls/page.tsx`:

```tsx
const { data, isLoading } = useCalls(currentFilters);
```

This pattern ensures the UI always reflects the latest FastAPI schema, with build-time type safety provided by the generated client.

## Development Workflow

1. **Sync ETL data** – run `scripts/generate_parquet.py` whenever sample data changes.
2. **Backend first** – modify FastAPI router/service/model, run `uvicorn` + `pytest`, regenerate `openapi.json`.
3. **Update clients** – `pnpm api:generate` to refresh TypeScript clients, then run `pnpm lint` to catch mismatches.
4. **Frontend work** – implement features under `src/features/*`, keeping layout + component patterns from [FrontArc.md](FrontArc.md).
5. **Concurrent dev** – use two terminals or `docker-compose.dev.yml` to run FastAPI and Next.js simultaneously.
6. **Branching** – follow feature branches off `local-first-approach` (or `main`), enforce PR checklists: lint, tests, OpenAPI regen proof.
7. **Release prep** – tag once both stack halves are green; include manifest hash + ETL timestamp in release notes for traceability.

## Coding Standards

- **Frontend**
  - TypeScript strict mode, React Server Components where possible, `use client` only when necessary.
  - Tailwind classes ordered via Prettier plugin; design tokens defined in `tailwind.config.ts` and `themes.css`.
  - Hooks must live in `src/lib/api/hooks.ts` or feature-specific hook files; query keys centralized in `src/lib/constants/queryKeys.ts`.
  - UI state managed via Zustand slices; avoid prop drilling for core layout concerns.
- **Backend**
  - Pydantic models live in `app/models`, request/response schemas in `app/schemas`, routers thin, services contain business logic, repositories handle IO.
  - Enforce `ConfigDict(extra='forbid')` to reject unknown payload fields; prefer Polars lazy queries for heavy filtering.
  - Logging is structured; every endpoint returns the standard `{ data, meta, links }` envelope or `{ error: { ... } }` on failure.
  - Run `ruff check`, `ruff format`, and `mypy` before committing.

## Testing

- **Backend** – Pytest suites across unit (services, repositories), integration (FastAPI TestClient), contract tests (OpenAPI diff), and optional performance smoke tests (<250 ms P95 for `/api/calls`).
- **Frontend** – Vitest + React Testing Library for components, Playwright E2E covering dashboard flows, Storybook visual regression (Chromatic) for KPI cards/charts.
- **Shared contracts** – CI verifies that `openapi.json` was regenerated when schema changes occur and that `src/lib/api/generated` is current.

## Contributing

1. File an issue or start a discussion describing the feature/fix and reference the relevant blueprint sections.
2. Create a branch (`feature/<short-desc>`), run ETL + backend + frontend locally, and keep OpenAPI + generated clients in sync.
3. Update documentation if your change alters architecture layers, endpoints, or UI flows.
4. Submit a PR with:
   - `ruff`, `mypy`, `pytest` results (backend)
   - `pnpm lint`, `pnpm test`, `pnpm test:e2e` (frontend, as applicable)
   - Evidence that `openapi.json` + generated clients were regenerated (commit diff)
5. Address review feedback promptly; keep commits focused.

## License

TBD – add license text or SPDX identifier when finalized.
