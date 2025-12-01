# Operations

Operations (commands) for state changes with undo/redo support.

---

## Overview

**Command pattern** for all state changes.

**Benefits:**
- Undo/redo
- Action logging
- Real-time synchronization
- Deferred execution

---

## Base Operation

**Interface:**
- `id` - Operation ID
- `type` - Operation type
- `execute()` - Execute operation
- `undo()` - Undo operation
- `redo()` - Redo operation
- `timestamp` - Execution time

**Location:** `packages/core/src/domain/operations/base.ts`

---

## Operation Types

**Common operations:**
- **CreateShape** - Create new shape
- **UpdateShape** - Update shape properties
- **DeleteShape** - Delete shape
- **MoveShape** - Move shape position
- **Batch** - Group multiple operations

---

## Operation Pattern

**Pattern:**
1. Create operation with command data
2. Execute operation (updates store)
3. Add to store history
4. Store tracks operation for undo/redo

**Undo/Redo:**
- Store maintains operation history
- `undo()` calls `operation.undo()`
- `redo()` calls `operation.redo()`

---

## Real-time Synchronization

**Pattern:**
- Operations are serializable
- Send operation through WebSocket
- Remote clients deserialize and execute
- All clients stay in sync

**See also:** [`realtime.md`](./realtime.md)

---

## Next Steps

- Study [`store.md`](./store.md) for working with state
- Study [`realtime.md`](./realtime.md) for synchronization

---

_See also: [`AGENTS.md`](../../AGENTS.md) for project overview_
