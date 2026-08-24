import test from 'node:test';
import assert from 'node:assert/strict';
import { getHealthStatus } from './health';

test('getHealthStatus returns exactly a status field of ok', () => {
  assert.deepEqual(getHealthStatus(), { status: 'ok' });
});
