import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(layout="wide")

st.title("🎨 Interactive Spline Editor")

with open("script.js", "r") as f:
    js_code = f.read()

html_code = f"""
<!DOCTYPE html>
<html>
<head>
  <style>
    body {{ margin: 0; background: #111; }}
    canvas {{ display: block; }}
  </style>
</head>
<body>

<script src="https://unpkg.com/canvas-sketch@0.7.6/dist/canvas-sketch.umd.js"></script>

<script>
{js_code}
</script>

</body>
</html>
"""

components.html(html_code, height=1100)