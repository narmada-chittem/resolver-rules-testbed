/**
 * A single entry in a team contact directory.
 */
export type ContactRecord = {
  /** The contact's full name. */
  fullName: string;
  /** The contact's email address. */
  email: string;
  /** The contact's phone number, if known. */
  phone?: string;
  /** The contact's team name, if known. */
  team?: string;
};

/**
 * @param contact - The contact to resolve a display name for.
 * @returns The trimmed full name, or the email local part (before the first '@') when the full name is empty.
 */
const resolveDisplayName = (contact: ContactRecord): string => {
  const trimmedFullName = contact.fullName.trim();
  if (trimmedFullName.length > 0) {
    return trimmedFullName;
  }
  return contact.email.split('@')[0];
};

/**
 * @param contact - The contact to format.
 * @returns A display line in the form "Name <email>", or "Name <email> - phone" when a phone number is present.
 */
export function formatContactLine(contact: ContactRecord): string {
  const displayName = resolveDisplayName(contact);
  if (contact.phone && contact.phone.trim().length > 0) {
    return `${displayName} <${contact.email}> - ${contact.phone}`;
  }
  return `${displayName} <${contact.email}>`;
}

/**
 * @param contacts - The contacts to format into a directory listing.
 * @returns One formatted line per contact, sorted case-insensitively by display name, without mutating the input array.
 */
export function formatDirectory(contacts: ContactRecord[]): string[] {
  return [...contacts]
    .sort((a, b) =>
      resolveDisplayName(a).toLowerCase().localeCompare(resolveDisplayName(b).toLowerCase())
    )
    .map(formatContactLine);
}
