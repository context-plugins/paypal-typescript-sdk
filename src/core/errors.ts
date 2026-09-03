export type ErrorKind = "connection" | "timeout" | "abort" | "sdk" | "schema" | "auth";

export abstract class CoreError extends Error {
  abstract readonly kind: ErrorKind;

  protected constructor(message: string, options?: { cause?: unknown }) {
    super(message, options?.cause !== undefined ? { cause: options.cause } : undefined);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export type TransportErrorInit = { message: string; cause?: unknown };

export class ConnectionError extends CoreError {
  readonly kind = "connection" as const;
  constructor(init: TransportErrorInit) {
    super(init.message, init.cause !== undefined ? { cause: init.cause } : undefined);
  }
}

export class TimeoutError extends CoreError {
  readonly kind = "timeout" as const;
  constructor(init: TransportErrorInit) {
    super(init.message, init.cause !== undefined ? { cause: init.cause } : undefined);
  }
}

export class AbortError extends CoreError {
  readonly kind = "abort" as const;
  constructor(init: TransportErrorInit) {
    super(init.message, init.cause !== undefined ? { cause: init.cause } : undefined);
  }
}

export class SdkError extends CoreError {
  readonly kind = "sdk" as const;
  constructor(init: TransportErrorInit) {
    super(init.message, init.cause !== undefined ? { cause: init.cause } : undefined);
  }
}

export class AuthError extends CoreError {
  readonly kind = "auth" as const;
  constructor(init: TransportErrorInit) {
    super(init.message, init.cause !== undefined ? { cause: init.cause } : undefined);
  }
}
