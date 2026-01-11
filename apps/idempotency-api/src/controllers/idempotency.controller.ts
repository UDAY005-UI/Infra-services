import { Request, Response } from "express";
import { AppError } from "../errors/app-error";
import { idempotencyService } from "../services/idempotency.service";

export const executeIdempotent = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const idempotencyKey = req.header("idempotency-key");

    if (!idempotencyKey) {
        throw new AppError(
            "Idempotency key is required",
            "IDEMPOTENCY_KEY_REQUIRED",
            400
        );
    }

    if (!req.body || typeof req.body !== "object") {
        throw new AppError(
            "Request body is required",
            "REQUEST_BODY_REQUIRED",
            400
        );
    }

    const { operation, payload } = req.body;

    if (!operation || typeof operation !== "string") {
        throw new AppError("Operation is required", "OPERATION_REQUIRED", 400);
    }

    const result = idempotencyService.execute(
        idempotencyKey,
        operation,
        payload
    );

    return res.status(200).json(result);
};
