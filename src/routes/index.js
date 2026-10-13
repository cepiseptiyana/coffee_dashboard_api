import { Router } from "express";
import v1Routes from "./v1.js";

const router = Router();

// Versi API di URL: /api/v1/...  (tambah v2.js jika ada breaking change)
router.use("/v1", v1Routes);

export default router;
