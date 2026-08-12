import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { greet } from './greeter';

test('greet returns a greeting for a normal name', () => {
  assert.equal(greet('Alice'), 'Hello, Alice');
});

test('greet handles an empty name', () => {
  assert.equal(greet(''), 'Hello, ');
});
