import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type ErrorDecoders, type ErrorPayload } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import { uuid } from "../core/uuid.js";
import * as s from "../core/validation/index.js";
import { captureRequestSchema, type CaptureRequest } from "../models/capture-request.js";
import { capturedPaymentSchema, type CapturedPayment } from "../models/captured-payment.js";
import { errorSchema, type Error } from "../models/error.js";
import { paymentAuthorizationSchema, type PaymentAuthorization } from "../models/payment-authorization.js";
import { reauthorizeRequestSchema, type ReauthorizeRequest } from "../models/reauthorize-request.js";
import { refundRequestSchema, type RefundRequest } from "../models/refund-request.js";
import { refundSchema, type Refund } from "../models/refund.js";
import type { Servers } from "../servers.js";

/**
 * Use the `/payments` resource to authorize, capture, void authorizations, and retrieve captures.
 */
export class Payments {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * Capture authorized payment
   *
   * @remarks
   * Captures an authorized payment, by ID.
   *
   * @returns A successful request returns the HTTP 200 OK status code and a JSON response body that
   * shows captured payment details.
   *
   * @throws {@link Payments.CaptureAuthorizedPaymentError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  captureAuthorizedPayment(
    request: Payments.CaptureAuthorizedPaymentRequest,
    options?: RequestOptions,
  ): ApiPromise<CapturedPayment, Payments.CaptureAuthorizedPaymentError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/v2/payments/authorizations/{authorization_id}/capture"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "authorization_id", value: request.authorizationId, schema: s.string() }],
        query: [],
        headers: [
          { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
          { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
          { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
          {
            name: "PayPal-Auth-Assertion",
            value: request.payPalAuthAssertion,
            schema: s.optional(s.string()),
          },
          { name: "Idempotency-Key", value: uuid(), schema: s.string() },
        ],
        body: { kind: "json", value: request.body, schema: s.optional(s.lazy(() => captureRequestSchema)) },
      },
      {
        success: { kind: "json", schema: capturedPaymentSchema },
        errorFactory: Payments.CaptureAuthorizedPaymentError,
      },
      options,
    );
  }

  /**
   * Show details for authorized payment
   *
   * @remarks
   * Shows details for an authorized payment, by ID.
   *
   * @returns A successful request returns the HTTP 200 OK status code and a JSON response body that
   * shows authorization details.
   *
   * @throws {@link Payments.GetAuthorizedPaymentError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  getAuthorizedPayment(
    request: Payments.GetAuthorizedPaymentRequest,
    options?: RequestOptions,
  ): ApiPromise<PaymentAuthorization, Payments.GetAuthorizedPaymentError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/v2/payments/authorizations/{authorization_id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "authorization_id", value: request.authorizationId, schema: s.string() }],
        query: [],
        headers: [
          { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
          {
            name: "PayPal-Auth-Assertion",
            value: request.payPalAuthAssertion,
            schema: s.optional(s.string()),
          },
        ],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: paymentAuthorizationSchema },
        errorFactory: Payments.GetAuthorizedPaymentError,
      },
      options,
    );
  }

  /**
   * Show captured payment details
   *
   * @remarks
   * Shows details for a captured payment, by ID.
   *
   * @returns A successful request returns the HTTP 200 OK status code and a JSON response body that
   * shows captured payment details.
   *
   * @throws {@link Payments.GetCapturedPaymentError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  getCapturedPayment(
    request: Payments.GetCapturedPaymentRequest,
    options?: RequestOptions,
  ): ApiPromise<CapturedPayment, Payments.GetCapturedPaymentError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/v2/payments/captures/{capture_id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "capture_id", value: request.captureId, schema: s.string() }],
        query: [],
        headers: [
          { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
        ],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: capturedPaymentSchema },
        errorFactory: Payments.GetCapturedPaymentError,
      },
      options,
    );
  }

  /**
   * Show refund details
   *
   * @remarks
   * Shows details for a refund, by ID.
   *
   * @returns A successful request returns the HTTP 200 OK status code and a JSON response body that
   * shows refund details.
   *
   * @throws {@link Payments.GetRefundError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  getRefund(
    request: Payments.GetRefundRequest,
    options?: RequestOptions,
  ): ApiPromise<Refund, Payments.GetRefundError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/v2/payments/refunds/{refund_id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "refund_id", value: request.refundId, schema: s.string() }],
        query: [],
        headers: [
          { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
          {
            name: "PayPal-Auth-Assertion",
            value: request.payPalAuthAssertion,
            schema: s.optional(s.string()),
          },
        ],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: refundSchema },
        errorFactory: Payments.GetRefundError,
      },
      options,
    );
  }

  /**
   * Reauthorize authorized payment
   *
   * @remarks
   * Reauthorizes an authorized PayPal account payment, by ID. To ensure that funds are still
   * available, reauthorize a payment after its initial three-day honor period expires. Within the
   * 29-day authorization period, you can issue multiple re-authorizations after the honor period
   * expires. If 30 days have transpired since the date of the original authorization, you must
   * create an authorized payment instead of reauthorizing the original authorized payment. A
   * reauthorized payment itself has a new honor period of three days. You can reauthorize an
   * authorized payment from 4 to 29 days after the 3-day honor period. The allowed amount depends
   * on context and geography, for example in US it is up to 115% of the original authorized amount,
   * not to exceed an increase of $75 USD. Supports only the `amount` request parameter.
   *
   * @returns A successful request returns the HTTP 200 OK status code and a JSON response body that
   * shows the reauthorized payment details.
   *
   * @throws {@link Payments.ReauthorizePaymentError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  reauthorizePayment(
    request: Payments.ReauthorizePaymentRequest,
    options?: RequestOptions,
  ): ApiPromise<PaymentAuthorization, Payments.ReauthorizePaymentError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/v2/payments/authorizations/{authorization_id}/reauthorize"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "authorization_id", value: request.authorizationId, schema: s.string() }],
        query: [],
        headers: [
          { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
          { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
          {
            name: "PayPal-Auth-Assertion",
            value: request.payPalAuthAssertion,
            schema: s.optional(s.string()),
          },
          { name: "Idempotency-Key", value: uuid(), schema: s.string() },
        ],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => reauthorizeRequestSchema)),
        },
      },
      {
        success: { kind: "json", schema: paymentAuthorizationSchema },
        errorFactory: Payments.ReauthorizePaymentError,
      },
      options,
    );
  }

  /**
   * Refund captured payment
   *
   * @remarks
   * Refunds a captured payment, by ID. For a full refund, include an empty payload in the JSON
   * request body. For a partial refund, include an amount object in the JSON request body.
   *
   * @returns A successful request returns the HTTP 200 OK status code and a JSON response body that
   * shows refund details.
   *
   * @throws {@link Payments.RefundCapturedPaymentError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  refundCapturedPayment(
    request: Payments.RefundCapturedPaymentRequest,
    options?: RequestOptions,
  ): ApiPromise<Refund, Payments.RefundCapturedPaymentError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/v2/payments/captures/{capture_id}/refund"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "capture_id", value: request.captureId, schema: s.string() }],
        query: [],
        headers: [
          { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
          { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
          { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
          {
            name: "PayPal-Auth-Assertion",
            value: request.payPalAuthAssertion,
            schema: s.optional(s.string()),
          },
          { name: "Idempotency-Key", value: uuid(), schema: s.string() },
        ],
        body: { kind: "json", value: request.body, schema: s.optional(s.lazy(() => refundRequestSchema)) },
      },
      {
        success: { kind: "json", schema: refundSchema },
        errorFactory: Payments.RefundCapturedPaymentError,
      },
      options,
    );
  }

  /**
   * Void authorized payment
   *
   * @remarks
   * Voids, or cancels, an authorized payment, by ID. You cannot void an authorized payment that has
   * been fully captured.
   *
   * @returns A successful request returns the HTTP 200 OK status code and a JSON response body that
   * shows authorization details. This response is returned when the Prefer header is set to
   * return=representation.
   *
   * @throws {@link Payments.VoidPaymentError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  voidPayment(
    request: Payments.VoidPaymentRequest,
    options?: RequestOptions,
  ): ApiPromise<PaymentAuthorization, Payments.VoidPaymentError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/v2/payments/authorizations/{authorization_id}/void"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "authorization_id", value: request.authorizationId, schema: s.string() }],
        query: [],
        headers: [
          { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
          {
            name: "PayPal-Auth-Assertion",
            value: request.payPalAuthAssertion,
            schema: s.optional(s.string()),
          },
          { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
          { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
          { name: "Idempotency-Key", value: uuid(), schema: s.string() },
        ],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: paymentAuthorizationSchema },
        errorFactory: Payments.VoidPaymentError,
      },
      options,
    );
  }
}

export namespace Payments {
  export type CaptureAuthorizedPaymentRequest = {
    /** The PayPal-generated ID for the authorized payment to capture. */
    authorizationId: string;
    /**
     * PayPal's REST API uses a request header to invoke negative testing in the sandbox. This
     * header configures the sandbox into a negative testing state for transactions that include the
     * merchant.
     */
    payPalMockResponse?: string;
    /** The server stores keys for 45 days. */
    payPalRequestId?: string;
    /**
     * The preferred server response upon successful completion of the request. Value is:
     * return=minimal. The server returns a minimal response to optimize communication between the
     * API caller and the server. A minimal response includes the id, status and HATEOAS links.
     * return=representation. The server returns a complete resource representation, including the
     * current state of the resource.
     *
     * @default "return=minimal"
     */
    prefer?: string;
    /**
     * An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For
     * details, see
     * [PayPal-Auth-Assertion](/docs/api/reference/api-requests/#paypal-auth-assertion). Note:For
     * three party transactions in which a partner is managing the API calls on behalf of a
     * merchant, the partner must identify the merchant using either a PayPal-Auth-Assertion header
     * or an access token with target_subject.
     */
    payPalAuthAssertion?: string;
    body?: CaptureRequest;
  };

  export class CaptureAuthorizedPaymentError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"error", Error>
      | Declared<"error2", Error>
      | Declared<"error3", Error>
      | Declared<"error4", Error>
      | Declared<"error5", Error>
      | Declared<"error6", Error>
      | Declared<"error500", undefined>
      | Declared<"error7", Error>
    >;

    static readonly errors: ErrorDecoders<CaptureAuthorizedPaymentError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 401, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: 409, kind: "error5", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error6", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error500", decode: { kind: "empty" } },
      { on: "default", kind: "error7", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type GetAuthorizedPaymentRequest = {
    /** The ID of the authorized payment for which to show details. */
    authorizationId: string;
    /**
     * PayPal's REST API uses a request header to invoke negative testing in the sandbox. This
     * header configures the sandbox into a negative testing state for transactions that include the
     * merchant.
     */
    payPalMockResponse?: string;
    /**
     * An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For
     * details, see
     * [PayPal-Auth-Assertion](/docs/api/reference/api-requests/#paypal-auth-assertion). Note:For
     * three party transactions in which a partner is managing the API calls on behalf of a
     * merchant, the partner must identify the merchant using either a PayPal-Auth-Assertion header
     * or an access token with target_subject.
     */
    payPalAuthAssertion?: string;
  };

  export class GetAuthorizedPaymentError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"error", Error>
      | Declared<"error2", Error>
      | Declared<"error3", Error>
      | Declared<"error500", undefined>
      | Declared<"error4", Error>
    >;

    static readonly errors: ErrorDecoders<GetAuthorizedPaymentError> = [
      { on: 401, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error500", decode: { kind: "empty" } },
      { on: "default", kind: "error4", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type GetCapturedPaymentRequest = {
    /** The PayPal-generated ID for the captured payment for which to show details. */
    captureId: string;
    /**
     * PayPal's REST API uses a request header to invoke negative testing in the sandbox. This
     * header configures the sandbox into a negative testing state for transactions that include the
     * merchant.
     */
    payPalMockResponse?: string;
  };

  export class GetCapturedPaymentError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"error", Error>
      | Declared<"error2", Error>
      | Declared<"error3", Error>
      | Declared<"error500", undefined>
      | Declared<"error4", Error>
    >;

    static readonly errors: ErrorDecoders<GetCapturedPaymentError> = [
      { on: 401, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error500", decode: { kind: "empty" } },
      { on: "default", kind: "error4", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type GetRefundRequest = {
    /** The PayPal-generated ID for the refund for which to show details. */
    refundId: string;
    /**
     * PayPal's REST API uses a request header to invoke negative testing in the sandbox. This
     * header configures the sandbox into a negative testing state for transactions that include the
     * merchant.
     */
    payPalMockResponse?: string;
    /**
     * An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For
     * details, see
     * [PayPal-Auth-Assertion](/docs/api/reference/api-requests/#paypal-auth-assertion). Note:For
     * three party transactions in which a partner is managing the API calls on behalf of a
     * merchant, the partner must identify the merchant using either a PayPal-Auth-Assertion header
     * or an access token with target_subject.
     */
    payPalAuthAssertion?: string;
  };

  export class GetRefundError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"error", Error>
      | Declared<"error2", Error>
      | Declared<"error3", Error>
      | Declared<"error500", undefined>
      | Declared<"error4", Error>
    >;

    static readonly errors: ErrorDecoders<GetRefundError> = [
      { on: 401, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error500", decode: { kind: "empty" } },
      { on: "default", kind: "error4", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type ReauthorizePaymentRequest = {
    /** The PayPal-generated ID for the authorized payment to reauthorize. */
    authorizationId: string;
    /** The server stores keys for 45 days. */
    payPalRequestId?: string;
    /**
     * The preferred server response upon successful completion of the request. Value is:
     * return=minimal. The server returns a minimal response to optimize communication between the
     * API caller and the server. A minimal response includes the id, status and HATEOAS links.
     * return=representation. The server returns a complete resource representation, including the
     * current state of the resource.
     *
     * @default "return=minimal"
     */
    prefer?: string;
    /**
     * An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For
     * details, see
     * [PayPal-Auth-Assertion](/docs/api/reference/api-requests/#paypal-auth-assertion). Note:For
     * three party transactions in which a partner is managing the API calls on behalf of a
     * merchant, the partner must identify the merchant using either a PayPal-Auth-Assertion header
     * or an access token with target_subject.
     */
    payPalAuthAssertion?: string;
    body?: ReauthorizeRequest;
  };

  export class ReauthorizePaymentError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"error", Error>
      | Declared<"error2", Error>
      | Declared<"error3", Error>
      | Declared<"error4", Error>
      | Declared<"error5", Error>
      | Declared<"error500", undefined>
      | Declared<"error6", Error>
    >;

    static readonly errors: ErrorDecoders<ReauthorizePaymentError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 401, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error5", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error500", decode: { kind: "empty" } },
      { on: "default", kind: "error6", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type RefundCapturedPaymentRequest = {
    /** The PayPal-generated ID for the captured payment to refund. */
    captureId: string;
    /**
     * PayPal's REST API uses a request header to invoke negative testing in the sandbox. This
     * header configures the sandbox into a negative testing state for transactions that include the
     * merchant.
     */
    payPalMockResponse?: string;
    /** The server stores keys for 45 days. */
    payPalRequestId?: string;
    /**
     * The preferred server response upon successful completion of the request. Value is:
     * return=minimal. The server returns a minimal response to optimize communication between the
     * API caller and the server. A minimal response includes the id, status and HATEOAS links.
     * return=representation. The server returns a complete resource representation, including the
     * current state of the resource.
     *
     * @default "return=minimal"
     */
    prefer?: string;
    /**
     * An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For
     * details, see
     * [PayPal-Auth-Assertion](/docs/api/reference/api-requests/#paypal-auth-assertion). Note:For
     * three party transactions in which a partner is managing the API calls on behalf of a
     * merchant, the partner must identify the merchant using either a PayPal-Auth-Assertion header
     * or an access token with target_subject.
     */
    payPalAuthAssertion?: string;
    body?: RefundRequest;
  };

  export class RefundCapturedPaymentError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"error", Error>
      | Declared<"error2", Error>
      | Declared<"error3", Error>
      | Declared<"error4", Error>
      | Declared<"error5", Error>
      | Declared<"error6", Error>
      | Declared<"error500", undefined>
      | Declared<"error7", Error>
    >;

    static readonly errors: ErrorDecoders<RefundCapturedPaymentError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 401, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: 409, kind: "error5", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error6", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error500", decode: { kind: "empty" } },
      { on: "default", kind: "error7", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type VoidPaymentRequest = {
    /** The PayPal-generated ID for the authorized payment to void. */
    authorizationId: string;
    /**
     * PayPal's REST API uses a request header to invoke negative testing in the sandbox. This
     * header configures the sandbox into a negative testing state for transactions that include the
     * merchant.
     */
    payPalMockResponse?: string;
    /**
     * An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For
     * details, see
     * [PayPal-Auth-Assertion](/docs/api/reference/api-requests/#paypal-auth-assertion). Note:For
     * three party transactions in which a partner is managing the API calls on behalf of a
     * merchant, the partner must identify the merchant using either a PayPal-Auth-Assertion header
     * or an access token with target_subject.
     */
    payPalAuthAssertion?: string;
    /** The server stores keys for 45 days. */
    payPalRequestId?: string;
    /**
     * The preferred server response upon successful completion of the request. Value is:
     * return=minimal. The server returns a minimal response to optimize communication between the
     * API caller and the server. A minimal response includes the id, status and HATEOAS links.
     * return=representation. The server returns a complete resource representation, including the
     * current state of the resource.
     *
     * @default "return=minimal"
     */
    prefer?: string;
  };

  export class VoidPaymentError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"error", Error>
      | Declared<"error2", Error>
      | Declared<"error3", Error>
      | Declared<"error4", Error>
      | Declared<"error5", Error>
      | Declared<"error500", undefined>
      | Declared<"error6", Error>
    >;

    static readonly errors: ErrorDecoders<VoidPaymentError> = [
      { on: 401, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 409, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error5", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error500", decode: { kind: "empty" } },
      { on: "default", kind: "error6", decode: { kind: "json", schema: errorSchema } },
    ];
  }
}
