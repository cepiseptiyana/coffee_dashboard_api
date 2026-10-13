import { after, before, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { startTestServer } from '../helpers/test-server.js';

describe('API integration', () => {
  let server;

  before(async () => {
    server = await startTestServer();
  });

  after(async () => {
    await server.close();
  });

  it('GET /health mengembalikan status ok', async () => {
    const res = await fetch(`${server.baseUrl}/health`);
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.equal(body.status, 'ok');
  });

  it('GET /api/v1/stats/summaries mengembalikan daftar statistik', async () => {
    const res = await fetch(`${server.baseUrl}/api/v1/stats/summaries`);
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.ok(Array.isArray(body.data));
    assert.equal(body.meta.total, body.data.length);
    assert.equal(body.data[0].id, 'revenue');
  });

  it('GET /api/v1/stats/summaries/:id mengembalikan satu statistik', async () => {
    const res = await fetch(`${server.baseUrl}/api/v1/stats/summaries/cups`);
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.equal(body.data.id, 'cups');
  });

  it('mengembalikan 404 NOT_FOUND jika id tidak ada', async () => {
    const res = await fetch(`${server.baseUrl}/api/v1/stats/summaries/tidak-ada`);
    const body = await res.json();

    assert.equal(res.status, 404);
    assert.equal(body.error.code, 'NOT_FOUND');
  });

  it('mengembalikan 400 VALIDATION_ERROR jika format id salah', async () => {
    const res = await fetch(`${server.baseUrl}/api/v1/stats/summaries/ID_SALAH!`);
    const body = await res.json();

    assert.equal(res.status, 400);
    assert.equal(body.error.code, 'VALIDATION_ERROR');
    assert.equal(body.error.details[0].location, 'params');
  });

  it('mengembalikan 404 ROUTE_NOT_FOUND untuk route yang tidak ada', async () => {
    const res = await fetch(`${server.baseUrl}/api/v1/tidak-ada`);
    const body = await res.json();

    assert.equal(res.status, 404);
    assert.equal(body.error.code, 'ROUTE_NOT_FOUND');
  });

  it('menyertakan x-request-id di header dan body error', async () => {
    const res = await fetch(`${server.baseUrl}/api/v1/tidak-ada`, {
      headers: { 'x-request-id': 'test-123' },
    });
    const body = await res.json();

    assert.equal(res.headers.get('x-request-id'), 'test-123');
    assert.equal(body.error.requestId, 'test-123');
  });
});
