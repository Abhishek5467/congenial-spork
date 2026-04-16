import streamlit as st

st.set_page_config(layout="wide")

st.title("🎨 Interactive Spline Editor")

with open("index.html", "r") as f:
    html_code = f.read()

st.html(html_code, height=1100)