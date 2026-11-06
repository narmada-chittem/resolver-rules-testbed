/**
 * A single entry in the team contact directory.
 */
export type ContactRecord = {
  fullName: string;
  email: string;
  phone?: string;
  team?: string;
};

/**
 * @param contact - The contact whose display name is needed.
 * @returns The trimmed full name, or the email text before '@' when the name is blank.
 */
function resolveDisplayName(contact: ContactRecord): string {
  const name = (contact.fullName ?? '').trim();
  return name !== '' ? name : contact.email.split('@')[0];
}

/**
 * @param contact - The contact to format.
 * @returns `Name <email>`, or `Name <email> - phone` when a non-empty phone is present.
 */
export function formatContactLine(contact: ContactRecord): string {
  const base = `${resolveDisplayName(contact)} <${contact.email}>`;
  return contact.phone ? `${base} - ${contact.phone}` : base;
}

/**
 * @param contacts - The contacts to list; the array is not mutated.
 * @returns One formatted line per contact, sorted case-insensitively by display name.
 */
export function formatDirectory(contacts: ContactRecord[]): string[] {
  const entries = contacts.map((contact) => ({
    key: resolveDisplayName(contact).toLowerCase(),
    line: formatContactLine(contact),
  }));
  entries.sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
  return entries.map((entry) => entry.line);
}
