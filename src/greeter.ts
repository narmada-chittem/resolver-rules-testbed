/**
 * @param name - The name to capitalize.
 * @returns The name with its first character uppercased.
 */
export function capitalize(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * @param name - The name of the person to greet.
 * @returns A greeting string addressed to the given name.
 */
export function greet(name: string): string {
  return `Hello, ${capitalize(name)}`;
}

/**
 * @param name - The name of the person to say goodbye to.
 * @returns A goodbye string addressed to the given name.
 */
export function farewell(name: string): string {
  return `Goodbye, ${name}`;
}
