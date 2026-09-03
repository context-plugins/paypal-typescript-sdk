import { decodeResponse, type AnyResponseDecoder, type ResponseDecoder } from "./response-decoder.js";
import { CoreError, ConnectionError } from "./errors.js";

export type Declared<K extends string, B> = {
  readonly kind: K;
  readonly body: B;
};

export type Undeclared = {
  readonly kind: "undeclared";
  readonly rawBody: ArrayBuffer;
};

export type ErrorPayload<P = never> = P | Undeclared;

export type AnyPayload = ErrorPayload<Declared<string, unknown>>;

export type ResponseErrorInit<Payload = Undeclared> = {
  status: number;
  headers: Headers;
  message: string;
  payload: Payload;
};

export class ResponseError<P = Undeclared> extends Error {
  readonly status: number;
  readonly headers: Headers;
  readonly payload: ErrorPayload<P>;

  constructor(init: ResponseErrorInit<ErrorPayload<P>>) {
    super(init.message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
    this.status = init.status;
    this.headers = init.headers;
    this.payload = init.payload;
  }
}

export type StatusPattern = number | "1XX" | "2XX" | "3XX" | "4XX" | "5XX" | readonly [number, number];

export type AnyResponseError = ResponseError<unknown>;

export type PayloadOf<E extends AnyResponseError> = E["payload"];

type AnyMatcher = { readonly on: StatusPattern; readonly kind: string; readonly decode: AnyResponseDecoder };

type ErrorMatcher<D> = D extends { kind: infer K extends string; body: infer B }
  ? { readonly on: StatusPattern; readonly kind: K; readonly decode: ResponseDecoder<B> }
  : never;

export type ErrorDecoders<E extends AnyResponseError> = readonly ErrorMatcher<PayloadOf<E>>[];

export type ErrorFactory<E extends AnyResponseError> = (new (init: ResponseErrorInit<PayloadOf<E>>) => E) & {
  readonly errors?: ErrorDecoders<E> | undefined;
};

export type ResponseHandler<T = unknown, E extends AnyResponseError = AnyResponseError> = {
  success: ResponseDecoder<T>;
  errorFactory: ErrorFactory<E>;
};

export async function decodeErrorPayload(
  response: Response,
  matchers: readonly AnyMatcher[] | undefined,
  status: number,
): Promise<AnyPayload> {
  const matcher =
    matchers?.find((m) => m.on === status) ??
    matchers?.find((m) => typeof m.on !== "number" && matchesStatus(m.on, status));

  if (matcher) return { kind: matcher.kind, body: await decodeResponse(matcher.decode, response) };

  try {
    return { kind: "undeclared", rawBody: await response.arrayBuffer() };
  } catch (err) {
    if (err instanceof CoreError) throw err;
    throw new ConnectionError({ message: "Response body could not be read.", cause: err });
  }
}

function matchesStatus(pattern: StatusPattern, status: number): boolean {
  if (typeof pattern === "number") return pattern === status;
  if (typeof pattern === "string") return `${Math.floor(status / 100)}XX` === pattern;
  return status >= pattern[0] && status <= pattern[1];
}
