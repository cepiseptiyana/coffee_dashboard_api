// NODE_ENV harus diset sebelum config dimuat, jadi app di-import secara dinamis.
process.env.NODE_ENV = 'test';

const { default: app } = await import('../../src/app.js');

export function startTestServer() {
  return new Promise((resolve) => {
    const server = app.listen(0, '127.0.0.1', () => {
      resolve({
        baseUrl: `http://127.0.0.1:${server.address().port}`,
        close: () => new Promise((done) => server.close(done)),
      });
    });
  });
}
