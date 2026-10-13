/**
 * Error terkontrol (operational error) yang aman ditampilkan ke client.
 * Lempar error ini dari service/controller, error handler akan
 * mengubahnya menjadi respons JSON yang konsisten.
 */
export class AppError extends Error {
  constructor(message, { status = 500, code = 'INTERNAL_ERROR', details } = {}) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.code = code;
    this.details = details;
  }

  static badRequest(message = 'Permintaan tidak valid', details) {
    return new AppError(message, { status: 400, code: 'BAD_REQUEST', details });
  }

  static validation(details) {
    return new AppError('Validasi gagal', { status: 400, code: 'VALIDATION_ERROR', details });
  }

  static unauthorized(message = 'Tidak terautentikasi') {
    return new AppError(message, { status: 401, code: 'UNAUTHORIZED' });
  }

  static forbidden(message = 'Akses ditolak') {
    return new AppError(message, { status: 403, code: 'FORBIDDEN' });
  }

  static notFound(message = 'Data tidak ditemukan') {
    return new AppError(message, { status: 404, code: 'NOT_FOUND' });
  }
}
