# Session 6: 3D Knowledge Graph

> **Status**: ⏳ Upcoming  
> **Goal**: Visualize the learner's knowledge as an interactive 3D graph  
> **Milestone**: M6 — The visual showpiece

---

## 🧠 Concepts You'll Learn

### 1. What is a Knowledge Graph?

A knowledge graph is a network of connected concepts:

```
    [JavaScript] ────── [Variables]
         │                  │
         │                  ├── [let/const]
         │                  └── [Scope]
         │
         ├──────── [Functions]
         │              │
         │              ├── [Arrow Functions]
         │              ├── [Closures] ──── [Scope]  (cross-connection!)
         │              └── [Callbacks]
         │
         └──────── [Arrays]
                       │
                       ├── [map/filter/reduce]
                       └── [Destructuring]
```

Each node = a concept. Each edge = a relationship. Node size/color = mastery level.

---

### 2. Three.js — 3D in the Browser

Three.js is the standard library for 3D graphics on the web. It uses WebGL (your GPU) to render.

```
Three.js Basics:
┌─────────────────────────────┐
│  Scene (the 3D world)       │
│  ├── Camera (your viewpoint)│
│  ├── Lights (illumination)  │
│  └── Meshes (3D objects)    │
│      ├── Geometry (shape)   │
│      └── Material (color)   │
│                             │
│  Renderer → draws to canvas │
└─────────────────────────────┘
```

---

### 3. React Three Fiber — React + Three.js

Instead of imperative Three.js code, we write declarative React components:

```typescript
// Imperative Three.js (old way):
const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshStandardMaterial({ color: 'blue' });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// React Three Fiber (our way):
function KnowledgeNode({ position, color, label }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
// It's just React! Props, state, hooks — all work normally.
```

---

### 4. Force-Directed Layout

Nodes position themselves using physics simulation:
- **Attraction**: Connected nodes pull toward each other
- **Repulsion**: All nodes push away from each other
- **Result**: Natural, readable clustering of related concepts

```typescript
// Simplified force simulation:
function simulateForces(nodes, edges) {
  for (const node of nodes) {
    // Repulsion: push away from all other nodes
    for (const other of nodes) {
      if (node !== other) {
        const force = repulsionForce(node, other);
        node.velocity += force;
      }
    }
    // Attraction: pull toward connected nodes
    for (const edge of edges.filter(e => e.source === node.id)) {
      const target = nodes.find(n => n.id === edge.target);
      const force = attractionForce(node, target);
      node.velocity += force;
    }
    node.position += node.velocity;
  }
}
```

---

### 5. Mastery Visualization

| Mastery Level | Node Color | Node Size | Glow |
|--------------|-----------|-----------|------|
| 0-20% | Red | Small | None |
| 21-50% | Orange | Medium | None |
| 51-80% | Yellow | Large | Subtle |
| 81-100% | Green | Largest | Bright |

Gap nodes (0% mastery, connected to known topics) pulse to suggest "learn this next."

---

## 🏗️ What We'll Build

| File | What It Does |
|------|-------------|
| `src/components/knowledge-graph/graph-canvas.tsx` | The 3D scene, camera, lights |
| `src/components/knowledge-graph/graph-node.tsx` | Individual concept sphere |
| `src/app/knowledge-graph/page.tsx` | The page that hosts the graph |

---

## ✅ Checklist — Do You Understand?

- [ ] What is a knowledge graph and why visualize it?
- [ ] What are the 3 core Three.js concepts (Scene, Camera, Renderer)?
- [ ] Why use React Three Fiber instead of raw Three.js?
- [ ] How does force-directed layout position nodes?
- [ ] How does mastery map to visual properties (color, size, glow)?
- [ ] What is WebGL and why does it matter for 3D?
