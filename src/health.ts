/**
 * @returns The service liveness payload — a single `status` field with no
 * additional metadata, indicating the process is up and running.
 */
export function getHealthStatus(): { status: string } {
  return { status: 'ok' };
}
