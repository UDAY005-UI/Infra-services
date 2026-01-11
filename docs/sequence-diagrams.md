Happy Path

Client → API: POST execute

API → Service: execute()

Service → Repository: createOrLoad()

Repository → Service: record

Service executes operation

Service → Repository: finalize(record)

Service → API: completed

Retry Path

Client → API: retry

API → Service

Service → Repository: load

Repository returns existing record

Service returns stored state

Concurrency Path

Two clients send same request

Repository enforces atomicity

One proceeds, one observes

Deterministic responses returned

Diagram Integrity Rule

If this diagram ever contradicts:

architecture.md

api.md

failure-scenarios.md

The design must be corrected before code is changed.
