"""FastAPI application entry point with descriptive stub routers."""

from __future__ import annotations

from fastapi import FastAPI

from .routers import agents, auth, calls, health, metrics, settings

app = FastAPI(title="AWS Serverless Support Analytics", version="0.1.0")

app.include_router(health.router)
app.include_router(calls.router)
app.include_router(agents.router)
app.include_router(metrics.router)
app.include_router(settings.router)
app.include_router(auth.router)


@app.get("/", tags=["root"])
async def root() -> dict[str, str]:
    """Landing route reminding readers that this is a placeholder app."""

    return {"message": "FastAPI scaffolding is ready for real implementations."}
