# Figma Clone

Real-time vector editing web application - simplified Figma clone.

## Quick Start

```bash
# Install dependencies
yarn install

# Start development (watch mode for all packages)
yarn dev

# Build all packages
yarn build
```

## Project Structure

```
figma-clone/
├── apps/
│   ├── web/              # React frontend (Vite + React 18)
│   │   ├── src/
│   │   │   ├── components/  # Canvas, Toolbar, PropertyPanel
│   │   │   ├── store/       # Zustand state management
│   │   │   └── hooks/       # Application hooks
│   │   └── ...
│   └── api/              # NestJS backend (Fastify)
├── packages/
│   └── core/             # Shared @figma-clone/core
│       ├── domain/       # Business logic & types
│       ├── application/  # Use cases
│       └── infrastructure/ # External dependencies (renderers)
└── context/              # Architecture documentation
```

## Tech Stack

**Frontend:**

- React 18 + TypeScript + Vite
- Zustand + Immer - State management
- Tailwind CSS - Styling
- Konva (via abstraction) - Graphics

**Backend:**

- NestJS + Fastify - API server
- Socket.IO - WebSocket for real-time

**Build & Dev:**

- Turbo - Monorepo build
- Yarn Workspaces - Dependency management
- TypeScript - Strict typing

## Development

The project uses Turbo for monorepo management and Yarn workspaces for dependency management.

- `yarn dev` - Start all packages in watch mode
- `yarn build` - Build all packages
- `yarn type-check` - Type check all packages
- `yarn lint` - Lint all packages

## Documentation

See `AGENTS.md` for development guidelines and `context/` for detailed architecture documentation.
