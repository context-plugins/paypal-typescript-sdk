import type { AuthSchemes } from "../auth-schemes.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import { ResponseError, type Declared, type ErrorDecoders } from "../core/response-error.js";
import * as s from "../core/validation/index.js";
import { confirmOrderRequestSchema, type ConfirmOrderRequest } from "../models/confirm-order-request.js";
import { errorSchema, type Error } from "../models/error.js";
import {
  orderAuthorizeRequestSchema,
  type OrderAuthorizeRequest,
} from "../models/order-authorize-request.js";
import {
  orderAuthorizeResponseSchema,
  type OrderAuthorizeResponse,
} from "../models/order-authorize-response.js";
import { orderCaptureRequestSchema, type OrderCaptureRequest } from "../models/order-capture-request.js";
import { orderRequestSchema, type OrderRequest } from "../models/order-request.js";
import { orderTrackerRequestSchema, type OrderTrackerRequest } from "../models/order-tracker-request.js";
import { orderSchema, type Order } from "../models/order.js";
import { patchSchema, type Patch } from "../models/patch.js";
import type { Servers } from "../servers.js";

export class Orders {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  authorizeOrder(
    request: Orders.AuthorizeOrderRequest,
    options?: RequestOptions,
  ): ApiPromise<OrderAuthorizeResponse, Orders.AuthorizeOrderError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v2/checkout/orders/{id}/authorize"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        headers: [
          { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
          { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
          { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
          {
            name: "PayPal-Client-Metadata-Id",
            value: request.payPalClientMetadataId,
            schema: s.optional(s.string()),
          },
          {
            name: "PayPal-Auth-Assertion",
            value: request.payPalAuthAssertion,
            schema: s.optional(s.string()),
          },
        ],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => orderAuthorizeRequestSchema)),
        },
      },
      {
        success: { kind: "json", schema: orderAuthorizeResponseSchema },
        errorFactory: Orders.AuthorizeOrderError,
      },
      options,
    );
  }

  captureOrder(
    request: Orders.CaptureOrderRequest,
    options?: RequestOptions,
  ): ApiPromise<Order, Orders.CaptureOrderError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v2/checkout/orders/{id}/capture"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        headers: [
          { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
          { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
          { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
          {
            name: "PayPal-Client-Metadata-Id",
            value: request.payPalClientMetadataId,
            schema: s.optional(s.string()),
          },
          {
            name: "PayPal-Auth-Assertion",
            value: request.payPalAuthAssertion,
            schema: s.optional(s.string()),
          },
        ],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => orderCaptureRequestSchema)),
        },
      },
      {
        success: { kind: "json", schema: orderSchema },
        errorFactory: Orders.CaptureOrderError,
      },
      options,
    );
  }

  confirmOrder(
    request: Orders.ConfirmOrderRequestParams,
    options?: RequestOptions,
  ): ApiPromise<Order, Orders.ConfirmOrderError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v2/checkout/orders/{id}/confirm-payment-source"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        headers: [
          {
            name: "PayPal-Client-Metadata-Id",
            value: request.payPalClientMetadataId,
            schema: s.optional(s.string()),
          },
          {
            name: "PayPal-Auth-Assertion",
            value: request.payPalAuthAssertion,
            schema: s.optional(s.string()),
          },
          { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
        ],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => confirmOrderRequestSchema)),
        },
      },
      {
        success: { kind: "json", schema: orderSchema },
        errorFactory: Orders.ConfirmOrderError,
      },
      options,
    );
  }

  createOrder(
    request: Orders.CreateOrderRequest,
    options?: RequestOptions,
  ): ApiPromise<Order, Orders.CreateOrderError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v2/checkout/orders"),
        auth: this.#auth.oauth2,
        headers: [
          { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
          { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
          {
            name: "PayPal-Partner-Attribution-Id",
            value: request.payPalPartnerAttributionId,
            schema: s.optional(s.string()),
          },
          {
            name: "PayPal-Client-Metadata-Id",
            value: request.payPalClientMetadataId,
            schema: s.optional(s.string()),
          },
          { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
          {
            name: "PayPal-Auth-Assertion",
            value: request.payPalAuthAssertion,
            schema: s.optional(s.string()),
          },
        ],
        body: { kind: "json", value: request.body, schema: orderRequestSchema },
      },
      {
        success: { kind: "json", schema: orderSchema },
        errorFactory: Orders.CreateOrderError,
      },
      options,
    );
  }

  createOrderTracking(
    request: Orders.CreateOrderTrackingRequest,
    options?: RequestOptions,
  ): ApiPromise<Order, Orders.CreateOrderTrackingError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v2/checkout/orders/{id}/track"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        headers: [
          {
            name: "PayPal-Auth-Assertion",
            value: request.payPalAuthAssertion,
            schema: s.optional(s.string()),
          },
        ],
        body: { kind: "json", value: request.body, schema: orderTrackerRequestSchema },
      },
      {
        success: { kind: "json", schema: orderSchema },
        errorFactory: Orders.CreateOrderTrackingError,
      },
      options,
    );
  }

  getOrder(
    request: Orders.GetOrderRequest,
    options?: RequestOptions,
  ): ApiPromise<Order, Orders.GetOrderError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/v2/checkout/orders/{id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [{ name: "fields", value: request.fields, schema: s.optional(s.string()) }],
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
        success: { kind: "json", schema: orderSchema },
        errorFactory: Orders.GetOrderError,
      },
      options,
    );
  }

  patchOrder(
    request: Orders.PatchOrderRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Orders.PatchOrderError> {
    return this.#rawClient.execute(
      {
        method: "PATCH",
        url: this.#servers.default("/v2/checkout/orders/{id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        headers: [
          { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
          {
            name: "PayPal-Auth-Assertion",
            value: request.payPalAuthAssertion,
            schema: s.optional(s.string()),
          },
        ],
        body: { kind: "json", value: request.body, schema: s.optional(s.array(s.lazy(() => patchSchema))) },
      },
      {
        success: { kind: "empty" },
        errorFactory: Orders.PatchOrderError,
      },
      options,
    );
  }

  updateOrderTracking(
    request: Orders.UpdateOrderTrackingRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Orders.UpdateOrderTrackingError> {
    return this.#rawClient.execute(
      {
        method: "PATCH",
        url: this.#servers.default("/v2/checkout/orders/{id}/trackers/{tracker_id}"),
        auth: this.#auth.oauth2,
        pathParams: [
          { name: "id", value: request.id, schema: s.string() },
          { name: "tracker_id", value: request.trackerId, schema: s.string() },
        ],
        headers: [
          {
            name: "PayPal-Auth-Assertion",
            value: request.payPalAuthAssertion,
            schema: s.optional(s.string()),
          },
        ],
        body: { kind: "json", value: request.body, schema: s.optional(s.array(s.lazy(() => patchSchema))) },
      },
      {
        success: { kind: "empty" },
        errorFactory: Orders.UpdateOrderTrackingError,
      },
      options,
    );
  }
}

export namespace Orders {
  export type AuthorizeOrderRequest = {
    id: string;
    payPalMockResponse?: string;
    payPalRequestId?: string;
    prefer?: string;
    payPalClientMetadataId?: string;
    payPalAuthAssertion?: string;
    body?: OrderAuthorizeRequest;
  };

  export class AuthorizeOrderError extends ResponseError<
    | Declared<"error", Error>
    | Declared<"error2", Error>
    | Declared<"error3", Error>
    | Declared<"error4", Error>
    | Declared<"error5", Error>
    | Declared<"error6", Error>
    | Declared<"error7", Error>
  > {
    static readonly errors: ErrorDecoders<AuthorizeOrderError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 401, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error5", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error6", decode: { kind: "json", schema: errorSchema } },
      { on: [400, 599], kind: "error7", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type CaptureOrderRequest = {
    id: string;
    payPalMockResponse?: string;
    payPalRequestId?: string;
    prefer?: string;
    payPalClientMetadataId?: string;
    payPalAuthAssertion?: string;
    body?: OrderCaptureRequest;
  };

  export class CaptureOrderError extends ResponseError<
    | Declared<"error", Error>
    | Declared<"error2", Error>
    | Declared<"error3", Error>
    | Declared<"error4", Error>
    | Declared<"error5", Error>
    | Declared<"error6", Error>
    | Declared<"error7", Error>
  > {
    static readonly errors: ErrorDecoders<CaptureOrderError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 401, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error5", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error6", decode: { kind: "json", schema: errorSchema } },
      { on: [400, 599], kind: "error7", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type ConfirmOrderRequestParams = {
    id: string;
    payPalClientMetadataId?: string;
    payPalAuthAssertion?: string;
    prefer?: string;
    body?: ConfirmOrderRequest;
  };

  export class ConfirmOrderError extends ResponseError<
    | Declared<"error", Error>
    | Declared<"error2", Error>
    | Declared<"error3", Error>
    | Declared<"error4", Error>
    | Declared<"error5", Error>
  > {
    static readonly errors: ErrorDecoders<ConfirmOrderError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: [400, 599], kind: "error5", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type CreateOrderRequest = {
    payPalMockResponse?: string;
    payPalRequestId?: string;
    payPalPartnerAttributionId?: string;
    payPalClientMetadataId?: string;
    prefer?: string;
    payPalAuthAssertion?: string;
    body: OrderRequest;
  };

  export class CreateOrderError extends ResponseError<
    | Declared<"error", Error>
    | Declared<"error2", Error>
    | Declared<"error3", Error>
    | Declared<"error4", Error>
  > {
    static readonly errors: ErrorDecoders<CreateOrderError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 401, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: [400, 599], kind: "error4", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type CreateOrderTrackingRequest = {
    id: string;
    payPalAuthAssertion?: string;
    body: OrderTrackerRequest;
  };

  export class CreateOrderTrackingError extends ResponseError<
    | Declared<"error", Error>
    | Declared<"error2", Error>
    | Declared<"error3", Error>
    | Declared<"error4", Error>
    | Declared<"error5", Error>
    | Declared<"error6", Error>
  > {
    static readonly errors: ErrorDecoders<CreateOrderTrackingError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error5", decode: { kind: "json", schema: errorSchema } },
      { on: [400, 599], kind: "error6", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type GetOrderRequest = {
    id: string;
    fields?: string;
    payPalMockResponse?: string;
    payPalAuthAssertion?: string;
  };

  export class GetOrderError extends ResponseError<
    Declared<"error", Error> | Declared<"error2", Error> | Declared<"error3", Error>
  > {
    static readonly errors: ErrorDecoders<GetOrderError> = [
      { on: 401, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: [400, 599], kind: "error3", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type PatchOrderRequest = {
    id: string;
    payPalMockResponse?: string;
    payPalAuthAssertion?: string;
    body?: Patch[];
  };

  export class PatchOrderError extends ResponseError<
    | Declared<"error", Error>
    | Declared<"error2", Error>
    | Declared<"error3", Error>
    | Declared<"error4", Error>
    | Declared<"error5", Error>
  > {
    static readonly errors: ErrorDecoders<PatchOrderError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 401, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: [400, 599], kind: "error5", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type UpdateOrderTrackingRequest = {
    id: string;
    trackerId: string;
    payPalAuthAssertion?: string;
    body?: Patch[];
  };

  export class UpdateOrderTrackingError extends ResponseError<
    | Declared<"error", Error>
    | Declared<"error2", Error>
    | Declared<"error3", Error>
    | Declared<"error4", Error>
    | Declared<"error5", Error>
    | Declared<"error6", Error>
  > {
    static readonly errors: ErrorDecoders<UpdateOrderTrackingError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error5", decode: { kind: "json", schema: errorSchema } },
      { on: [400, 599], kind: "error6", decode: { kind: "json", schema: errorSchema } },
    ];
  }
}
