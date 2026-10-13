import app from './app.js';
import { config } from './config/index.js';
import { logger } from './config/logger.js';

const server = app.listen(config.port, () => {
  logger.info(`coffee-api berjalan di port ${config.port} (${config.env})`);
});

// Graceful shutdown: selesaikan request yang sedang berjalan sebelum berhenti
function shutdown(signal, exitCode = 0) {
  logger.info({ signal }, 'Menutup server...');

  const forceExit = setTimeout(() => {
    logger.error('Shutdown paksa karena melebihi batas waktu');
    process.exit(1);
  }, 10_000);
  forceExit.unref();

  server.close((err) => {
    if (err) {
      logger.error({ err }, 'Gagal menutup server');
      process.exit(1);
    }
    process.exit(exitCode);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  logger.fatal({ err: reason }, 'Unhandled rejection');
  shutdown('unhandledRejection', 1);
});

process.on('uncaughtException', (err) => {
  logger.fatal({ err }, 'Uncaught exception');
  shutdown('uncaughtException', 1);
});
