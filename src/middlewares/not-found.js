import { AppError } from '../utils/app-error.js';

export function notFound(req, _res, next) {
  next(
    new AppError(`Endpoint ${req.method} ${req.originalUrl} tidak ditemukan`, {
      status: 404,
      code: 'ROUTE_NOT_FOUND',
    }),
  );
}
