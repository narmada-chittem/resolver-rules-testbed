import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createHealthServer } from './server';

test('GET /health returns 200 with the JSON liveness payload', async () => {
  const server = createHealthServer();

  try {
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const { port } = server.address() as { port: number };

    const { statusCode, contentType, body } = await new Promise<{
      statusCode: number | undefined;
      contentType: string | undefined;
      body: string;
    }>((resolve, reject) => {
      http.get(`http://127.0.0.1:${port}/health`, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            contentType: res.headers['content-type'],
            body: data,
          });
        });
      }).on('error', reject);
    });

    assert.equal(statusCode, 200);
    assert.ok(contentType?.includes('application/json'));
    assert.equal(body, '{"status":"ok"}');
  } finally {
    server.close();
  }
});

test('GET /unknown returns 404', async () => {
  const server = createHealthServer();

  try {
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const { port } = server.address() as { port: number };

    const statusCode = await new Promise<number | undefined>((resolve, reject) => {
      http.get(`http://127.0.0.1:${port}/unknown`, (res) => {
        res.resume();
        res.on('end', () => resolve(res.statusCode));
      }).on('error', reject);
    });

    assert.equal(statusCode, 404);
  } finally {
    server.close();
  }
});

test('POST /health returns 404', async () => {
  const server = createHealthServer();

  try {
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const { port } = server.address() as { port: number };

    const statusCode = await new Promise<number | undefined>((resolve, reject) => {
      const req = http.request(
        `http://127.0.0.1:${port}/health`,
        { method: 'POST' },
        (res) => {
          res.resume();
          res.on('end', () => resolve(res.statusCode));
        },
      );
      req.on('error', reject);
      req.end();
    });

    assert.equal(statusCode, 404);
  } finally {
    server.close();
  }
});
