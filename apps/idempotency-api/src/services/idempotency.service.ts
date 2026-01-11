export type IdempotentResult =
    | {
          status: "completed";
          result: unknown;
      }
    | {
          status: "processing";
      };

export interface IdempotencyService {
    execute(
        idempotencyKey: string,
        operation: string,
        payload: unknown
    ): Promise<IdempotentResult>;
}

class InMemoryIdempotencyService implements IdempotencyService {
    async execute(
        _idempotencyKey: string,
        _operation: string,
        _payload: string
    ): Promise<IdempotentResult> {
        // Placeholder implementation.
        // Real idempotency logic
        return {
            status: "completed",
            result: {},
        };
    }
}

export const idempotencyService = new InMemoryIdempotencyService();
