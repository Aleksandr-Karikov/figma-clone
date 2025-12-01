# Rendering

Abstraction over graphics library (Konva) for rendering shapes.

---

## Overview

**Key principle:** Never call Konva API directly in UI.

**Why abstraction?**

- Avoid vendor lock-in
- Easy library replacement (Fabric.js, Paper.js, etc.)
- Testability without real rendering
- Single entry point for graphics operations

---

## IRenderer Interface

Abstraction interface for all graphics operations.

**Key methods:**

- Shape management: `addShape`, `updateShape`, `removeShape`, `getShape`
- Canvas management: `clear`, `sync`
- Events: `on`, `off`
- Utilities: `getBoundingBox`, `hitTest`

**Location:** `packages/core/src/infrastructure/renderers/IRenderer.ts`

---

## KonvaRenderer Implementation

Implementation of `IRenderer` using Konva.

**Pattern:**

- Create Konva stage and layer
- Map shapes to Konva nodes
- Handle shape type-specific rendering
- Sync with store changes

**Location:** `packages/core/src/infrastructure/renderers/KonvaRenderer.ts`

---

## Renderer Factory

Factory for creating renderer instances.

**Pattern:**

- Factory method takes renderer type
- Returns `IRenderer` implementation
- Currently supports Konva, extensible for others

**Location:** `packages/core/src/infrastructure/renderers/RendererFactory.ts`

---

## Usage in UI

**✅ Correct:**

- Use `IRenderer` interface
- Get renderer from factory
- Call renderer methods

**❌ Incorrect:**

- Direct Konva imports in UI
- Direct Konva API calls

---

## Renderer Events

**Pattern:**

- Renderer emits events for user interactions
- UI subscribes to events
- Events trigger store updates

**Common events:**

- `shape:click` - Shape clicked
- `shape:drag` - Shape dragged
- `canvas:click` - Canvas clicked

---

## Sync Pattern

**Synchronization between store and renderer:**

**Pattern:**

- Store subscribes to changes
- On change, call `renderer.sync(shapes)`
- Renderer updates canvas to match store state

**Benefits:**

- Single source of truth (store)
- Automatic canvas updates
- No manual sync needed

---

## Performance Optimization

**Strategies:**

- Batch updates - group multiple updates
- Virtualization - render only visible shapes
- Debouncing - debounce frequent updates

---

## Testing

**Pattern:**

- Mock renderer for unit tests
- Test renderer implementation separately
- Integration tests with real renderer

---

## Adding Support for New Shape Type

**Steps:**

1. Update `IRenderer` interface if needed
2. Add rendering method in `KonvaRenderer`
3. Add case in shape type switch

---

## Future: Multiple Renderers

Abstraction allows easy addition of other renderers:

- FabricRenderer (Fabric.js)
- PaperRenderer (Paper.js)
- SVGRenderer (SVG)

UI code remains unchanged!

---

## Next Steps

- Study [`shapes.md`](./shapes.md) for working with shapes
- Study [`canvas.md`](./canvas.md) for working with canvas
- Study [`architecture.md`](./architecture.md) for architecture

---

_See also: [`AGENTS.md`](../../AGENTS.md) for project overview_
