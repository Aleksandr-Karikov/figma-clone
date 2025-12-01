# TypeScript Guidelines

TypeScript standards for the project.

---

## Overview

**TypeScript Settings:**

- Strict mode enabled
- All types from `packages/core`
- No `any` types (except extreme cases)

---

## Type Imports

**✅ Correct:**

- Import types from `@figma-clone/core/domain/...`

**❌ Incorrect:**

- Redefining types
- Using `any` without comment

---

## Type Guards

**Pattern:**

- Create type guard functions
- Use for discriminated unions
- TypeScript narrows types automatically

---

## Discriminated Unions

**Pattern:**

- Use `type` property for discrimination
- Switch on type property
- TypeScript ensures all cases handled

---

## Generic Types

**Pattern:**

- Use generics for reusable types
- Generic operations
- Generic utilities

---

## Utility Types

**Pattern:**

- `Partial` for updates
- `Pick` for selecting fields
- `Omit` for excluding fields

---

## Branded Types

**Pattern:**

- Use branded types for IDs
- Prevent mixing different ID types
- Type safety at compile time

---

## Strict Null Checks

**Pattern:**

- Always check for null/undefined
- Use optional chaining
- Use nullish coalescing

---

## Type Assertions

**Pattern:**

- Use with type guards
- Avoid unsafe assertions
- Prefer type narrowing

---

## Function Types

**Pattern:**

- Explicit function types
- Type aliases for complex signatures
- Clear parameter and return types

---

## Interface vs Type

**Pattern:**

- Use `interface` for objects
- Use `type` for unions, intersections

---

## Common Patterns

### Optional Chaining

**Pattern:**

- Use `?.` for safe property access
- Use `??` for default values

---

## What to Avoid

### ❌ any

**Pattern:**

- Use `unknown` instead
- Type guard before use

### ❌ @ts-ignore

**Pattern:**

- Fix TypeScript errors
- Don't ignore errors

---

## Next Steps

- Study [`models.md`](../concepts/models.md) for data models
- Study [`code-review.md`](./code-review.md) for code review

---

_See also: [`AGENTS.md`](../../AGENTS.md) for project overview_
