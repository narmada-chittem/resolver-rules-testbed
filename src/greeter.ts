export function greet(name: string): string {
  return `Hello, ${name}`;
}

/**
 * @param name - The name of the person to say goodbye to.
 * @returns A goodbye string addressed to the given name.
 */
export function farewell(name: string): string {
  return `Goodbye, ${name}`;
}

/**
 * @param msg - The message to shout.
 * @returns The message converted to uppercase.
 */
export function shout(msg: string): string {
  return msg.toUpperCase();
}
