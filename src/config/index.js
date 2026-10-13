import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  CORS_ORIGINS: z.string().default('http://localhost:3000'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
  TRUST_PROXY: z.coerce.number().int().min(0).default(0),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Konfigurasi environment tidak valid:');
  for (const issue of parsed.error.issues) {
    console.error(`- ${issue.path.join('.')}: ${issue.message}`);
  }
  process.exit(1);
}

const env = parsed.data;

export const config = Object.freeze({
  env: env.NODE_ENV,
  isDevelopment: env.NODE_ENV === 'development',
  isProduction: env.NODE_ENV === 'production',
  isTest: env.NODE_ENV === 'test',
  port: env.PORT,
  trustProxy: env.TRUST_PROXY,
  cors: {
    origins: env.CORS_ORIGINS.split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  },
  log: {
    level: env.NODE_ENV === 'test' ? 'silent' : env.LOG_LEVEL,
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: env.RATE_LIMIT_MAX,
  },
});
