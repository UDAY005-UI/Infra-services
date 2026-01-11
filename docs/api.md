Endpoint
POST /v1/idempotency/execute
Required Headers

Idempotency-Key: string (required)

Request Body
{
"operation": "string",
"payload": "any"
}

Notes:

payload is treated as opaque

The server does not interpret payload content

Response Semantics
Processing

Returned when another execution is already in progress:

{
"status": "processing"
}
Completed

Returned when execution has completed successfully:

{
"status": "completed",
"result": "any"
}
Failed

Returned when execution has completed with an error:

{
"status": "failed",
"error": {
"code": "ERROR_CODE",
"message": "Human readable message"
}
}
Error Responses

Errors are deterministic and structured:

{
"error": {
"code": "ERROR_CODE",
"message": "Human readable message"
}
}

Examples:

IDEMPOTENCY_KEY_MISSING

PAYLOAD_MISMATCH

INTERNAL_ERROR

Replay Semantics

Completed executions return stored results

Failed executions return stored errors

Processing executions never trigger re-execution
