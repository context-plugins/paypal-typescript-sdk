import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type ErrorDecoders, type ErrorPayload } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import { uuid } from "../core/uuid.js";
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

/**
 * Use the `/vault` resource to create, retrieve, and delete payment and setup tokens.
 */
export class Vault {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * Create payment token for a given payment source
   *
   * @remarks
   * Creates a Payment Token from the given payment source and adds it to the Vault of the
   * associated customer.
   *
   * @returns Idempotent response for a successful creation of payment token.
   *
   * @throws {@link Vault.CreatePaymentTokenError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  createPaymentToken(
    request: Vault.CreatePaymentTokenRequest,
    options?: RequestOptions,
  ): ApiPromise<PaymentTokenResponse, Vault.CreatePaymentTokenError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/v3/vault/payment-tokens"),
        auth: this.#auth.oauth2,
        pathParams: [],
        query: [],
        headers: [
          { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
          { name: "Idempotency-Key", value: uuid(), schema: s.string() },
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

  /**
   * Create a setup token
   *
   * @remarks
   * Creates a Setup Token from the given payment source and adds it to the Vault of the associated
   * customer.
   *
   * @returns Idempotent response for a successful creation of setup token.
   *
   * @throws {@link Vault.CreateSetupTokenError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  createSetupToken(
    request: Vault.CreateSetupTokenRequest,
    options?: RequestOptions,
  ): ApiPromise<SetupTokenResponse, Vault.CreateSetupTokenError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/v3/vault/setup-tokens"),
        auth: this.#auth.oauth2,
        pathParams: [],
        query: [],
        headers: [
          { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
          { name: "Idempotency-Key", value: uuid(), schema: s.string() },
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

  /**
   * Delete payment token
   *
   * @remarks
   * Delete the payment token associated with the payment token id.
   *
   * @returns The server has successfully executed the method, but there is no entity body to
   * return.
   *
   * @throws {@link Vault.DeletePaymentTokenError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  deletePaymentToken(
    request: Vault.DeletePaymentTokenRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Vault.DeletePaymentTokenError> {
    return this.#rawClient.execute(
      {
        method: "DELETE",
        urlTemplate: this.#servers.default("/v3/vault/payment-tokens/{id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "empty" },
        errorFactory: Vault.DeletePaymentTokenError,
      },
      options,
    );
  }

  /**
   * Retrieve a payment token
   *
   * @remarks
   * Returns a readable representation of vaulted payment source associated with the payment token
   * id.
   *
   * @returns Successful execution.
   *
   * @throws {@link Vault.GetPaymentTokenError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  getPaymentToken(
    request: Vault.GetPaymentTokenRequest,
    options?: RequestOptions,
  ): ApiPromise<PaymentTokenResponse, Vault.GetPaymentTokenError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/v3/vault/payment-tokens/{id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: paymentTokenResponseSchema },
        errorFactory: Vault.GetPaymentTokenError,
      },
      options,
    );
  }

  /**
   * Retrieve a setup token
   *
   * @remarks
   * Returns a readable representation of temporarily vaulted payment source associated with the
   * setup token id.
   *
   * @returns Found requested setup-token, returned a payment method associated with the token.
   *
   * @throws {@link Vault.GetSetupTokenError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  getSetupToken(
    request: Vault.GetSetupTokenRequest,
    options?: RequestOptions,
  ): ApiPromise<SetupTokenResponse, Vault.GetSetupTokenError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/v3/vault/setup-tokens/{id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: setupTokenResponseSchema },
        errorFactory: Vault.GetSetupTokenError,
      },
      options,
    );
  }

  /**
   * List all payment tokens
   *
   * @remarks
   * Returns all payment tokens for a customer.
   *
   * @returns Successful execution.
   *
   * @throws {@link Vault.ListCustomerPaymentTokensError} when the API answers with an error status
   * — narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  listCustomerPaymentTokens(
    request: Vault.ListCustomerPaymentTokensRequest,
    options?: RequestOptions,
  ): ApiPromise<CustomerVaultPaymentTokensResponse, Vault.ListCustomerPaymentTokensError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/v3/vault/payment-tokens"),
        auth: this.#auth.oauth2,
        pathParams: [],
        query: [
          { name: "customer_id", value: request.customerId, schema: s.string() },
          { name: "page_size", value: request.pageSize, schema: s.defaulted(s.int(), 5) },
          { name: "page", value: request.page, schema: s.defaulted(s.int(), 1) },
          { name: "total_required", value: request.totalRequired, schema: s.defaulted(s.boolean(), false) },
        ],
        headers: [],
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
    /** The server stores keys for 3 hours. */
    payPalRequestId?: string;
    /** Payment Token creation with a financial instrument and an optional customer_id. */
    body: PaymentTokenRequest;
  };

  export class CreatePaymentTokenError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"error", Error>
      | Declared<"error2", Error>
      | Declared<"error3", Error>
      | Declared<"error4", Error>
      | Declared<"error5", Error>
    >;

    static readonly errors: ErrorDecoders<CreatePaymentTokenError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error5", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type CreateSetupTokenRequest = {
    /** The server stores keys for 3 hours. */
    payPalRequestId?: string;
    /**
     * Setup Token creation with a instrument type optional financial instrument details and
     * customer_id.
     */
    body: SetupTokenRequest;
  };

  export class CreateSetupTokenError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"error", Error>
      | Declared<"error2", Error>
      | Declared<"error3", Error>
      | Declared<"error4", Error>
    >;

    static readonly errors: ErrorDecoders<CreateSetupTokenError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error4", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type DeletePaymentTokenRequest = {
    /** ID of the payment token. */
    id: string;
  };

  export class DeletePaymentTokenError extends ApiError {
    declare readonly payload: ErrorPayload<
      Declared<"error", Error> | Declared<"error2", Error> | Declared<"error3", Error>
    >;

    static readonly errors: ErrorDecoders<DeletePaymentTokenError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error3", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type GetPaymentTokenRequest = {
    /** ID of the payment token. */
    id: string;
  };

  export class GetPaymentTokenError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"error", Error>
      | Declared<"error2", Error>
      | Declared<"error3", Error>
      | Declared<"error4", Error>
    >;

    static readonly errors: ErrorDecoders<GetPaymentTokenError> = [
      { on: 403, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error4", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type GetSetupTokenRequest = {
    /** ID of the setup token. */
    id: string;
  };

  export class GetSetupTokenError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"error", Error>
      | Declared<"error2", Error>
      | Declared<"error3", Error>
      | Declared<"error4", Error>
    >;

    static readonly errors: ErrorDecoders<GetSetupTokenError> = [
      { on: 403, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error4", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type ListCustomerPaymentTokensRequest = {
    /**
     * A unique identifier representing a specific customer in merchant's/partner's system or
     * records.
     */
    customerId: string;
    /**
     * A non-negative, non-zero integer indicating the maximum number of results to return at one
     * time.
     *
     * @default 5
     */
    pageSize?: number;
    /** A non-negative, non-zero integer representing the page of the results. @default 1 */
    page?: number;
    /**
     * A boolean indicating total number of items (total_items) and pages (total_pages) are expected
     * to be returned in the response.
     *
     * @default false
     */
    totalRequired?: boolean;
  };

  export class ListCustomerPaymentTokensError extends ApiError {
    declare readonly payload: ErrorPayload<
      Declared<"error", Error> | Declared<"error2", Error> | Declared<"error3", Error>
    >;

    static readonly errors: ErrorDecoders<ListCustomerPaymentTokensError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error3", decode: { kind: "json", schema: errorSchema } },
    ];
  }
}
