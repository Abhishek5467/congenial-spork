import streamlit as st
from streamlit.components.v1 import html

st.set_page_config(layout="wide")

st.title("Interactive Spline Editor")

html_code = """
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; }
    canvas { display: block; }
  </style>
</head>
<body>

<script src="https://unpkg.com/canvas-sketch@0.7.6/dist/canvas-sketch.umd.js"></script>

<script>
""" + open("script.js").read() + """
</script>

</body>
</html>
"""

html(html_code, height=1100)