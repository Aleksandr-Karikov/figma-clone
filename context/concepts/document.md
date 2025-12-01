# Document

Document model, artboards, and document management.

---

## Overview

**Document** — container for all shapes and artboards on canvas.

---

## CanvasDocument

**Key properties:**
- `id` - UUID
- `name` - Document name
- `shapes` - Array of all shapes
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

**Note:** Shapes can belong to an artboard or be outside it.

---

## Document Operations

**Common operations:**
- Create document
- Add shape to document
- Remove shape from document
- Create artboard
- Add shape to artboard

**Pattern:** All operations update document and increment version.

---

## Document Validation

**Pattern:**
- Validate required fields
- Validate dimensions
- Validate all shapes
- Return validation result

---

## Document Serialization

**Pattern:**
- Serialize to JSON for storage
- Deserialize from JSON for loading
- Handle date serialization
- Preserve all document state

---

## Version Control

**Document version** used for real-time synchronization:

**Pattern:**
- Increment version on change
- Compare versions for sync
- Merge changes when versions differ

---

## Next Steps

- Study [`models.md`](./models.md) for data models
- Study [`store.md`](./store.md) for working with state

---

_See also: [`AGENTS.md`](../../AGENTS.md) for project overview_
