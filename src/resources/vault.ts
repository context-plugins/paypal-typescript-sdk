import type { AuthSchemes } from "../auth-schemes.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import { ResponseError, type Declared, type ErrorDecoders } from "../core/response-error.js";
import * as s from "../core/validation/index.js";
import {
  customerVaultPaymentTokensResponseSchema,
  type CustomerVaultPaymentTokensResponse,
} from "../models/customer-vault-payment-tokens-response.js";
import { errorSchema, type Error } from "../models/error.js";
import { paymentTokenRequestSchema, type PaymentTokenRequest } from "../models/payment-token-request.js";
import { paymentTokenResponseSchema, type PaymentTokenResponse } from "../models/payment-token-response.js";
import { setupTokenRequestSchema, type SetupTokenRequest } from "../models/setup-token-request.js";
import { setupTokenResponseSchema, type SetupTokenResponse } from "../models/setup-token-response.js";
import type { Servers } from "../servers.js";

export class Vault {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  createPaymentToken(
    request: Vault.CreatePaymentTokenRequest,
    options?: RequestOptions,
  ): ApiPromise<PaymentTokenResponse, Vault.CreatePaymentTokenError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v3/vault/payment-tokens"),
        auth: this.#auth.oauth2,
        headers: [
          { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
        ],
        body: { kind: "json", value: request.body, schema: paymentTokenRequestSchema },
      },
      {
        success: { kind: "json", schema: paymentTokenResponseSchema },
        errorFactory: Vault.CreatePaymentTokenError,
      },
      options,
    );
  }

  createSetupToken(
    request: Vault.CreateSetupTokenRequest,
    options?: RequestOptions,
  ): ApiPromise<SetupTokenResponse, Vault.CreateSetupTokenError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v3/vault/setup-tokens"),
        auth: this.#auth.oauth2,
        headers: [
          { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
        ],
        body: { kind: "json", value: request.body, schema: setupTokenRequestSchema },
      },
      {
        success: { kind: "json", schema: setupTokenResponseSchema },
        errorFactory: Vault.CreateSetupTokenError,
      },
      options,
    );
  }

  deletePaymentToken(
    request: Vault.DeletePaymentTokenRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Vault.DeletePaymentTokenError> {
    return this.#rawClient.execute(
      {
        method: "DELETE",
        url: this.#servers.default("/v3/vault/payment-tokens/{id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "empty" },
        errorFactory: Vault.DeletePaymentTokenError,
      },
      options,
    );
  }

  getPaymentToken(
    request: Vault.GetPaymentTokenRequest,
    options?: RequestOptions,
  ): ApiPromise<PaymentTokenResponse, Vault.GetPaymentTokenError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/v3/vault/payment-tokens/{id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: paymentTokenResponseSchema },
        errorFactory: Vault.GetPaymentTokenError,
      },
      options,
    );
  }

  getSetupToken(
    request: Vault.GetSetupTokenRequest,
    options?: RequestOptions,
  ): ApiPromise<SetupTokenResponse, Vault.GetSetupTokenError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/v3/vault/setup-tokens/{id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: setupTokenResponseSchema },
        errorFactory: Vault.GetSetupTokenError,
      },
      options,
    );
  }

  listCustomerPaymentTokens(
    request: Vault.ListCustomerPaymentTokensRequest,
    options?: RequestOptions,
  ): ApiPromise<CustomerVaultPaymentTokensResponse, Vault.ListCustomerPaymentTokensError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/v3/vault/payment-tokens"),
        auth: this.#auth.oauth2,
        query: [
          { name: "customer_id", value: request.customerId, schema: s.string() },
          { name: "page_size", value: request.pageSize, schema: s.defaulted(s.number(), 5) },
          { name: "page", value: request.page, schema: s.defaulted(s.number(), 1) },
          { name: "total_required", value: request.totalRequired, schema: s.defaulted(s.boolean(), false) },
        ],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: customerVaultPaymentTokensResponseSchema },
        errorFactory: Vault.ListCustomerPaymentTokensError,
      },
      options,
    );
  }
}

export namespace Vault {
  export type CreatePaymentTokenRequest = {
    payPalRequestId?: string;
    body: PaymentTokenRequest;
  };

  export class CreatePaymentTokenError extends ResponseError<
    | Declared<"error", Error>
    | Declared<"error2", Error>
    | Declared<"error3", Error>
    | Declared<"error4", Error>
    | Declared<"error5", Error>
  > {
    static readonly errors: ErrorDecoders<CreatePaymentTokenError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error5", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type CreateSetupTokenRequest = {
    payPalRequestId?: string;
    body: SetupTokenRequest;
  };

  export class CreateSetupTokenError extends ResponseError<
    | Declared<"error", Error>
    | Declared<"error2", Error>
    | Declared<"error3", Error>
    | Declared<"error4", Error>
  > {
    static readonly errors: ErrorDecoders<CreateSetupTokenError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error4", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type DeletePaymentTokenRequest = {
    id: string;
  };

  export class DeletePaymentTokenError extends ResponseError<
    Declared<"error", Error> | Declared<"error2", Error> | Declared<"error3", Error>
  > {
    static readonly errors: ErrorDecoders<DeletePaymentTokenError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error3", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type GetPaymentTokenRequest = {
    id: string;
  };

  export class GetPaymentTokenError extends ResponseError<
    | Declared<"error", Error>
    | Declared<"error2", Error>
    | Declared<"error3", Error>
    | Declared<"error4", Error>
  > {
    static readonly errors: ErrorDecoders<GetPaymentTokenError> = [
      { on: 403, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error4", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type GetSetupTokenRequest = {
    id: string;
  };

  export class GetSetupTokenError extends ResponseError<
    | Declared<"error", Error>
    | Declared<"error2", Error>
    | Declared<"error3", Error>
    | Declared<"error4", Error>
  > {
    static readonly errors: ErrorDecoders<GetSetupTokenError> = [
      { on: 403, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error4", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type ListCustomerPaymentTokensRequest = {
    customerId: string;
    pageSize?: number;
    page?: number;
    totalRequired?: boolean;
  };

  export class ListCustomerPaymentTokensError extends ResponseError<
    Declared<"error", Error> | Declared<"error2", Error> | Declared<"error3", Error>
  > {
    static readonly errors: ErrorDecoders<ListCustomerPaymentTokensError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error3", decode: { kind: "json", schema: errorSchema } },
    ];
  }
}
