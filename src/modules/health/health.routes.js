import { Router } from 'express';

const router = Router();

// Dipakai load balancer / Docker healthcheck
router.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

export default router;
