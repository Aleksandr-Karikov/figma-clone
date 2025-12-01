# Real-time Synchronization

WebSocket synchronization for real-time collaboration.

---

## Overview

**Real-time synchronization** allows multiple users to work on the same document simultaneously.

**Technologies:**
- Socket.IO for WebSocket
- Operations for change synchronization
- Operational Transform for conflict resolution

---

## WebSocket Client

**Pattern:**
- Connect to WebSocket server
- Join document room
- Listen for operations from other users
- Send operations to server

**Location:** `packages/core/src/infrastructure/realtime/WebSocketClient.ts`

---

## Operation Synchronization

**Sending operations:**
- Execute operation locally
- Serialize operation
- Send through WebSocket

**Receiving operations:**
- Deserialize operation
- Execute operation
- Update store and renderer

---

## Conflict Resolution

**Operational Transform:**
- Transform operations when conflicts occur
- Apply transformed operations
- Maintain consistency across clients

**Version Control:**
- Document version for sync
- Compare versions
- Merge changes when needed

---

## Cursor Synchronization

**Pattern:**
- Send cursor position on mouse move (throttled)
- Receive cursor positions from other users
- Display remote cursors on canvas

---

## Presence

**Pattern:**
- Track active users in document
- Show user avatars/names
- Handle user join/leave events

---

## Next Steps

- Study [`collaboration.md`](./collaboration.md) for collaboration
- Study [`operations.md`](./operations.md) for operations

---

_See also: [`AGENTS.md`](../../AGENTS.md) for project overview_
