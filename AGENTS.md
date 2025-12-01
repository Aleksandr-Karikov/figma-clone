# AGENTS.md

**Figma Clone** — real-time vector editing web application.

Simplified Figma clone with canvas, basic shapes, editing, and collaboration.

---

## IMPORTANT: Context-Driven Development

**This file is intentionally high-level.** Detailed documentation lives in `context/`.

**When working on a task, you MUST:**

1. Read relevant `context/` docs based on your task (see index below)
2. Fetch on-demand rather than trying to hold everything in context
3. Start with `context/README.md` if unsure where to look

**The `context/` folder is the source of truth.** Use AGENTS.md as a map, not a manual.

---

## Quick Start

**Monorepo with Turbo + Yarn:**

```bash
yarn install
yarn dev          # Watch mode for all packages
yarn build        # Build all packages
```

**IMPORTANT FOR AGENTS:**

- User runs dev environment in watch mode
- **DO NOT** run builds unless explicitly asked
- **DO NOT** start background processes
- Focus on code edits; watch mode handles recompilation

---

## Project Structure

```
figma-clone/
├── apps/
│   ├── web/              # React frontend (Vite + React 18)
│   │   ├── src/
│   │   │   ├── components/  # Canvas, Toolbar, PropertyPanel
│   │   │   ├── store/       # Zustand state management
│   │   │   └── hooks/       # Application hooks
│   │   └── ...
│   └── api/              # NestJS backend (Fastify)
├── packages/
│   └── core/             # Shared @figma-clone/core
│       ├── domain/       # Business logic & types
│       ├── application/  # Use cases
│       └── infrastructure/ # External dependencies (renderers)
└── context/              # 📚 Architecture docs (READ THIS!)
```

---

## Core Primitives

Project built on 5 primitives:

1. **Shape** - Base interface for all canvas objects
2. **Document** - Container for shapes and artboards
3. **Renderer** - Abstraction over graphics library (Konva)
4. **Operation** - Commands for state changes (undo/redo)
5. **Store** - Centralized state (Zustand + Immer)

**For details:** Read `context/concepts/core.md`

---

## Context Documentation Index

### Start Here (Essential Reading)

**Before making ANY changes, read:**

- **`context/README.md`** - Complete index of all context docs
- **`context/concepts/core.md`** - Vision, 5 primitives, core insights
- **`context/concepts/architecture.md`** - System design, layers, data flow
- **`context/concepts/models.md`** - Canonical data models

### By Task Type

**Adding UI feature?**

- `guidelines/frontend.md` - React patterns, components, hooks
- `guidelines/styling.md` - Tailwind CSS, design system
- `concepts/canvas.md` - Canvas, events, interaction

**Working with shapes?**

- `concepts/shapes.md` - ⭐ **Shape model, types, factories (CRITICAL)**
- `concepts/rendering.md` - Rendering abstraction
- `concepts/operations.md` - Shape operations

**Adding new shape?**

- `concepts/shapes.md` - ⭐ **Step-by-step guide**
- `guidelines/adding-shapes.md` - Checklist and patterns

**Working with renderer?**

- `concepts/rendering.md` - Konva abstraction
- `concepts/architecture.md` - Architecture layers

**Adding backend service?**

- `concepts/architecture.md` - System design, service patterns
- `concepts/realtime.md` - WebSocket, real-time sync
- `guidelines/backend.md` - NestJS patterns, API design

**Working with state?**

- `concepts/store.md` - Zustand + Immer, store structure
- `concepts/operations.md` - Operations, undo/redo

**Adding real-time feature?**

- `concepts/realtime.md` - Socket.IO, synchronization
- `concepts/collaboration.md` - Cursors, comments, collaboration

**Working with types?**

- `concepts/models.md` - TypeScript types, interfaces
- `guidelines/typescript.md` - TypeScript standards

---

## Development Patterns

### Code Standards

1. **Type-driven** - Strict TypeScript, all types from `packages/core`
2. **Centralize types** - ALWAYS import from `packages/core/src/domain/` (never redefine)
3. **Read before edit** - Always read files before modifying
4. **Prefer Edit over Write** - Modify existing files when possible
5. **Abstraction over libraries** - NEVER call Konva API directly outside Renderer
6. **Error handling** - Clean user-facing errors, no stacktraces in UI

### Important Rules

**Renderer Abstraction:**

- ✅ Use `IRenderer` interface for all graphics operations
- ❌ NEVER import `react-konva` or `konva` directly in UI
- ❌ NEVER call Konva API outside `KonvaRenderer`

**Types:**

- Import types from `packages/core/src/domain/`
- BaseShape, Shape, Document, Operation, etc.
- Never redefine canonical types

**State:**

- Use Zustand store from `apps/web/src/store`
- All changes through operations (Operations)
- Undo/redo support via Command pattern

**Monorepo:**

- Use workspaces: `@figma-clone/core` (shared domain logic)
- Application-specific code in `apps/web` (components, store, hooks)
- Turbo caches builds automatically
- Yarn workspaces manages dependencies

**Watch Mode:**

- User runs `yarn dev` (watch mode for all packages)
- **DO NOT** run builds unless explicitly asked
- **DO NOT** start background processes

---

## Common Tasks

### Adding a New Shape

1. Read `context/concepts/shapes.md` and `context/guidelines/adding-shapes.md`
2. Update types in `packages/core/src/domain/shapes/types.ts`
3. Add factory in `packages/core/src/domain/shapes/factories.ts`
4. Implement rendering in `packages/core/src/infrastructure/renderers/KonvaRenderer.ts`
5. Add creation operation in `packages/core/src/domain/operations/`
6. Update UI toolbar component in `apps/web/src/components/Toolbar/`
7. Update store in `apps/web/src/store/canvasStore.ts`

### Adding a New Property to Shapes

1. Update `BaseShape` or specific interface in `packages/core/src/domain/shapes/types.ts`
2. Update `IRenderer` interface in `packages/core/src/infrastructure/renderers/IRenderer.ts`
3. Implement in `KonvaRenderer.ts`
4. Add control in `apps/web/src/components/PropertyPanel/PropertyPanel.tsx`
5. Update update operation in `packages/core/src/domain/operations/UpdateShapeOperation.ts`

---

## Tech Stack

**Frontend:**

- React 18 + TypeScript + Vite
- Zustand + Immer - State management
- Tailwind CSS + CSS modules - Styling
- Konva (via abstraction) - Graphics

**Backend:**

- NestJS + Fastify - API server
- PostgreSQL - Database
- Redis - Caching and pub/sub
- Socket.IO - WebSocket for real-time

**Build & Dev:**

- Turbo - Monorepo build
- Yarn Workspaces - Dependency management
- TypeScript - Strict typing

---

## Key Files

**Configuration:**

- `turbo.json` - Turbo configuration
- `package.json` - Root package.json with workspaces
- `.env.example` - Environment variables example

**Important Paths:**

- `packages/core/src/domain/` - Canonical types and domain logic
- `packages/core/src/infrastructure/renderers/` - Renderer abstraction
- `apps/web/src/components/` - React components (Canvas, Toolbar, PropertyPanel)
- `apps/web/src/store/` - Zustand store
- `apps/web/src/hooks/` - Application hooks
- `context/concepts/` - Architecture documentation

---

## Roadmap

### Phase 1: Basic Editor (MVP)

- ✅ Project initialization + architecture
- ⬜ Canvas renderer with Konva
- ⬜ Basic shapes (rectangle, circle, text)
- ⬜ Selection and movement
- ⬜ Property panel for editing
- ⬜ Save/load document

### Phase 2: Editing

- ⬜ Grouping/ungrouping
- ⬜ Layers (z-index)
- ⬜ Transform (scale, rotate)
- ⬜ Alignment and distribution
- ⬜ Action history (undo/redo)

### Phase 3: Collaboration

- ⬜ WebSocket connection
- ⬜ Real-time synchronization
- ⬜ Other users' cursors
- ⬜ Comments and discussions

### Phase 4: Advanced Features

- ⬜ Vector paths (pen tool)
- ⬜ Export to SVG/PNG
- ⬜ Plugins and extensions
- ⬜ Performance (virtualization)

---

## Remember

📚 **Context docs are the source of truth** - fetch on-demand based on task
🔍 **Start with `context/README.md`** - complete index of all concepts
⚠️ **Read `shapes.md` before adding shapes** - fundamental architecture
🚫 **Never call Konva directly** - always through abstraction
✨ **Watch mode is running** - don't build unless explicitly asked
🏗️ **Monorepo** - use workspace imports, Turbo manages builds

---

_For product overview: see `README.md`_
_For architecture: see `context/`_
