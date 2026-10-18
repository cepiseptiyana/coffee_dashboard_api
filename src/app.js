import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config/index.js";

import { errorHandler } from "./middlewares/error-handler.js";
import { httpLogger } from "./middlewares/http-logger.js";
import { notFound } from "./middlewares/not-found.js";
import { apiRateLimiter } from "./middlewares/rate-limit.js";
import { requestId } from "./middlewares/request-id.js";

import healthRoutes from "./modules/health/health.routes.js";
import apiRoutes from "./routes/index.js";

const app = express();

app.disable("x-powered-by");
if (config.trustProxy > 0) app.set("trust proxy", config.trustProxy);

app.use(requestId);
app.use(httpLogger);
app.use(helmet());
app.use(cors({ origin: config.cors.origins, maxAge: 600 }));
app.use(express.json({ limit: "1mb" }));

app.use("/health", healthRoutes);
app.use("/api", apiRateLimiter, apiRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
