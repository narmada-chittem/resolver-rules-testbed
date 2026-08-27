/**
 * A single entry in the team contact directory.
 * @property fullName - The contact's full display name.
 * @property email - The contact's email address.
 * @property phone - The contact's phone number, if known.
 * @property team - The team the contact belongs to, if known.
 */
export type ContactRecord = {
  fullName: string;
  email: string;
  phone?: string;
  team?: string;
};

function resolveDisplayName(contact: ContactRecord): string {
  const trimmedName = contact.fullName.trim();
  if (trimmedName.length > 0) {
    return trimmedName;
  }
  return contact.email.split('@')[0];
}

/**
 * @param contact - The contact record to format.
 * @returns A single display line for the contact, including phone when present.
 */
export function formatContactLine(contact: ContactRecord): string {
  const name = resolveDisplayName(contact);
  const trimmedPhone = contact.phone?.trim();
  const hasPhone = trimmedPhone !== undefined && trimmedPhone.length > 0;
  if (hasPhone) {
    return `${name} <${contact.email}> - ${trimmedPhone}`;
  }
  return `${name} <${contact.email}>`;
}

/**
 * @param contacts - The contact records to format into a directory listing.
 * @returns The formatted contact lines, sorted case-insensitively by display name.
 */
export function formatDirectory(contacts: ContactRecord[]): string[] {
  const sortedContacts = [...contacts].sort((a, b) =>
    resolveDisplayName(a).toLowerCase().localeCompare(resolveDisplayName(b).toLowerCase()),
  );
  return sortedContacts.map(formatContactLine);
}
