# Data Models

Canonical data models for the project. All types defined in `packages/core/src/domain/`.

---

## Overview

**Important:** All types imported from `packages/core/src/domain/`. Never redefine them in other packages.

---

## BaseShape

Base interface for all shapes on canvas.

**Key properties:**

- `id` - UUID v7
- `type` - Shape type discriminator
- `x, y` - Position
- `width, height` - Dimensions
- `rotation` - Rotation in degrees
- `opacity` - Opacity (0-1)
- `visible` - Visibility flag
- `locked` - Lock flag
- `metadata` - Extension metadata

---

## Shape Types

All shapes extend `BaseShape` and add type-specific properties:

- **Rectangle** - Fill, stroke, corner radius
- **Circle** - Fill, stroke
- **Text** - Content, font properties, alignment
- **Path** - SVG path data, closed flag

**Union type:** `Shape = Rectangle | Circle | Text | Path`

---

## Document

Container for shapes and artboards.

**Key properties:**

- `id` - UUID
- `name` - Document name
- `shapes` - Array of shapes
- `artboards` - Array of artboards
- `width, height` - Canvas dimensions
- `backgroundColor` - Background color
- `version` - Version for synchronization

---

## Artboard

Frame that contains a group of shapes.

**Key properties:**

- `id` - UUID
- `name` - Artboard name
- `x, y, width, height` - Position and dimensions
- `backgroundColor` - Background color
- `shapeIds` - IDs of shapes belonging to artboard

---

## Operation

Command for state changes with undo/redo support.

**Key properties:**

- `id` - UUID
- `type` - Operation type
- `shapeId` - Target shape ID (if applicable)
- `data` - Operation data
- `timestamp` - Execution time
- `userId` - User ID (for collaboration)

**Methods:**

- `execute()` - Execute operation
- `undo()` - Undo operation
- `redo()` - Redo operation

---

## Selection

Current selection state.

**Key properties:**

- `shapeIds` - Array of selected shape IDs
- `bounds` - Selection bounding box (optional)

---

## Transform

Transformation data for shapes.

**Key properties:**

- `x, y` - Position
- `width, height` - Dimensions
- `rotation` - Rotation
- `scaleX, scaleY` - Scale factors

---

## User (for collaboration)

User data for real-time collaboration.

**Key properties:**

- `id` - UUID
- `name` - User name
- `avatar` - Avatar URL (optional)
- `color` - Cursor/selection color
- `cursor` - Current cursor position (optional)

---

## Type Location

All types defined in:

```
packages/core/src/domain/
├── shapes/types.ts          # BaseShape, Shape, ShapeType
├── document/types.ts        # CanvasDocument, Artboard
├── operations/types.ts      # Operation, OperationHistory
└── shared/types.ts          # Selection, Transform, User
```

---

## Import Pattern

**✅ Correct:**

- Import types from `@figma-clone/core/domain/...`

**❌ Incorrect:**

- Redefining types in other packages

---

## Validation

All models must pass validation before use.

**Pattern:** Validation functions in `domain/*/validators.ts`

---

## Next Steps

- Study [`shapes.md`](./shapes.md) for working with shapes
- Study [`document.md`](./document.md) for working with documents
- Study [`operations.md`](./operations.md) for operations

---

_See also: [`AGENTS.md`](../../AGENTS.md) for project overview_
