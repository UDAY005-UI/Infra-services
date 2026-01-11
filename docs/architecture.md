Purpose

This document defines the core correctness model of the Idempotency & Request Deduplication Service. It specifies domain concepts, invariants, execution states, and ownership boundaries. This document is authoritative and must be treated as immutable once implementation begins.

Service Responsibility

The service guarantees at-most-once execution for a given logical attempt.

It owns:

Execution coordination

Deduplication

Retry safety

Deterministic result replay

It does not own:

Business correctness

Authorization

Domain validation

Workflow semantics

Core Domain Entity: Idempotency Record

An Idempotency Record represents exactly one logical execution attempt.

Identity

An Idempotency Record is uniquely identified by the tuple:

(idempotencyKey, operation)

The payload is not part of identity, but is used for safety validation.

Conceptual Fields (Design-Level)

idempotencyKey (immutable)

operation (immutable)

payloadHash (immutable)

status (mutable)

result (immutable once set)

error (immutable once set)

createdAt (immutable)

updatedAt (mutable)

Execution States

The system recognizes exactly three states:

processing

completed

failed

No other states are permitted.

State Transition Rules

Allowed transitions:

processing → completed

processing → failed

Disallowed transitions:

completed → processing

failed → processing

completed → failed

failed → completed

Once a record exits processing, it is terminal.

Invariants

These conditions must always hold:

A given (idempotencyKey, operation) maps to at most one record

Payload hash must match across retries

Only one execution may be in processing at any time

Completed or failed records are replay-only

Results and errors are immutable once written

Concurrency Model

Record creation is atomic

Transition out of processing is atomic

Concurrent requests must converge on a single record

The service assumes repository-level atomic guarantees, but does not assume distributed consensus.

Ownership Boundaries

Controllers: HTTP contract enforcement only

Services: state transitions and correctness

Repositories: atomic persistence guarantees

Middleware: error translation only
