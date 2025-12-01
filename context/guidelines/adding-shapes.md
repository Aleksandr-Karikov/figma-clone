# Adding Shapes - Step by Step Guide

Step-by-step guide for adding a new shape type to the project.

---

## Checklist

- [ ] Add type to `types.ts`
- [ ] Add factory in `factories.ts`
- [ ] Add validation in `validators.ts`
- [ ] Implement rendering in `KonvaRenderer.ts`
- [ ] Add creation operation (if needed)
- [ ] Add to UI toolbar
- [ ] Add to property panel
- [ ] Update documentation

---

## Step 1: Add Type Definition

**File:** `packages/core/src/domain/shapes/types.ts`

- Add to `ShapeType` union
- Create interface extending `BaseShape`
- Add to `Shape` union type

---

## Step 2: Add Factory Method

**File:** `packages/core/src/domain/shapes/factories.ts`

- Create factory method for new shape type
- Ensure valid defaults
- Generate UUID for shape ID

---

## Step 3: Add Validation

**File:** `packages/core/src/domain/shapes/validators.ts`

- Create validation function for new shape type
- Check required fields
- Check value ranges
- Add to main validation function

---

## Step 4: Implement Rendering

**File:** `packages/core/src/infrastructure/renderers/KonvaRenderer.ts`

- Add case in shape type switch
- Create rendering method
- Handle shape-specific properties
- Update `updateShape` method if needed

---

## Step 5: Add Operation (Optional)

**File:** `packages/core/src/domain/operations/`

- Create operation class if needed
- Implement execute/undo/redo methods

---

## Step 6: Add to UI Toolbar

**File:** `apps/web/src/components/Toolbar/Toolbar.tsx`

- Add toolbar button
- Handle click to create shape
- Add icon if needed

---

## Step 7: Add to Property Panel

**File:** `apps/web/src/components/PropertyPanel/PropertyPanel.tsx`

- Add property controls for new shape type
- Handle property updates
- Show shape-specific properties

---

## Step 8: Update Documentation

- Update [`concepts/shapes.md`](../concepts/shapes.md)
- Update [`concepts/models.md`](../concepts/models.md)
- Add usage examples

---

## Testing

**Unit tests:**

- Factory creates valid shape
- Validation works correctly
- Rendering works

**Integration tests:**

- Shape creation through UI
- Property editing
- Rendering on canvas

---

## Common Pitfalls

**❌ Forgetting to add to Shape union**

- Must add to `Shape` union type

**❌ Forgetting to update updateShape**

- Must handle new type in renderer update method

**❌ Direct Konva calls in UI**

- Always use renderer abstraction

---

## Next Steps

After adding shape:

1. Test creation through UI
2. Test property editing
3. Test rendering
4. Check undo/redo
5. Update documentation

---

_See also: [`concepts/shapes.md`](../concepts/shapes.md) for general shape information_
