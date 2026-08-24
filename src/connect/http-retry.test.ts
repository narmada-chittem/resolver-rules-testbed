import test from 'node:test';
import assert from 'node:assert/strict';
import { retryRequest } from './http-retry';

test('retryRequest returns the response once a transient 503 eventually succeeds', async () => {
  const responses = [{ status: 503 }, { status: 503 }, { status: 200 }];
  let callCount = 0;
  const requestFn = async () => responses[callCount++];
  const delayFn = async () => {};

  const result = await retryRequest(requestFn, delayFn);

  assert.equal(result.status, 200);
  assert.equal(callCount, 3);
});

test('retryRequest returns the response once a thrown network error eventually succeeds', async () => {
  let callCount = 0;
  const requestFn = async () => {
    callCount++;
    if (callCount <= 2) {
      throw new Error('ECONNRESET');
    }
    return { status: 200 };
  };
  const delayFn = async () => {};

  const result = await retryRequest(requestFn, delayFn);

  assert.equal(result.status, 200);
  assert.equal(callCount, 3);
});

test('retryRequest surfaces the final response once retries are exhausted for persistent 5xx failures', async () => {
  let callCount = 0;
  const requestFn = async () => {
    callCount++;
    return { status: 500 };
  };
  const delayFn = async () => {};

  const result = await retryRequest(requestFn, delayFn);

  assert.equal(result.status, 500);
  assert.equal(callCount, 3);
});

test('retryRequest rethrows the last error once retries are exhausted for persistent network failures', async () => {
  let callCount = 0;
  const requestFn = async () => {
    callCount++;
    throw new Error(`connection failed (attempt ${callCount})`);
  };
  const delayFn = async () => {};

  await assert.rejects(
    () => retryRequest(requestFn, delayFn),
    (error: Error) => {
      assert.equal(error.message, 'connection failed (attempt 3)');
      return true;
    },
  );
  assert.equal(callCount, 3);
});

test('retryRequest does not retry a non-transient 4xx response', async () => {
  let callCount = 0;
  const requestFn = async () => {
    callCount++;
    return { status: 400 };
  };
  const delayFn = async () => {};

  const result = await retryRequest(requestFn, delayFn);

  assert.equal(result.status, 400);
  assert.equal(callCount, 1);
});

test('retryRequest waits with increasing exponential delays between attempts', async () => {
  const requestFn = async () => ({ status: 503 });
  const delays: number[] = [];
  const delayFn = async (ms: number) => {
    delays.push(ms);
  };

  await retryRequest(requestFn, delayFn);

  assert.deepEqual(delays, [100, 200]);
});
