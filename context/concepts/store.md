# Store (State Management)

State management via Zustand + Immer.

---

## Overview

**Store used for:**

- Storing document state
- Managing selection
- Operation history (undo/redo)
- Reactive UI updates

---

## Store Structure

**Key state:**

- `document` - Current document
- `selectedShapes` - Selected shape IDs
- `operations` - Operation history
- `currentOperationIndex` - Current position in history

**Key actions:**

- Shape management: `addShape`, `updateShape`, `deleteShape`
- Selection: `selectShape`, `selectShapes`, `deselectAll`
- Operations: `addOperation`, `undo`, `redo`

---

## Implementation with Zustand

**Pattern:**

- Use Zustand `create` with Immer middleware
- Immutable updates via Immer
- Actions update state through `set`

**Location:** `packages/store/src/canvasStore.ts`

---

## Usage in Components

**Pattern:**

- Use `useCanvasStore` hook
- Select specific state slices
- Use actions from store

**Optimization:**

- Use selectors to avoid unnecessary re-renders
- Use `shallow` for object comparisons

---

## Operations Pattern

**All state changes through operations for undo/redo:**

**Pattern:**

1. Create operation
2. Execute operation
3. Add to store history
4. Store updates state

**Undo/Redo:**

- `undo()` - Execute `operation.undo()`, move index back
- `redo()` - Move index forward, execute `operation.redo()`

---

## Sync with Renderer

**Pattern:**

- Store subscribes to changes
- On change, call `renderer.sync(state.shapes)`
- Renderer updates canvas

---

## Next Steps

- Study [`operations.md`](./operations.md) for operations
- Study [`architecture.md`](./architecture.md) for architecture

---

_See also: [`AGENTS.md`](../../AGENTS.md) for project overview_
