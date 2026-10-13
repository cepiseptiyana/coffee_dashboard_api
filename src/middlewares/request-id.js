import { randomUUID } from 'node:crypto';

// Setiap request mendapat ID unik untuk menelusuri log (dikirim balik di header).
export function requestId(req, res, next) {
  const incoming = req.get('x-request-id');
  req.id = incoming && incoming.length <= 100 ? incoming : randomUUID();
  res.setHeader('x-request-id', req.id);
  next();
}
