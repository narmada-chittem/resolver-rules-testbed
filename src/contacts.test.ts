import test from 'node:test';
import assert from 'node:assert/strict';
import { formatContactLine, formatDirectory } from './contacts';

test('formatContactLine includes the phone number when present', () => {
  assert.equal(
    formatContactLine({ fullName: 'Ada Lovelace', email: 'ada@example.com', phone: '555-0101' }),
    'Ada Lovelace <ada@example.com> - 555-0101'
  );
});

test('formatContactLine omits the phone number when absent', () => {
  assert.equal(
    formatContactLine({ fullName: 'Ada Lovelace', email: 'ada@example.com' }),
    'Ada Lovelace <ada@example.com>'
  );
});

test('formatContactLine falls back to the email name when fullName is empty', () => {
  assert.equal(
    formatContactLine({ fullName: '   ', email: 'grace@example.com' }),
    'grace <grace@example.com>'
  );
});

test('formatDirectory sorts contacts by display name case-insensitively', () => {
  assert.deepEqual(
    formatDirectory([
      { fullName: 'Zoe Zephyr', email: 'zoe@example.com' },
      { fullName: 'ada Lovelace', email: 'ada@example.com' },
      { fullName: '', email: 'bob@example.com' },
    ]),
    [
      'ada Lovelace <ada@example.com>',
      'bob <bob@example.com>',
      'Zoe Zephyr <zoe@example.com>',
    ]
  );
});
