# Feature Deep Dive: WebXR Spatial Knowledge Computing

> Apple Vision Pro & Meta Quest Immersion for the 3D Knowledge Universe

---

## 🥽 Spatial Computing in Education

On a laptop, the **3D Knowledge Graph** is an interactive Three.js canvas. 

When opened in a WebXR-compatible browser (Apple Vision Pro Safari, Meta Quest Browser), MayuronOS enables an **"Enter Immersive Matrix"** mode.

---

## 🌌 Spatial Features

1. **Step Inside Your Knowledge Universe:**
   * Concept nodes become floating, translucent spheres positioned around your physical room.
2. **Hand Tracking & Direct Pinch Interaction:**
   * Pinch a concept sphere with your fingers to inspect its mastery breakdown or launch an instant quiz in floating space.
3. **Spatial Audio Beacons:**
   * Knowledge gaps (Red nodes) emit subtle ambient spatial audio pulses that guide your gaze toward concepts you need to review.

```
[ Three.js Canvas ] ──► [ @react-three/xr Provider ]
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
   [ Desktop / Mobile 3D ]               [ WebXR Immersive AR/VR ]
   (Mouse Orbit & Touch)                 (Hand Tracking & Spatial UI)
```
