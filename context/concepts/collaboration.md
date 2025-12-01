# Collaboration

Collaborative features: cursors, comments, real-time collaboration.

---

## Overview

**Collaboration** includes:
- Other users' cursors
- Comments on canvas
- User presence
- Collaborative editing

---

## User Cursors

**Pattern:**
- Display remote cursor with user color
- Show user name near cursor
- Update cursor position in real-time
- Remove cursor when user leaves

---

## Comments

**Pattern:**
- Add comment at canvas position
- Attach comment to shape (optional)
- Comment threads with replies
- Resolve/unresolve comments

**Model:**
- Position on canvas
- Author and content
- Replies
- Resolution state

---

## Presence

**Pattern:**
- Show active users in document
- Display user avatars/names
- Handle user join/leave
- Update presence in real-time

---

## Selection Highlighting

**Pattern:**
- Highlight shapes selected by other users
- Use user color for highlighting
- Update in real-time

---

## Permissions

**Pattern:**
- Check permissions before actions
- Edit, comment, view permissions
- Enforce permissions in UI and backend

---

## Next Steps

- Study [`realtime.md`](./realtime.md) for synchronization
- Study [`store.md`](./store.md) for state

---

_See also: [`AGENTS.md`](../../AGENTS.md) for project overview_
