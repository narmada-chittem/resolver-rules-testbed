import test from 'node:test';
import assert from 'node:assert/strict';
import { formatContactLine, formatDirectory } from './contacts';

test('formatContactLine includes the phone number when present', () => {
  assert.equal(
    formatContactLine({ fullName: 'Jane Doe', email: 'jane.doe@example.com', phone: '555-0100' }),
    'Jane Doe <jane.doe@example.com> - 555-0100'
  );
});

test('formatContactLine omits the phone number when absent', () => {
  assert.equal(
    formatContactLine({ fullName: 'Jane Doe', email: 'jane.doe@example.com' }),
    'Jane Doe <jane.doe@example.com>'
  );
});

test('formatContactLine falls back to the email prefix when fullName is empty', () => {
  assert.equal(
    formatContactLine({ fullName: '  ', email: 'jane.doe@example.com' }),
    'jane.doe <jane.doe@example.com>'
  );
});

test('formatDirectory sorts contacts case-insensitively, using the email fallback for empty names', () => {
  assert.deepEqual(
    formatDirectory([
      { fullName: 'Charlie Brown', email: 'charlie.brown@example.com', phone: '555-0102' },
      { fullName: 'alice adams', email: 'alice.adams@example.com', phone: '555-0101' },
      { fullName: '  ', email: 'bob@example.com' },
    ]),
    [
      'alice adams <alice.adams@example.com> - 555-0101',
      'bob <bob@example.com>',
      'Charlie Brown <charlie.brown@example.com> - 555-0102',
    ]
  );
});
