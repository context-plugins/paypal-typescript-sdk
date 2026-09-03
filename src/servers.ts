import type { UrlTemplate } from "./core/api-request.js";
import { SdkError } from "./core/errors.js";

export const ServerEnvironment = {
  Sandbox: "sandbox",
} as const;
export type ServerEnvironment = (typeof ServerEnvironment)[keyof typeof ServerEnvironment];

export type DefaultServerOptions = {
  sandbox?: { baseUrl?: string };
};

export type ServerOptions = {
  default?: DefaultServerOptions;
};

export type Servers = {
  default: (subPath: string) => UrlTemplate;
};

export const DEFAULT_SERVER_OPTIONS = {
  default: {
    sandbox: { baseUrl: "https://api-m.sandbox.paypal.com" },
  },
} as const satisfies ServerOptions;

export function buildServers(environment: ServerEnvironment, options: ServerOptions): Servers {
  return {
    default: (s) => defaultServer(environment, s, options.default),
  };
}

function defaultServer(
  environment: ServerEnvironment,
  subPath: string,
  options?: DefaultServerOptions,
): UrlTemplate {
  switch (environment) {
    case ServerEnvironment.Sandbox: {
      const sandbox = { ...DEFAULT_SERVER_OPTIONS.default.sandbox, ...options?.sandbox };
      return { baseUrl: sandbox.baseUrl, subPath };
    }
    default:
      unknownEnvironment(environment);
  }
}

function unknownEnvironment(environment: never): never {
  throw new SdkError({ message: `Unknown server environment: ${String(environment)}` });
}
