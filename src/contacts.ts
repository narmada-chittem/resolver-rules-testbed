/**
 * A single entry in the team contact directory.
 *
 * @property fullName - The contact's full name; may be blank, in which case the email local part is shown.
 * @property email - The contact's email address.
 * @property phone - The contact's phone number, if known.
 * @property team - The contact's team, if known; it does not affect formatting.
 */
export type ContactRecord = { fullName: string; email: string; phone?: string; team?: string };

/**
 * @param contact - The contact record whose display name to resolve.
 * @returns The trimmed full name, or the email local part when the full name is missing or blank.
 */
function resolveDisplayName(contact: ContactRecord): string {
  const trimmed = (contact.fullName ?? '').trim();
  return trimmed.length > 0 ? trimmed : contact.email.split('@')[0];
}

/**
 * @param contact - The contact record to format.
 * @returns A line shaped "Full Name <email>", or "Full Name <email> - phone" when a phone is present.
 */
export function formatContactLine(contact: ContactRecord): string {
  const base = `${resolveDisplayName(contact)} <${contact.email}>`;
  return contact.phone ? `${base} - ${contact.phone}` : base;
}
