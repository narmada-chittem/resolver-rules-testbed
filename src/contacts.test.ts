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
