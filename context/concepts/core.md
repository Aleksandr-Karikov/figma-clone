# Core Concepts

Project vision, core primitives, and development philosophy.

---

## Vision

**Figma Clone** — simplified Figma clone for real-time vector editing.

**MVP Goals:**

- Canvas for vector editing
- Basic shapes (rectangle, circle, text)
- Editing and transformation
- Real-time collaboration

---

## Core Primitives

Project built on 5 primitives:

### 1. Shape

Base interface for all objects on canvas. All shapes inherit from `BaseShape` and add type-specific properties.

**Key principle:** All shapes must implement `BaseShape` interface.

**See also:** [`shapes.md`](./shapes.md)

---

### 2. Document

Container for shapes and artboards. Represents the entire canvas state.

**See also:** [`document.md`](./document.md)

---

### 3. Renderer

Abstraction over graphics library (Konva).

**Key principle:** Never call Konva API directly in UI.

**Why abstraction?**

- Avoid vendor lock-in
- Easy library replacement (Fabric.js, Paper.js, etc.)
- Testability without real rendering
- Single entry point for graphics operations

**See also:** [`rendering.md`](./rendering.md)

---

### 4. Operation

Command pattern for state changes (undo/redo support).

All state changes go through operations for:

- Undo/redo functionality
- Real-time synchronization
- Action logging

**See also:** [`operations.md`](./operations.md)

---

### 5. Store

Centralized state via Zustand + Immer.

**See also:** [`store.md`](./store.md)

---

## Architectural Principles

### 1. Clean Architecture

Clear layer separation:

- **Domain** - Business logic, framework-independent
- **Application** - Use cases, orchestration
- **Infrastructure** - External dependencies (renderer, API, WebSocket)
- **UI** - Presentation layer (React components)

**See also:** [`architecture.md`](./architecture.md)

---

### 2. Domain-Driven Design

- Domain model at the center
- Rich domain objects
- Explicit context boundaries

---

### 3. Abstraction over Libraries

**Abstraction over graphics library** to avoid vendor lock-in.

If we want to replace Konva with Fabric.js or Paper.js tomorrow, we only change the `IRenderer` implementation.

---

### 4. Reactive State

Centralized store with reactive updates.

---

## Development Philosophy

### Priorities

1. **Code clarity** over optimization (early stages)
2. **Testability** - extract logic from components
3. **Consistency** - follow existing architecture
4. **Documentation** - document complex algorithms

### Encouraged

- ✅ Creating reusable hooks
- ✅ Testable code
- ✅ Consistency with architecture
- ✅ Documentation of complex algorithms

### Avoid

- ❌ Direct Konva API calls outside Renderer
- ❌ Global variables
- ❌ Premature optimization
- ❌ State micromanagement

---

## Key Insights

### 1. Shape-Centric Design

Everything revolves around shapes. Document is a collection of shapes. Operations work with shapes. Renderer draws shapes.

### 2. Operation-Based Changes

All changes through operations for:

- Undo/redo
- Real-time sync
- Action logging

### 3. Renderer Abstraction

Abstraction allows:

- Easy graphics library replacement
- Testing without real rendering
- Support for different backends (Canvas, SVG, WebGL)

---

## Next Steps

- Study [`architecture.md`](./architecture.md) for architecture details
- Study [`shapes.md`](./shapes.md) for working with shapes
- Study [`rendering.md`](./rendering.md) for rendering

---

_See also: [`AGENTS.md`](../../AGENTS.md) for project overview_
