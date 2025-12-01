# Code Review Checklist

Checklist for code review before commit.

---

## Required Checks

### TypeScript

- [ ] TypeScript strict mode compliance
- [ ] No `any` types (except extreme cases with comment)
- [ ] All types imported from `packages/core/src/domain/`
- [ ] No redefinition of canonical types

### Architecture

- [ ] No direct Konva/Fabric API calls outside Renderer
- [ ] Use existing hooks and utilities
- [ ] Follow architecture layers (Domain → Application → Infrastructure → UI)
- [ ] No business logic in UI components

### Code

- [ ] Code is readable and understandable
- [ ] No code duplication
- [ ] Use existing patterns
- [ ] Comments for complex logic

### Tests

- [ ] Unit tests for new logic
- [ ] Tests pass
- [ ] Critical paths covered

---

## Desirable Checks

### Performance

- [ ] No unnecessary re-renders
- [ ] Use `React.memo`, `useMemo`, `useCallback` where needed
- [ ] Optimize large lists (virtualization)

### Accessibility

- [ ] ARIA attributes for interactive elements
- [ ] Keyboard navigation
- [ ] Screen reader support

### UI/UX

- [ ] Follow design system
- [ ] Handle loading/error states
- [ ] Validate user input

### Edge Cases

- [ ] Handle empty states
- [ ] Handle errors
- [ ] Handle boundary values

---

## Specific Checks

### When Adding Shape

- [ ] Type added to `ShapeType` union
- [ ] Interface extends `BaseShape`
- [ ] Factory creates shape with valid defaults
- [ ] Validation checks all required fields
- [ ] Rendering implemented in `KonvaRenderer`
- [ ] Added to UI toolbar
- [ ] Added to property panel
- [ ] Documentation updated

### When Working with Renderer

- [ ] Use `IRenderer` interface
- [ ] No direct imports of `react-konva` or `konva`
- [ ] Events handled through abstraction
- [ ] Store ↔ renderer sync works correctly

### When Working with State

- [ ] Changes through operations (for undo/redo)
- [ ] Use Zustand store
- [ ] No direct state mutations
- [ ] Selectors optimized (no unnecessary re-renders)

### When Working with API

- [ ] Error handling
- [ ] Loading states
- [ ] Response validation
- [ ] Request/response typing

---

## Red Flags (Critical Errors)

### ❌ Never Do:

- Direct Konva API calls in UI
- Redefining types from `packages/core`
- Business logic in React components
- Global variables
- Direct state mutations (without operations)
- `any` types without comment
- Ignoring TypeScript errors (`@ts-ignore`)

---

## Checklist Template

Use this template for code review:

```markdown
## Code Review

### Required Checks

- [ ] TypeScript strict mode
- [ ] No direct Konva calls
- [ ] Use existing patterns
- [ ] Tests added

### Desirable Checks

- [ ] Performance
- [ ] Accessibility
- [ ] UI/UX
- [ ] Edge cases

### Comments

- [ ] Notes
- [ ] Improvement suggestions
```

---

## Next Steps

After code review:

1. Fix critical errors
2. Discuss controversial points
3. Make improvements
4. Re-review if needed

---

_See also: [`AGENTS.md`](../../AGENTS.md) for project overview_
