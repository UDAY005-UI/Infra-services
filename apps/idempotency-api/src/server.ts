import { createApp } from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 5500;

function startServer() {
    const app = createApp();

    app.listen(PORT, () => {
        console.log(`[idempotency-api] listening on port ${PORT}`);
    });
}

startServer();
