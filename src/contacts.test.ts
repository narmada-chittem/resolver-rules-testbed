import test from 'node:test';
import assert from 'node:assert/strict';
import { formatContactLine, formatDirectory } from './contacts';

test('formatContactLine includes the phone number when present', () => {
  assert.equal(
    formatContactLine({ fullName: 'Alice Smith', email: 'alice@example.com', phone: '555-0100' }),
    'Alice Smith <alice@example.com> - 555-0100'
  );
});

test('formatContactLine omits the phone segment when absent', () => {
  assert.equal(
    formatContactLine({ fullName: 'Bob Jones', email: 'bjones@example.com' }),
    'Bob Jones <bjones@example.com>'
  );
});

test('formatContactLine falls back to the email local part when fullName is blank', () => {
  assert.equal(
    formatContactLine({ fullName: '  ', email: 'bjones@example.com' }),
    'bjones <bjones@example.com>'
  );
});

test('formatDirectory sorts contacts case-insensitively by display name', () => {
  assert.deepEqual(
    formatDirectory([
      { fullName: 'bob jones', email: 'bob@example.com' },
      { fullName: '  ', email: 'aaron@example.com' },
      { fullName: 'Carol Diaz', email: 'carol@example.com', phone: '555-0101' },
    ]),
    [
      'aaron <aaron@example.com>',
      'bob jones <bob@example.com>',
      'Carol Diaz <carol@example.com> - 555-0101',
    ]
  );
});
