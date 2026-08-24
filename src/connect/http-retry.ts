const MAX_ATTEMPTS = 3;
const BASE_DELAY_MS = 100;

/** A response shape minimally sufficient to decide whether to retry. */
export interface RetryableResponse {
  status: number;
}

export type RequestFn<T extends RetryableResponse> = () => Promise<T>;
export type DelayFn = (ms: number) => Promise<void>;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function isTransientStatus(status: number): boolean {
  return status >= 500 && status < 600;
}

function computeBackoffMs(attempt: number): number {
  return BASE_DELAY_MS * 2 ** (attempt - 1);
}

/**
 * Retries an HTTP request that fails transiently — a thrown network/connection
 * error or a 5xx response — for a fixed number of attempts with exponential
 * backoff between retries. Successful and non-transient (e.g. 4xx) responses
 * are returned immediately without retrying.
 *
 * @param requestFn - Performs a single request attempt and resolves with its response.
 * @param delayFn - Seam for waiting between retries; defaults to a real timer-based sleep and can be replaced (e.g. in tests) to observe or skip delays.
 * @returns The first successful/non-transient response, or the final response/error once attempts are exhausted.
 */
export async function retryRequest<T extends RetryableResponse>(
  requestFn: RequestFn<T>,
  delayFn: DelayFn = sleep,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await requestFn();
      if (!isTransientStatus(response.status) || attempt === MAX_ATTEMPTS) {
        return response;
      }
      await delayFn(computeBackoffMs(attempt));
    } catch (error) {
      lastError = error;
      if (attempt === MAX_ATTEMPTS) {
        throw error;
      }
      await delayFn(computeBackoffMs(attempt));
    }
  }

  throw lastError;
}
