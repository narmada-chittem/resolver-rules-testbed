/**
 * A single entry in a team contact directory.
 *
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

/**
 * @param contact - The contact to derive a display name for.
 * @returns The trimmed fullName, or when that is empty, the part of the email before the '@'.
 */
const displayName = (contact: ContactRecord): string => {
  const trimmedName = contact.fullName.trim();
  return trimmedName.length > 0 ? trimmedName : contact.email.split('@')[0];
};

/**
 * @param contact - The contact to format.
 * @returns "Name <email>" when phone is absent, or "Name <email> - phone" when present.
 */
export function formatContactLine(contact: ContactRecord): string {
  const name = displayName(contact);
  return contact.phone
    ? `${name} <${contact.email}> - ${contact.phone}`
    : `${name} <${contact.email}>`;
}

/**
 * @param contacts - The contacts to format into a directory listing.
 * @returns One formatted line per contact, sorted case-insensitively by display name.
 */
export function formatDirectory(contacts: ContactRecord[]): string[] {
  const sorted = [...contacts].sort((a, b) =>
    displayName(a).toLowerCase().localeCompare(displayName(b).toLowerCase())
  );
  return sorted.map(formatContactLine);
}
