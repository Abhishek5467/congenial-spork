# 🎨 Interactive Spline Editor

## 📖 Overview

This project is an interactive canvas-based tool for constructing and editing smooth curves using **quadratic splines**.

It allows users to:

* Add control points dynamically
* Drag and reposition points
* Insert points intelligently along existing curve segments
* Visualize the nearest segment and projection point in real time

The system combines **computational geometry, interaction design, and rendering logic** to emulate behaviors found in vector design tools.

---

## ⚙️ Core Features

### 🎯 Interactive Point Editing

* Click to add points
* Drag to reposition
* Nearest-point selection using distance threshold

---

### 📐 Quadratic Spline Construction

* Curve generated using midpoint smoothing
* Piecewise quadratic Bézier segments
* Smooth visual interpolation between points

---

### 📍 Smart Point Insertion

* Detects nearest segment using projection
* Inserts new point at the correct position in the sequence
* Preserves curve topology

---

### 🧮 Geometric Projection (Key Concept)

The closest point on a segment is computed using:

u = ((P - A) · (B - A)) / |B - A|²

* ( u ) is clamped to ([0,1])
* Used to compute projection point
* Enables accurate snapping to segments

---

### 🎨 Real-Time Visual Feedback

* Highlight nearest segment (orange)
* Display projection point (orange dot)
* Continuous hover tracking

---

## 🧠 Concepts Used

* Computational Geometry
* Event-driven Interaction Systems
* Canvas Rendering Pipeline
* Spatial Querying (nearest point & segment projection)
* Curve Approximation (Quadratic Splines)

---

## 🚀 Outcome

This project demonstrates:

* Ability to build **interactive geometry systems**
* Understanding of **graphics + UX integration**
* Strong foundation for:

  * Vector editors
  * Creative coding tools
  * CAD-like interfaces

---

## 🧱 Project Structure

```bash
spline-editor/
│
├── index.html
├── script.js
├── styles.css
├── README.md
└── demo.gif / screenshot.png
```

---

## 🌐 Minimal Setup

### `index.html`

```html
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
```

---

## 📸 Demo (Recommended)

For best portfolio impact, include:

* GIF showing interaction
* Short demo video

---

## 🌐 Streamlit App (Deployment)

This project can be embedded into a Streamlit app.

### ⚠️ Note

* Streamlit uses Python
* This project uses JavaScript

So we embed the canvas using an HTML component.

---

### ✅ Installation

```bash
pip install streamlit
```

---

### ✅ `app.py`

```python
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
```

---

### ✅ Run the App

```bash
streamlit run app.py
```

---

## 🔮 Future Improvements

* Cubic Bézier curves with handles
* Curve snapping & constraints
* Export curve data (JSON / SVG)
* Animation (GSAP / noise-based motion)

---

## 🧠 Summary

This project showcases the design of an **interactive curve editing system**, combining:

* geometry
* rendering
* user interaction

It reflects the foundational principles behind modern design tools like vector editors.

---
