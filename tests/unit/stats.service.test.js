import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import * as statsService from '../../src/modules/stats/stats.service.js';
import { AppError } from '../../src/utils/app-error.js';

describe('stats.service', () => {
  it('getSummaries mengembalikan 4 statistik', async () => {
    const result = await statsService.getSummaries();
    assert.equal(result.length, 4);
  });

  it('getSummaryById mengembalikan statistik yang sesuai', async () => {
    const result = await statsService.getSummaryById('orders');
    assert.equal(result.title, 'Total Pesanan');
  });

  it('getSummaryById melempar AppError 404 jika tidak ditemukan', async () => {
    await assert.rejects(
      () => statsService.getSummaryById('xyz'),
      (err) => err instanceof AppError && err.status === 404 && err.code === 'NOT_FOUND',
    );
  });
});
