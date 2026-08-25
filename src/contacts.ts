/**
 * A single entry in the contact directory.
 *
 * @property fullName - The contact's full name.
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

const displayName = (contact: ContactRecord): string => {
  const trimmedName = contact.fullName.trim();
  return trimmedName.length > 0 ? trimmedName : contact.email.split('@')[0];
};

/**
 * @param contact - The contact to format.
 * @returns A single display line for the contact, including its phone number when present.
 */
export function formatContactLine(contact: ContactRecord): string {
  const name = displayName(contact);
  return contact.phone
    ? `${name} <${contact.email}> - ${contact.phone}`
    : `${name} <${contact.email}>`;
}

/**
 * @param contacts - The contacts to format into a directory listing.
 * @returns One formatted line per contact, sorted by display name case-insensitively.
 */
export function formatDirectory(contacts: ContactRecord[]): string[] {
  const sorted = [...contacts];
  sorted.sort((a, b) => displayName(a).toLowerCase().localeCompare(displayName(b).toLowerCase()));
  return sorted.map(formatContactLine);
}
