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

test('formatDirectory sorts contacts by fullName case-insensitively', () => {
  assert.deepEqual(
    formatDirectory([
      { fullName: 'charlie Brown', email: 'charlie@example.com' },
      { fullName: 'Alice Smith', email: 'alice@example.com', phone: '555-0100' },
      { fullName: 'bob Jones', email: 'bob@example.com' },
    ]),
    [
      'Alice Smith <alice@example.com> - 555-0100',
      'bob Jones <bob@example.com>',
      'charlie Brown <charlie@example.com>',
    ],
  );
});

test('formatDirectory sorts fallback records by the email local part', () => {
  assert.deepEqual(
    formatDirectory([
      { fullName: 'Zed Last', email: 'zed@example.com' },
      { fullName: '', email: 'mike@example.com' },
      { fullName: 'Anna First', email: 'anna@example.com' },
    ]),
    ['Anna First <anna@example.com>', 'mike <mike@example.com>', 'Zed Last <zed@example.com>'],
  );
});

test('formatDirectory returns an empty list for no contacts', () => {
  assert.deepEqual(formatDirectory([]), []);
});

test('formatDirectory does not reorder the input array', () => {
  const contacts = [
    { fullName: 'charlie Brown', email: 'charlie@example.com' },
    { fullName: 'Alice Smith', email: 'alice@example.com' },
  ];
  const original = [...contacts];
  formatDirectory(contacts);
  assert.deepEqual(contacts, original);
});
