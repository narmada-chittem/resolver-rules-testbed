/**
 * Builds a greeting message for the given name.
 * @param name - The name of the person to greet.
 * @returns A greeting string addressed to the given name.
 */
export function greet(name: string): string {
  return `Hello, ${name}`;
}

/**
 * Builds a farewell message for the given name.
 * @param name - The name of the person to say goodbye to.
 * @returns A goodbye string addressed to the given name.
 */
export function farewell(name: string): string {
  return `Goodbye, ${name}`;
}
