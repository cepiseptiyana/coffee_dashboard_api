import { AppError } from '../utils/app-error.js';

/**
 * Validasi params/query/body dengan skema Zod.
 * Hasil yang sudah tervalidasi tersedia di `req.validated`
 * (req.query bersifat read-only di Express 5).
 *
 * validate({ params: z.object({ id: z.string() }) })
 */
export function validate(schemas) {
  return (req, _res, next) => {
    const validated = {};
    const issues = [];

    for (const location of ['params', 'query', 'body']) {
      const schema = schemas[location];
      if (!schema) continue;

      const result = schema.safeParse(req[location]);
      if (result.success) {
        validated[location] = result.data;
      } else {
        for (const issue of result.error.issues) {
          issues.push({
            location,
            path: issue.path.join('.'),
            message: issue.message,
          });
        }
      }
    }

    if (issues.length > 0) return next(AppError.validation(issues));

    req.validated = validated;
    next();
  };
}
