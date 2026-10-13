/**
 * Format respons sukses yang konsisten:
 * { "data": ..., "meta": { ... } }
 */
export function sendSuccess(res, data, { status = 200, meta } = {}) {
  return res.status(status).json({ data, ...(meta ? { meta } : {}) });
}
