import test from 'node:test';
import assert from 'node:assert/strict';
import { formatContactLine } from './contacts';

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
