/**
 * A single entry in the team contact directory.
 *
 * @property fullName - The contact's full name; may be blank, in which case the email local part is shown.
 * @property email - The contact's email address.
 * @property phone - The contact's phone number, if known.
 * @property team - The contact's team, if known; it does not affect formatting.
 */
export type ContactRecord = { fullName: string; email: string; phone?: string; team?: string };
