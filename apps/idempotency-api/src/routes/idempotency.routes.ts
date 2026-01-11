import { Router } from "express";
import { executeIdempotent } from "../controllers/idempotency.controller";

const router: Router = Router();

router.post("/execute", executeIdempotent);

export default router;
