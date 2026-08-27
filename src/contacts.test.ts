import test from 'node:test';
import assert from 'node:assert/strict';
import { formatContactLine, formatDirectory } from './contacts';

test('formatContactLine includes the phone when present', () => {
  assert.equal(
    formatContactLine({ fullName: 'Ada Lovelace', email: 'ada@example.com', phone: '555-0100' }),
    'Ada Lovelace <ada@example.com> - 555-0100',
  );
});

test('formatContactLine omits the phone when absent', () => {
  assert.equal(
    formatContactLine({ fullName: 'Grace Hopper', email: 'grace@example.com' }),
    'Grace Hopper <grace@example.com>',
  );
});

test('formatContactLine falls back to the email local-part when fullName is empty', () => {
  assert.equal(
    formatContactLine({ fullName: '   ', email: 'root@example.com' }),
    'root <root@example.com>',
  );
});

test('formatDirectory sorts contacts case-insensitively, including email-fallback records', () => {
  assert.deepEqual(
    formatDirectory([
      { fullName: 'Zoe Vale', email: 'zoe@example.com' },
      { fullName: '', email: 'ada@example.com' },
      { fullName: 'mary shaw', email: 'mary@example.com', phone: '555-0143' },
    ]),
    ['ada <ada@example.com>', 'mary shaw <mary@example.com> - 555-0143', 'Zoe Vale <zoe@example.com>'],
  );
});
