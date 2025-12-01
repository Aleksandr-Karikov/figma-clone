# Canvas

Working with canvas: events, interaction, user input handling.

---

## Overview

**Canvas** — main component for displaying and interacting with shapes.

---

## Canvas Component

**Responsibilities:**
- Initialize renderer
- Handle mouse events
- Handle keyboard shortcuts
- Sync with store
- Display shapes

**Pattern:**
- Container component with renderer
- Event handlers for user input
- Store integration for state

---

## Mouse Events

**Common events:**
- **Click** - Select shape or deselect
- **Drag** - Move shape or selection box
- **Mouse move** - Update cursor, hover effects

**Pattern:**
- Convert screen coordinates to canvas coordinates
- Hit test to find shapes under cursor
- Update selection or trigger actions

---

## Selection

**Types:**
- **Single** - One shape selected
- **Multi** - Multiple shapes selected
- **Box** - Select shapes in rectangular area

**Pattern:**
- Store selection in store
- Renderer highlights selected shapes
- Property panel shows selected shape properties

---

## Transform Handles

**Pattern:**
- Display handles for selected shapes
- Handle drag for resize/rotate
- Update shape through operation

---

## Keyboard Shortcuts

**Common shortcuts:**
- Delete/Backspace - Delete selected shapes
- Ctrl/Cmd + A - Select all
- Ctrl/Cmd + D - Duplicate
- Arrow keys - Move selected shapes
- Ctrl/Cmd + Z - Undo
- Ctrl/Cmd + Shift + Z - Redo

**Pattern:**
- Global keyboard event listener
- Prevent default for handled keys
- Call store actions

---

## Zoom & Pan

**Pattern:**
- Zoom: scale renderer viewport
- Pan: translate renderer viewport
- Update renderer transform

---

## Next Steps

- Study [`rendering.md`](./rendering.md) for rendering
- Study [`shapes.md`](./shapes.md) for working with shapes

---

_See also: [`AGENTS.md`](../../AGENTS.md) for project overview_
