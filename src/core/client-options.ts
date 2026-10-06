import { ConfigurationError } from "./errors.js";
import { buildRetryOptions, type RetryOptions, type ResolvedRetryOptions } from "./retry.js";

/** The signature a replacement `fetch` must have, which is the global `fetch`'s own. */
export type FetchLike = typeof fetch;

/**
 * What the caller configures the engine with: every field optional, and one left out resolved to
 * the default its own block names.
 *
 * @remarks
 * The shell's `ClientOptions` intersects this directly, so a new engine option costs no emitted
 * line. {@link buildCoreClientOptions} fills every field in, and a value the engine cannot honour
 * falls back to its own default rather than being rejected.
 */
export type CoreClientOptions = {
  /**
   * How a request is timed and how a failed one is retried.
   *
   * @remarks
   * Any subset of {@link RetryOptions}. Retries are **on** by default — that type says what is
   * retried, what is not, and which value each field falls back to. Its `timeout` is the budget
   * for one attempt, so it applies whether or not a request is ever re-sent.
   */
  readonly retry?: RetryOptions | undefined;

  /** Replaces the global `fetch`. The one extension point for logging, proxying or mocking. */
  readonly fetch?: FetchLike | undefined;
};

export type ResolvedCoreClientOptions = {
  readonly retry: ResolvedRetryOptions;
  readonly fetch: FetchLike;
};

/**
 * Resolves the engine-wide options once, when the client is built, from what the caller passed.
 *
 * @throws {@link ConfigurationError} when no `fetch` was supplied and the global one is missing,
 * or when reading `retry` throws. No value throws: every bounded field resolves, its own default
 * standing in for a value the engine cannot honour.
 */
export function buildCoreClientOptions(options: CoreClientOptions): ResolvedCoreClientOptions {
  const fetchImpl = options.fetch ?? globalThis.fetch;
  if (typeof fetchImpl !== "function") {
    throw new ConfigurationError("No fetch implementation available; pass ClientOptions.fetch.");
  }
  return {
    retry: buildRetryOptions(options.retry),
    fetch: fetchImpl,
  };
}
