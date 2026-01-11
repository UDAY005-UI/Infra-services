# infra-services

Backend-only infrastructure services monorepo.

This repository contains production-oriented backend services that provide **correctness guarantees** to other systems. The first service implemented here is an **Idempotency & Request Deduplication API** designed to guarantee _at-most-once execution_ for critical operations in distributed systems.

---

## Goals

- Provide retry-safe, deterministic execution for non-idempotent operations
- Centralize correctness concerns that are difficult to implement repeatedly in application code
- Enforce clean architectural boundaries and explicit contracts
- Remain backend-only and infrastructure-focused

---

## Non-Goals

- No frontend or UI
- No authentication or OAuth flows
- No business-domain logic (payments, orders, emails, etc.)
- No workflow engines or distributed consensus mechanisms (for now)

---

## Repository Structure

```
infra-services/
│
├── apps/                 # Deployable backend services
│   └── idempotency-api/
│
├── packages/             # Shared tooling and SDKs
│   ├── eslint-config/
│   ├── typescript-config/
│   └── idempotency-client/   (planned)
│
├── docs/                 # Architecture and design documentation
│
├── turbo.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── package.json
```

---

## Architecture Principles

- Contracts before implementation
- Determinism over convenience
- Errors are classified at the source and translated at the boundary
- Services throw errors; middleware translates them
- Shared configs are centralized and extended
- Each service is production-realistic, even when incomplete

---

## Current Status

- Monorepo tooling fully configured (pnpm + Turborepo)
- Shared ESLint and TypeScript configs implemented
- Idempotency API bootstrapped and running
- HTTP contracts, routes, controllers, and service boundaries defined
- Core idempotency logic intentionally **not implemented yet**

The project is currently in the **contract and design-hardening phase**.

---

## Roadmap (High Level)

1. Finalize API and semantic documentation
2. Define idempotency record model
3. Define repository interfaces and guarantees
4. Implement concurrency-safe idempotency logic
5. Build SDK on top of the HTTP API

---

## License

MIT (or as defined later)
