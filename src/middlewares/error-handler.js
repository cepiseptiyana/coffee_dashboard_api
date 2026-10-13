import { config } from '../config/index.js';
import { logger } from '../config/logger.js';
import { AppError } from '../utils/app-error.js';

/**
 * Satu-satunya tempat error diubah menjadi respons.
 * Format: { "error": { "code", "message", "details?", "requestId" } }
 */
export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  let status = 500;
  let code = 'INTERNAL_ERROR';
  let message = 'Terjadi kesalahan pada server';
  let details;

  if (err instanceof AppError) {
    ({ status, code, message, details } = err);
  } else if (err.type === 'entity.parse.failed') {
    status = 400;
    code = 'INVALID_JSON';
    message = 'Format JSON tidak valid';
  } else if (err.type === 'entity.too.large') {
    status = 413;
    code = 'PAYLOAD_TOO_LARGE';
    message = 'Ukuran data terlalu besar';
  }

  const log = req.log ?? logger;
  if (status >= 500) {
    log.error({ err }, 'Unhandled error');
    // Jangan bocorkan detail error internal di production
    if (!config.isProduction && err.message) message = err.message;
  } else {
    log.warn({ code, status }, message);
  }

  res.status(status).json({
    error: { code, message, ...(details ? { details } : {}), requestId: req.id },
  });
}
