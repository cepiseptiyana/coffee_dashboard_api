import pino from 'pino';
import { config } from './index.js';

export const logger = pino({
  level: config.log.level,
  redact: ['req.headers.authorization', 'req.headers.cookie'],
  ...(config.isDevelopment && {
    transport: {
      target: 'pino-pretty',
      options: { colorize: true, translateTime: 'SYS:HH:MM:ss' },
    },
  }),
});
