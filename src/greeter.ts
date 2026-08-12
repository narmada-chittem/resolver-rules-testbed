/**
 * @param name - The name of the person to greet.
 * @returns A greeting string addressed to the given name.
 * @example greet('Alice') // => 'Hello, Alice'
 */
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
