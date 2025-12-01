# Shapes

Working with shapes: models, factories, validation, and rendering.

---

## Overview

**Shapes are the central concept of the project.** Everything revolves around shapes.

**Key principles:**

- All shapes inherit from `BaseShape`
- Creation through factories
- Validation before use
- Rendering through abstraction

---

## BaseShape Interface

All shapes must implement `BaseShape` interface with:

- Identity (id)
- Type discriminator
- Position and dimensions
- Visual properties (opacity, visibility, rotation)
- Lock state
- Extension metadata

---

## Shape Types

Each shape type extends `BaseShape` and adds type-specific properties:

- **Rectangle** - Fill, stroke, corner radius
- **Circle** - Fill, stroke
- **Text** - Content, font properties, alignment
- **Path** - SVG path data, closed flag

**Union type:** `Shape = Rectangle | Circle | Text | Path`

---

## Shape Factory

**Always create shapes through factory.**

**Pattern:**

- Factory methods in `packages/core/src/domain/shapes/factories.ts`
- Each shape type has a factory method
- Factory ensures valid defaults and generates IDs

**Benefits:**

- Consistent shape creation
- Valid defaults
- ID generation
- Type safety

---

## Shape Validation

**Always validate shapes before use.**

**Pattern:**

- Validation functions in `packages/core/src/domain/shapes/validators.ts`
- Check required fields
- Check value ranges
- Type-specific validation

---

## Adding a New Shape Type

**Steps:**

1. **Add type to `types.ts`**

   - Add to `ShapeType` union
   - Create interface extending `BaseShape`
   - Add to `Shape` union

2. **Add factory method**

   - Create factory method in `factories.ts`
   - Ensure valid defaults

3. **Add validation**

   - Add validation function in `validators.ts`
   - Add to main validation function

4. **Implement rendering**

   - Add rendering method in `KonvaRenderer.ts`
   - Add case in renderer switch

5. **Add to UI**
   - Add to toolbar
   - Add to property panel

**See also:** [`guidelines/adding-shapes.md`](../guidelines/adding-shapes.md)

---

## Shape Operations

All shape changes go through operations:

- **Create** - Create new shape
- **Update** - Update shape properties
- **Delete** - Delete shape
- **Move** - Move shape position

**Pattern:** Operation → Execute → Add to store → Sync renderer

**See also:** [`operations.md`](./operations.md)

---

## Shape Selection

**Pattern:**

- Single selection: one shape
- Multi selection: multiple shapes
- Selection box: select shapes in area

**Store:** Selection state in store, synced with renderer highlights.

---

## Shape Transform

**Pattern:**

- Get transform from shape
- Apply transform to shape
- Update through operation

---

## Common Patterns

### Cloning Shapes

- Create copy with new ID
- Offset position for visibility

### Grouping Shapes

- Group is also a shape type
- Contains references to child shapes

---

## Next Steps

- Study [`rendering.md`](./rendering.md) for rendering shapes
- Study [`operations.md`](./operations.md) for shape operations
- Study [`guidelines/adding-shapes.md`](../guidelines/adding-shapes.md) for adding new shapes

---

_See also: [`AGENTS.md`](../../AGENTS.md) for project overview_
