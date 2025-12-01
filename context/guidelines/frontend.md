# Frontend Guidelines

React patterns, components, hooks, and best practices for UI layer.

---

## Overview

**Frontend Stack:**

- React 18+ with TypeScript
- Zustand for state
- Tailwind CSS for styles
- Vite for building

---

## Component Structure

**File Organization:**

- Components in `apps/web/src/components/`
- Hooks in `apps/web/src/hooks/`
- Store in `apps/web/src/store/`
- Utils in `apps/web/src/utils/` (if needed)

---

## Component Patterns

### Presentational Components

**Thin components, UI only:**

- Receive props
- Render UI
- Call callbacks on interaction
- No business logic

### Container Components

**Components with logic, use hooks:**

- Use custom hooks
- Handle events
- Manage local state if needed
- Connect to store

---

## Hooks

### Custom Hooks Pattern

**Extract logic to hooks:**

- Business logic in hooks
- Reusable across components
- Testable independently

### Common Hooks

- `useCanvas` - Canvas operations
- `useRenderer` - Renderer instance
- `useShapeSelection` - Selection management
- `useKeyboardShortcuts` - Keyboard handling

---

## State Management

### Using Zustand Store

**Pattern:**

- Use `useCanvasStore` hook
- Select specific state slices
- Use actions from store

**Optimization:**

- Use selectors to avoid re-renders
- Use `shallow` for object comparisons

---

## Event Handling

### Canvas Events

**Pattern:**

- Convert screen to canvas coordinates
- Hit test for shapes
- Update selection or trigger actions

### Keyboard Shortcuts

**Pattern:**

- Global keyboard event listener
- Prevent default for handled keys
- Call store actions

---

## Styling

### Tailwind CSS

**Pattern:**

- Use utility classes
- Conditional classes with `cn()` utility
- Follow design system

### CSS Modules

**Pattern:**

- Use for complex components
- Scoped styles
- Import as module

---

## TypeScript

### Component Props

**Pattern:**

- Explicit prop types
- Use interfaces
- Optional props with `?`

### Event Handlers

**Pattern:**

- Typed event handlers
- Avoid `any` types

---

## Performance

### React.memo

**Pattern:**

- Memoize components that re-render often
- Use for list items

### useMemo / useCallback

**Pattern:**

- Memoize expensive computations
- Memoize callback functions
- Avoid unnecessary re-renders

---

## Testing

**Pattern:**

- Unit tests for components
- Test user interactions
- Test edge cases

---

## Common Patterns

### Conditional Rendering

**Pattern:**

- Early return for null cases
- Conditional rendering with `&&`

### Lists

**Pattern:**

- Use keys from data
- Avoid index as key

---

## What to Avoid

### ❌ Business Logic in Components

**Pattern:**

- Extract to hooks
- Use use cases
- Keep components thin

### ❌ Direct Konva Imports

**Pattern:**

- Always use renderer abstraction
- Never import Konva directly

---

## Next Steps

- Study [`styling.md`](./styling.md) for styling
- Study [`concepts/canvas.md`](../concepts/canvas.md) for canvas work

---

_See also: [`AGENTS.md`](../../AGENTS.md) for project overview_
