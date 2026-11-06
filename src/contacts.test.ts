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
