import rateLimit from 'express-rate-limit';
import { config } from '../config/index.js';
import { AppError } from '../utils/app-error.js';

export const apiRateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  limit: config.rateLimit.max,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: (_req, _res, next) =>
    next(
      new AppError('Terlalu banyak permintaan, coba lagi nanti', {
        status: 429,
        code: 'TOO_MANY_REQUESTS',
      }),
    ),
});
