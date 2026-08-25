import test from 'node:test';
import assert from 'node:assert/strict';
import { formatContactLine } from './contacts';

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
