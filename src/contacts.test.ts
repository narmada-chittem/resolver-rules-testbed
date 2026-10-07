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

test('formatContactLine falls back to the email local part for an empty fullName', () => {
  assert.equal(
    formatContactLine({ fullName: '', email: 'bob.jones@example.com' }),
    'bob.jones <bob.jones@example.com>',
  );
});

test('formatContactLine falls back to the email local part for a whitespace-only fullName', () => {
  assert.equal(
    formatContactLine({ fullName: '   ', email: 'bob.jones@example.com', phone: '555-0199' }),
    'bob.jones <bob.jones@example.com> - 555-0199',
  );
});

test('formatContactLine trims a padded fullName instead of falling back', () => {
  assert.equal(
    formatContactLine({ fullName: '  Carol King  ', email: 'carol@example.com' }),
    'Carol King <carol@example.com>',
  );
});
