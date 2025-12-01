# Backend Guidelines

NestJS patterns, API design, and best practices.

---

## Overview

**Backend Stack:**
- NestJS + Fastify
- PostgreSQL for data
- Redis for caching and pub/sub
- Socket.IO for WebSocket

---

## Project Structure

**Pattern:**
- Modules for features
- Controllers for routes
- Services for business logic
- DTOs for data transfer

---

## Controllers

**Pattern:**
- Handle HTTP requests
- Validate input with DTOs
- Call services
- Return responses

---

## Services

**Pattern:**
- Business logic
- Database operations
- Error handling
- Return domain models

---

## DTOs

**Pattern:**
- Data transfer objects
- Validation decorators
- Type safety
- Clear API contracts

---

## WebSocket Gateway

**Pattern:**
- Handle WebSocket connections
- Room management
- Broadcast operations
- Handle real-time events

---

## Error Handling

**Pattern:**
- Global exception filter
- User-friendly error messages
- Proper HTTP status codes
- Log errors on server

---

## Validation

**Pattern:**
- Use ValidationPipe
- DTO validation
- Type safety
- Clear error messages

---

## Database

**Pattern:**
- TypeORM entities
- Repository pattern
- Migrations
- Transactions when needed

---

## Next Steps

- Study NestJS documentation
- Study [`realtime.md`](../concepts/realtime.md) for WebSocket

---

_See also: [`AGENTS.md`](../../AGENTS.md) for project overview_
