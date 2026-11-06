import test from 'node:test';
import assert from 'node:assert/strict';
import { formatContactLine, formatDirectory } from './contacts';

test('formatContactLine appends the phone when present', () => {
  assert.equal(
    formatContactLine({ fullName: 'Ada Lovelace', email: 'ada@example.com', phone: '555-0100' }),
    'Ada Lovelace <ada@example.com> - 555-0100',
  );
});

test('formatContactLine omits the phone when the property is absent', () => {
  assert.equal(
    formatContactLine({ fullName: 'Ada Lovelace', email: 'ada@example.com' }),
    'Ada Lovelace <ada@example.com>',
  );
});

test('formatContactLine treats an empty phone as no phone', () => {
  assert.equal(
    formatContactLine({ fullName: 'Ada Lovelace', email: 'ada@example.com', phone: '' }),
    'Ada Lovelace <ada@example.com>',
  );
});

test('formatContactLine falls back to the email local part for an empty fullName', () => {
  assert.equal(
    formatContactLine({ fullName: '', email: 'grace@example.com' }),
    'grace <grace@example.com>',
  );
});

test('formatContactLine falls back to the email local part for a whitespace-only fullName', () => {
  assert.equal(
    formatContactLine({ fullName: '   ', email: 'grace@example.com' }),
    'grace <grace@example.com>',
  );
});

test('formatContactLine trims a valid fullName', () => {
  assert.equal(
    formatContactLine({ fullName: '  Grace Hopper  ', email: 'grace@example.com' }),
    'Grace Hopper <grace@example.com>',
  );
});
