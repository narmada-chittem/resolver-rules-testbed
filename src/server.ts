import { createServer, IncomingMessage, ServerResponse, Server } from 'node:http';
import { getHealthStatus } from './health';

/**
 * @param req - The incoming HTTP request.
 * @param res - The HTTP response to write to.
 * @returns Nothing; writes a 200 JSON health payload for `GET /health` and a
 * 404 for every other method or path.
 */
export function handleRequest(req: IncomingMessage, res: ServerResponse): void {
  const path = req.url ? req.url.split('?')[0] : '';

  if (req.method === 'GET' && path === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(getHealthStatus()));
    return;
  }

  res.writeHead(404);
  res.end();
}

/**
 * @returns A new `node:http` server that routes requests via `handleRequest`.
 */
export function createHealthServer(): Server {
  return createServer(handleRequest);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  createHealthServer().listen(Number(process.env.PORT) || 3000);
}
