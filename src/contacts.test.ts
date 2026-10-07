import test from 'node:test';
import assert from 'node:assert/strict';
import { formatContactLine, formatDirectory } from './contacts';

test('formatContactLine includes the phone when present', () => {
  assert.equal(
    formatContactLine({ fullName: 'Alice Smith', email: 'alice@example.com', phone: '555-0100' }),
    'Alice Smith <alice@example.com> - 555-0100',
  );
});

test('formatContactLine omits the phone when absent', () => {
  assert.equal(
    formatContactLine({ fullName: 'Alice Smith', email: 'alice@example.com' }),
    'Alice Smith <alice@example.com>',
  );
});

test('formatContactLine treats an empty phone as absent', () => {
  assert.equal(
    formatContactLine({ fullName: 'Alice Smith', email: 'alice@example.com', phone: '' }),
    'Alice Smith <alice@example.com>',
  );
});
