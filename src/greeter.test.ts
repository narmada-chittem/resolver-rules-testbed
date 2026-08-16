import test from 'node:test';
import assert from 'node:assert/strict';
import { capitalizeName, greet } from './greeter';

test('capitalizeName uppercases the first letter of a name', () => {
  assert.equal(capitalizeName('alice'), 'Alice');
});

test('capitalizeName returns an empty string for empty input', () => {
  assert.equal(capitalizeName(''), '');
});

test('greet capitalizes the name via the helper', () => {
  assert.equal(greet('alice'), 'Hello, Alice');
});
