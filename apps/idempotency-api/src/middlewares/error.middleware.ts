import { AppError } from "../errors/app-error";
import { Request, Response, NextFunction } from "express";

export function errorMiddleware(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: {
                code: err.code,
                message: err.message,
            },
        });
    }

    console.error(err);

    return res.status(500).json({
        error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "something went wrong",
        },
    });
}
