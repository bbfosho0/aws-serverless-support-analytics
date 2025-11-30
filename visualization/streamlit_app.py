"""Legacy Streamlit dashboard kept for experimentation."""

from __future__ import annotations

from pathlib import Path

import streamlit as st

from . import charts, data_loader, filters


def render() -> None:
    """Render a card reminding developers to run the new frontend instead."""

    st.title("AWS Serverless Support Analytics – Legacy Prototype")
    st.info(
        "This placeholder app documents how the previous Streamlit dashboard was laid out."
    )
    charts.render_placeholder_chart(data_loader.load_sample_dataframe(Path("data")))


if __name__ == "__main__":
    render()
