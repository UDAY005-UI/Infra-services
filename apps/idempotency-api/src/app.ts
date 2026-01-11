import express, { Application, Request, Response } from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import idempotencyRoutes from "./routes/idempotency.routes";

export function createApp(): Application {
    const app = express();

    app.use(express.json());
    app.use(errorMiddleware);

    app.get("/health", (_req: Request, res: Response) => {
        res.status(200).json({ status: "ok" });
    });

    app.use("v1/idempotency", idempotencyRoutes);

    return app;
}
