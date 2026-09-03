import type { AuthSchemes } from "../auth-schemes.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import { ResponseError, type Declared, type ErrorDecoders } from "../core/response-error.js";
import * as s from "../core/validation/index.js";
import { captureRequestSchema, type CaptureRequest } from "../models/capture-request.js";
import { capturedPaymentSchema, type CapturedPayment } from "../models/captured-payment.js";
import { errorSchema, type Error } from "../models/error.js";
import { paymentAuthorizationSchema, type PaymentAuthorization } from "../models/payment-authorization.js";
import { reauthorizeRequestSchema, type ReauthorizeRequest } from "../models/reauthorize-request.js";
import { refundRequestSchema, type RefundRequest } from "../models/refund-request.js";
import { refundSchema, type Refund } from "../models/refund.js";
import type { Servers } from "../servers.js";

export class Payments {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  captureAuthorizedPayment(
    request: Payments.CaptureAuthorizedPaymentRequest,
    options?: RequestOptions,
  ): ApiPromise<CapturedPayment, Payments.CaptureAuthorizedPaymentError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v2/payments/authorizations/{authorization_id}/capture"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "authorization_id", value: request.authorizationId, schema: s.string() }],
        headers: [
          { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
          { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
          { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
          {
            name: "PayPal-Auth-Assertion",
            value: request.payPalAuthAssertion,
            schema: s.optional(s.string()),
          },
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

  getAuthorizedPayment(
    request: Payments.GetAuthorizedPaymentRequest,
    options?: RequestOptions,
  ): ApiPromise<PaymentAuthorization, Payments.GetAuthorizedPaymentError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/v2/payments/authorizations/{authorization_id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "authorization_id", value: request.authorizationId, schema: s.string() }],
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

  getCapturedPayment(
    request: Payments.GetCapturedPaymentRequest,
    options?: RequestOptions,
  ): ApiPromise<CapturedPayment, Payments.GetCapturedPaymentError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/v2/payments/captures/{capture_id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "capture_id", value: request.captureId, schema: s.string() }],
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

  getRefund(
    request: Payments.GetRefundRequest,
    options?: RequestOptions,
  ): ApiPromise<Refund, Payments.GetRefundError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/v2/payments/refunds/{refund_id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "refund_id", value: request.refundId, schema: s.string() }],
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

  reauthorizePayment(
    request: Payments.ReauthorizePaymentRequest,
    options?: RequestOptions,
  ): ApiPromise<PaymentAuthorization, Payments.ReauthorizePaymentError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v2/payments/authorizations/{authorization_id}/reauthorize"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "authorization_id", value: request.authorizationId, schema: s.string() }],
        headers: [
          { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
          { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
          {
            name: "PayPal-Auth-Assertion",
            value: request.payPalAuthAssertion,
            schema: s.optional(s.string()),
          },
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

  refundCapturedPayment(
    request: Payments.RefundCapturedPaymentRequest,
    options?: RequestOptions,
  ): ApiPromise<Refund, Payments.RefundCapturedPaymentError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v2/payments/captures/{capture_id}/refund"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "capture_id", value: request.captureId, schema: s.string() }],
        headers: [
          { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
          { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
          { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
          {
            name: "PayPal-Auth-Assertion",
            value: request.payPalAuthAssertion,
            schema: s.optional(s.string()),
          },
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

  voidPayment(
    request: Payments.VoidPaymentRequest,
    options?: RequestOptions,
  ): ApiPromise<PaymentAuthorization, Payments.VoidPaymentError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v2/payments/authorizations/{authorization_id}/void"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "authorization_id", value: request.authorizationId, schema: s.string() }],
        headers: [
          { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
          {
            name: "PayPal-Auth-Assertion",
            value: request.payPalAuthAssertion,
            schema: s.optional(s.string()),
          },
          { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
          { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
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
    authorizationId: string;
    payPalMockResponse?: string;
    payPalRequestId?: string;
    prefer?: string;
    payPalAuthAssertion?: string;
    body?: CaptureRequest;
  };

  export class CaptureAuthorizedPaymentError extends ResponseError<
    | Declared<"error", Error>
    | Declared<"error2", Error>
    | Declared<"error3", Error>
    | Declared<"error4", Error>
    | Declared<"error5", Error>
    | Declared<"error6", Error>
    | Declared<"error500", undefined>
    | Declared<"error7", Error>
  > {
    static readonly errors: ErrorDecoders<CaptureAuthorizedPaymentError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 401, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: 409, kind: "error5", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error6", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error500", decode: { kind: "empty" } },
      { on: [400, 599], kind: "error7", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type GetAuthorizedPaymentRequest = {
    authorizationId: string;
    payPalMockResponse?: string;
    payPalAuthAssertion?: string;
  };

  export class GetAuthorizedPaymentError extends ResponseError<
    | Declared<"error", Error>
    | Declared<"error2", Error>
    | Declared<"error3", Error>
    | Declared<"error500", undefined>
    | Declared<"error4", Error>
  > {
    static readonly errors: ErrorDecoders<GetAuthorizedPaymentError> = [
      { on: 401, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error500", decode: { kind: "empty" } },
      { on: [400, 599], kind: "error4", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type GetCapturedPaymentRequest = {
    captureId: string;
    payPalMockResponse?: string;
  };

  export class GetCapturedPaymentError extends ResponseError<
    | Declared<"error", Error>
    | Declared<"error2", Error>
    | Declared<"error3", Error>
    | Declared<"error500", undefined>
    | Declared<"error4", Error>
  > {
    static readonly errors: ErrorDecoders<GetCapturedPaymentError> = [
      { on: 401, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error500", decode: { kind: "empty" } },
      { on: [400, 599], kind: "error4", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type GetRefundRequest = {
    refundId: string;
    payPalMockResponse?: string;
    payPalAuthAssertion?: string;
  };

  export class GetRefundError extends ResponseError<
    | Declared<"error", Error>
    | Declared<"error2", Error>
    | Declared<"error3", Error>
    | Declared<"error500", undefined>
    | Declared<"error4", Error>
  > {
    static readonly errors: ErrorDecoders<GetRefundError> = [
      { on: 401, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error500", decode: { kind: "empty" } },
      { on: [400, 599], kind: "error4", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type ReauthorizePaymentRequest = {
    authorizationId: string;
    payPalRequestId?: string;
    prefer?: string;
    payPalAuthAssertion?: string;
    body?: ReauthorizeRequest;
  };

  export class ReauthorizePaymentError extends ResponseError<
    | Declared<"error", Error>
    | Declared<"error2", Error>
    | Declared<"error3", Error>
    | Declared<"error4", Error>
    | Declared<"error5", Error>
    | Declared<"error500", undefined>
    | Declared<"error6", Error>
  > {
    static readonly errors: ErrorDecoders<ReauthorizePaymentError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 401, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error5", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error500", decode: { kind: "empty" } },
      { on: [400, 599], kind: "error6", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type RefundCapturedPaymentRequest = {
    captureId: string;
    payPalMockResponse?: string;
    payPalRequestId?: string;
    prefer?: string;
    payPalAuthAssertion?: string;
    body?: RefundRequest;
  };

  export class RefundCapturedPaymentError extends ResponseError<
    | Declared<"error", Error>
    | Declared<"error2", Error>
    | Declared<"error3", Error>
    | Declared<"error4", Error>
    | Declared<"error5", Error>
    | Declared<"error6", Error>
    | Declared<"error500", undefined>
    | Declared<"error7", Error>
  > {
    static readonly errors: ErrorDecoders<RefundCapturedPaymentError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 401, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: 409, kind: "error5", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error6", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error500", decode: { kind: "empty" } },
      { on: [400, 599], kind: "error7", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type VoidPaymentRequest = {
    authorizationId: string;
    payPalMockResponse?: string;
    payPalAuthAssertion?: string;
    payPalRequestId?: string;
    prefer?: string;
  };

  export class VoidPaymentError extends ResponseError<
    | Declared<"error", Error>
    | Declared<"error2", Error>
    | Declared<"error3", Error>
    | Declared<"error4", Error>
    | Declared<"error5", Error>
    | Declared<"error500", undefined>
    | Declared<"error6", Error>
  > {
    static readonly errors: ErrorDecoders<VoidPaymentError> = [
      { on: 401, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 409, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error5", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error500", decode: { kind: "empty" } },
      { on: [400, 599], kind: "error6", decode: { kind: "json", schema: errorSchema } },
    ];
  }
}
