import type { AnyResponseError, PayloadOf } from "./response-error.js";

export type RequestOutcome<T, E extends AnyResponseError> =
  | { ok: true; status: number; headers: Headers; data: T }
  | { ok: false; status: number; headers: Headers; error: E };

export type ApiResult<T, E extends AnyResponseError> =
  | { ok: true; status: number; headers: Headers; value: T }
  | { ok: false; status: number; headers: Headers; errorMessage: string; error: PayloadOf<E> };

export class ApiPromise<T, E extends AnyResponseError> extends Promise<T> {
  readonly #outcome: Promise<RequestOutcome<T, E>>;

  constructor(outcome: Promise<RequestOutcome<T, E>>) {
    super((resolve, reject) => {
      outcome.then((o) => (o.ok ? resolve(o.data) : reject(o.error)), reject);
    });
    this.#outcome = outcome;

    this.catch(() => {});
  }

  static override get [Symbol.species](): PromiseConstructor {
    return Promise;
  }

  async asApiResult(): Promise<ApiResult<T, E>> {
    const o = await this.#outcome;
    return o.ok
      ? {
          ok: true,
          value: o.data,
          status: o.status,
          headers: o.headers,
        }
      : {
          ok: false,
          error: o.error.payload as PayloadOf<E>,
          errorMessage: o.error.message,
          status: o.error.status,
          headers: o.headers,
        };
  }
}
