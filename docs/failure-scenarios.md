Scenario 1: Retry After Timeout

Client sends request A

Server creates record → processing

Client times out

Client retries with same key

Server finds record in processing

Server returns processing

No duplicate execution occurs.

Scenario 2: Concurrent Duplicate Requests

Two requests arrive simultaneously

Atomic create ensures one record

One request executes

Other observes processing

Second request returns processing

Scenario 3: Same Key, Different Payload

Request A creates record with payload hash X

Request B arrives with same key, different payload hash Y

Server detects mismatch

Server rejects request with PAYLOAD_MISMATCH

Scenario 4: Crash Mid-Execution

Record is created → processing

Service crashes before completion

Subsequent retries observe processing

External recovery or TTL policy required

No duplicate execution occurs.

Scenario 5: Replay After Completion

Execution completes → completed

Result is stored

Retry arrives

Stored result is returned

Execution is not re-run.
