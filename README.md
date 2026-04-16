This project is an interactive canvas-based tool for constructing and editing smooth curves using quadratic splines. It allows users to:

Add control points dynamically
Drag and reposition points
Insert points intelligently along existing curve segments
Visualize nearest segment and projection point in real-time

The system combines geometry, interaction design, and rendering logic to simulate behavior similar to vector design tools.

⚙️ Core Features
🎯 1. Interactive Point Editing
Click to add points
Drag to reposition
Nearest-point selection using distance threshold
📐 2. Quadratic Spline Construction
Curve generated using midpoint smoothing
Piecewise quadratic Bézier segments
📍 3. Smart Point Insertion
Detect nearest segment using projection
Insert new point between correct indices
Maintains curve topology
🧮 4. Geometric Projection (Key Concept)

Closest point on a segment is computed using:

𝑢
=
(
𝑃
−
𝐴
)
⋅
(
𝐵
−
𝐴
)
∣
𝐵
−
𝐴
∣
2
u=
∣B−A∣
2
(P−A)⋅(B−A)
	​

Clamped to 
[
0
,
1
]
[0,1]
Used to compute projection point
Enables accurate snapping
🎨 5. Real-Time Visual Feedback
Highlight nearest segment (orange)
Show projection point (orange dot)
Continuous hover tracking
🧠 Concepts Used
Computational Geometry
Event-driven Interaction Systems
Canvas Rendering Pipeline
Spatial Querying (nearest neighbor + projection)
Curve Approximation (Quadratic Splines)
🚀 Outcome

This project demonstrates:

Ability to design interactive geometry systems
Understanding of graphics + UX integration
Strong foundation for:
vector editors
creative coding tools
CAD-like interfaces
🧱 2. Project Structure (important for portfolio)

Organize like this:

spline-editor/
│
├── index.html
├── script.js   ← your current code (cleaned)
├── styles.css
├── README.md
└── demo.gif / screenshot.png
Minimal index.html
<!DOCTYPE html>
<html>
<head>
  <title>Spline Editor</title>
  <style>
    body { margin: 0; background: #111; }
    canvas { display: block; }
  </style>
</head>
<body>
  <script src="https://unpkg.com/canvas-sketch@0.7.6/dist/canvas-sketch.umd.js"></script>
  <script src="script.js"></script>
</body>
</html>
🔥 Important (for portfolio)

Record:

GIF of interaction
short demo video
🌐 3. Streamlit App (deployment layer)

Now we wrap this inside Streamlit.

⚠️ Key constraint

Streamlit = Python
Your tool = JavaScript

👉 So we embed your canvas using HTML component

✅ Step 1: Install
pip install streamlit
✅ Step 2: Create app.py
import streamlit as st
from streamlit.components.v1 import html

st.set_page_config(layout="wide")

st.title("🎨 Interactive Spline Editor")

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
✅ Step 3: Run
streamlit run app.py