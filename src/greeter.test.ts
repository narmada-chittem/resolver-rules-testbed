import test from 'node:test';
import assert from 'node:assert/strict';
import { capitalize, greet } from './greeter';

test('capitalize uppercases the first letter of a name', () => {
  assert.equal(capitalize('alice'), 'Alice');
});

test('capitalize returns an empty string for empty input', () => {
  assert.equal(capitalize(''), '');
});

test('greet capitalizes the name via the helper', () => {
  assert.equal(greet('alice'), 'Hello, Alice');
});
