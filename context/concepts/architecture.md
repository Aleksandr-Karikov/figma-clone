# Architecture

System architecture, layers, data flow, and code organization principles.

---

## Overview

Project follows **Clean Architecture** with **Domain-Driven Design** elements.

**Main idea:** Layer separation with clear boundaries and dependencies.

---

## Layer Structure

```
UI Layer (React components, Zustand hooks, events)
    ↓ uses
Application Layer (Use cases, business logic orchestration)
    ↓ uses
Domain Layer (Business logic, types)
    ↓ uses
Infrastructure Layer (External dependencies)
```

**Dependency rule:** Inner layers don't know about outer layers.

---

## Package Structure

```
packages/
├── core/                    # Domain + Application + Infrastructure
│   ├── domain/              # Business logic (pure)
│   │   ├── shapes/          # Shape models
│   │   ├── document/        # Document model
│   │   └── operations/      # Operations (commands)
│   ├── application/         # Use cases
│   └── infrastructure/      # External dependencies
│       ├── renderers/       # Graphics abstraction
│       ├── api/             # HTTP clients
│       └── realtime/        # WebSocket client
├── ui/                      # UI Layer
│   ├── components/          # React components
│   ├── canvas/              # Canvas component
│   └── toolbar/             # Toolbar
└── store/                   # State Management
    └── canvasStore.ts       # Zustand store
```

---

## Domain Layer

**Purpose:** Pure business logic, independent of frameworks.

**Principles:**

- ✅ Pure functions
- ✅ No dependencies on React, Konva, etc.
- ✅ Testability without mocks
- ❌ No side effects

---

## Application Layer

**Purpose:** Business logic orchestration, use cases.

**Pattern:** Use cases coordinate domain logic and infrastructure.

---

## Infrastructure Layer

**Purpose:** Implementation of interfaces for external dependencies.

**Key abstraction:** `IRenderer` interface for graphics operations.

**Key principle:** UI never imports Konva directly.

---

## UI Layer

**Purpose:** Presentation layer, React components.

**Principles:**

- ✅ Thin components
- ✅ Logic in hooks
- ✅ Use store through hooks
- ❌ No business logic in components

---

## Data Flow

1. **User Action → UI** - User interacts with UI
2. **UI → Use Case** - UI calls use case
3. **Use Case → Operation** - Use case creates and executes operation
4. **Operation → Store** - Operation updates store
5. **Store → Renderer** - Store syncs with renderer
6. **Renderer → UI** - Renderer updates canvas, React re-renders

---

## State Management

**Zustand Store** with Immer for immutable updates.

**Pattern:** All state changes through operations for undo/redo support.

**See also:** [`store.md`](./store.md)

---

## Real-time Synchronization

**WebSocket Flow:**

- User action → Operation → Store → WebSocket → Server
- Other users receive operations and apply them

**See also:** [`realtime.md`](./realtime.md)

---

## Testing Strategy

- **Unit Tests** - Domain logic (pure functions, no mocks)
- **Integration Tests** - Use cases with mocked store/renderer
- **E2E Tests** - Critical user scenarios

---

## Common Patterns

### Factory Pattern

- Shape creation through factories

### Command Pattern

- All changes through operations

### Observer Pattern

- Store subscribes to changes, updates renderer

---

## Next Steps

- Study [`models.md`](./models.md) for data models
- Study [`shapes.md`](./shapes.md) for working with shapes
- Study [`rendering.md`](./rendering.md) for rendering

---

_See also: [`AGENTS.md`](../../AGENTS.md) for project overview_
