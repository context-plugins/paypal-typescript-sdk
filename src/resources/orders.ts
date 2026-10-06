import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type ErrorDecoders, type ErrorPayload } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import { uuid } from "../core/uuid.js";
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

/**
 * Use the `/orders` resource to create, update, retrieve, authorize, capture and track orders.
 */
export class Orders {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * Authorize payment for order
   *
   * @remarks
   * Authorizes payment for an order. To successfully authorize payment for an order, the buyer must
   * first approve the order or a valid payment_source must be provided in the request. A buyer can
   * approve the order upon being redirected to the rel:approve URL that was returned in the HATEOAS
   * links in the create order response. Note: For error handling and troubleshooting, see Orders v2
   * errors.
   *
   * @returns A successful response to an idempotent request returns the HTTP `200 OK` status code
   * with a JSON response body that shows authorized payment details.
   *
   * @throws {@link Orders.AuthorizeOrderError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  authorizeOrder(
    request: Orders.AuthorizeOrderRequest,
    options?: RequestOptions,
  ): ApiPromise<OrderAuthorizeResponse, Orders.AuthorizeOrderError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/v2/checkout/orders/{id}/authorize"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
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
          { name: "Idempotency-Key", value: uuid(), schema: s.string() },
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

  /**
   * Capture payment for order
   *
   * @remarks
   * Captures payment for an order. To successfully capture payment for an order, the buyer must
   * first approve the order or a valid payment_source must be provided in the request. A buyer can
   * approve the order upon being redirected to the rel:approve URL that was returned in the HATEOAS
   * links in the create order response. Note: For error handling and troubleshooting, see Orders v2
   * errors.
   *
   * @returns A successful response to an idempotent request returns the HTTP `200 OK` status code
   * with a JSON response body that shows captured payment details.
   *
   * @throws {@link Orders.CaptureOrderError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  captureOrder(
    request: Orders.CaptureOrderRequest,
    options?: RequestOptions,
  ): ApiPromise<Order, Orders.CaptureOrderError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/v2/checkout/orders/{id}/capture"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
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
          { name: "Idempotency-Key", value: uuid(), schema: s.string() },
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

  /**
   * Confirm the Order
   *
   * @remarks
   * Payer confirms their intent to pay for the the Order with the given payment source.
   *
   * @returns A successful request indicates that the payment source was added to the Order. A
   * successful request returns the HTTP `200 OK` status code with a JSON response body that shows
   * order details.
   *
   * @throws {@link Orders.ConfirmOrderError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  confirmOrder(
    request: Orders.ConfirmOrderRequestParams,
    options?: RequestOptions,
  ): ApiPromise<Order, Orders.ConfirmOrderError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/v2/checkout/orders/{id}/confirm-payment-source"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
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
          { name: "Idempotency-Key", value: uuid(), schema: s.string() },
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

  /**
   * Create order
   *
   * @remarks
   * Creates an order. Merchants and partners can add Level 2 and 3 data to payments to reduce risk
   * and payment processing costs. For more information about processing payments, see checkout or
   * multiparty checkout. Note: For error handling and troubleshooting, see Orders v2 errors.
   *
   * @returns A successful response to an idempotent request returns the HTTP `200 OK` status code
   * with a JSON response body that shows order details.
   *
   * @throws {@link Orders.CreateOrderError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  createOrder(
    request: Orders.CreateOrderRequest,
    options?: RequestOptions,
  ): ApiPromise<Order, Orders.CreateOrderError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/v2/checkout/orders"),
        auth: this.#auth.oauth2,
        pathParams: [],
        query: [],
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
          { name: "Idempotency-Key", value: uuid(), schema: s.string() },
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

  /**
   * Add tracking information for an Order.
   *
   * @remarks
   * Adds tracking information for an Order.
   *
   * @returns A successful response to an idempotent request returns the HTTP `200 OK` status code
   * with a JSON response body that shows tracker details.
   *
   * @throws {@link Orders.CreateOrderTrackingError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  createOrderTracking(
    request: Orders.CreateOrderTrackingRequest,
    options?: RequestOptions,
  ): ApiPromise<Order, Orders.CreateOrderTrackingError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/v2/checkout/orders/{id}/track"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [
          {
            name: "PayPal-Auth-Assertion",
            value: request.payPalAuthAssertion,
            schema: s.optional(s.string()),
          },
          { name: "Idempotency-Key", value: uuid(), schema: s.string() },
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

  /**
   * Show order details
   *
   * @remarks
   * Shows details for an order, by ID. Note: For error handling and troubleshooting, see Orders v2
   * errors.
   *
   * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
   * that shows order details.
   *
   * @throws {@link Orders.GetOrderError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  getOrder(
    request: Orders.GetOrderRequest,
    options?: RequestOptions,
  ): ApiPromise<Order, Orders.GetOrderError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/v2/checkout/orders/{id}"),
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

  /**
   * Update order
   *
   * @remarks
   * Updates an order with a `CREATED` or `APPROVED` status. You cannot update an order with the
   * `COMPLETED` status.<br/><br/>To make an update, you must provide a `reference_id`. If you omit
   * this value with an order that contains only one purchase unit, PayPal sets the value to
   * `default` which enables you to use the path:
   * <code>\"/purchase_units/@reference_id=='default'/{attribute-or-object}\"</code>. Merchants and
   * partners can add Level 2 and 3 data to payments to reduce risk and payment processing costs.
   * For more information about processing payments, see <a
   * href="https://developer.paypal.com/docs/checkout/advanced/processing/">checkout</a> or <a
   * href="https://developer.paypal.com/docs/multiparty/checkout/advanced/processing/">multiparty
   * checkout</a>.<blockquote><strong>Note:</strong> For error handling and troubleshooting, see <a
   * href="https://developer.paypal.com/api/rest/reference/orders/v2/errors/#patch-order">Orders v2
   * errors</a>.</blockquote>Patchable attributes or
   * objects:<br/><br/><table><thead><th>Attribute</th><th>Op</th><th>Notes</th></thead><tbody><tr><td><code>intent</code></td><td>replace</td><td></td></tr><tr><td><code>payer</code></td><td>replace,
   * add</td><td>Using replace op for <code>payer</code> will replace the whole <code>payer</code>
   * object with the value sent in
   * request.</td></tr><tr><td><code>purchase_units</code></td><td>replace,
   * add</td><td></td></tr><tr><td><code>purchase_units[].custom_id</code></td><td>replace, add,
   * remove</td><td></td></tr><tr><td><code>purchase_units[].description</code></td><td>replace,
   * add,
   * remove</td><td></td></tr><tr><td><code>purchase_units[].payee.email</code></td><td>replace</td><td></td></tr><tr><td><code>purchase_units[].shipping.name</code></td><td>replace,
   * add</td><td></td></tr><tr><td><code>purchase_units[].shipping.email_address</code></td><td>replace,
   * add</td><td></td></tr><tr><td><code>purchase_units[].shipping.phone_number</code></td><td>replace,
   * add</td><td></td></tr><tr><td><code>purchase_units[].shipping.options</code></td><td>replace,
   * add</td><td></td></tr><tr><td><code>purchase_units[].shipping.address</code></td><td>replace,
   * add</td><td></td></tr><tr><td><code>purchase_units[].shipping.type</code></td><td>replace,
   * add</td><td></td></tr><tr><td><code>purchase_units[].soft_descriptor</code></td><td>replace,
   * remove</td><td></td></tr><tr><td><code>purchase_units[].amount</code></td><td>replace</td><td></td></tr><tr><td><code>purchase_units[].items</code></td><td>replace,
   * add, remove</td><td></td></tr><tr><td><code>purchase_units[].invoice_id</code></td><td>replace,
   * add,
   * remove</td><td></td></tr><tr><td><code>purchase_units[].payment_instruction</code></td><td>replace</td><td></td></tr><tr><td><code>purchase_units[].payment_instruction.disbursement_mode</code></td><td>replace</td><td>By
   * default, <code>disbursement_mode</code> is
   * <code>INSTANT</code>.</td></tr><tr><td><code>purchase_units[].payment_instruction.payee_receivable_fx_rate_id</code></td><td>replace,
   * add,
   * remove</td><td></td></tr><tr><td><code>purchase_units[].payment_instruction.platform_fees</code></td><td>replace,
   * add,
   * remove</td><td></td></tr><tr><td><code>purchase_units[].supplementary_data.airline</code></td><td>replace,
   * add,
   * remove</td><td></td></tr><tr><td><code>purchase_units[].supplementary_data.card</code></td><td>replace,
   * add,
   * remove</td><td></td></tr><tr><td><code>application_context.client_configuration</code></td><td>replace,
   * add</td><td></td></tr></tbody></table>
   *
   * @returns A successful request returns the HTTP `204 No Content` status code with an empty
   * object in the JSON response body.
   *
   * @throws {@link Orders.PatchOrderError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  patchOrder(
    request: Orders.PatchOrderRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Orders.PatchOrderError> {
    return this.#rawClient.execute(
      {
        method: "PATCH",
        urlTemplate: this.#servers.default("/v2/checkout/orders/{id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [
          { name: "PayPal-Mock-Response", value: request.payPalMockResponse, schema: s.optional(s.string()) },
          {
            name: "PayPal-Auth-Assertion",
            value: request.payPalAuthAssertion,
            schema: s.optional(s.string()),
          },
          { name: "Idempotency-Key", value: uuid(), schema: s.string() },
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

  /**
   * Update or cancel tracking information for an order
   *
   * @remarks
   * Updates or cancels the tracking information for a PayPal order, by ID. Updatable attributes or
   * objects: Attribute Op Notes items replace Using replace op for items will replace the entire
   * items object with the value sent in request. notify_payer replace, add status replace Only
   * patching status to CANCELLED is currently supported.
   *
   * @returns A successful request returns the HTTP `204 No Content` status code with an empty
   * object in the JSON response body.
   *
   * @throws {@link Orders.UpdateOrderTrackingError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  updateOrderTracking(
    request: Orders.UpdateOrderTrackingRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Orders.UpdateOrderTrackingError> {
    return this.#rawClient.execute(
      {
        method: "PATCH",
        urlTemplate: this.#servers.default("/v2/checkout/orders/{id}/trackers/{tracker_id}"),
        auth: this.#auth.oauth2,
        pathParams: [
          { name: "id", value: request.id, schema: s.string() },
          { name: "tracker_id", value: request.trackerId, schema: s.string() },
        ],
        query: [],
        headers: [
          {
            name: "PayPal-Auth-Assertion",
            value: request.payPalAuthAssertion,
            schema: s.optional(s.string()),
          },
          { name: "Idempotency-Key", value: uuid(), schema: s.string() },
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
    /** The ID of the order for which to authorize. */
    id: string;
    /**
     * PayPal's REST API uses a request header to invoke negative testing in the sandbox. This
     * header configures the sandbox into a negative testing state for transactions that include the
     * merchant.
     */
    payPalMockResponse?: string;
    /**
     * The server stores keys for 6 hours. The API callers can request the times to up to 72 hours
     * by speaking to their Account Manager. It is mandatory for all single-step create order calls
     * (E.g. Create Order Request with payment source information like Card, PayPal.vault_id,
     * PayPal.billing_agreement_id, etc).
     */
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
    payPalClientMetadataId?: string;
    /**
     * An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For
     * details, see PayPal-Auth-Assertion.
     */
    payPalAuthAssertion?: string;
    body?: OrderAuthorizeRequest;
  };

  export class AuthorizeOrderError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"error", Error>
      | Declared<"error2", Error>
      | Declared<"error3", Error>
      | Declared<"error4", Error>
      | Declared<"error5", Error>
      | Declared<"error6", Error>
      | Declared<"error7", Error>
    >;

    static readonly errors: ErrorDecoders<AuthorizeOrderError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 401, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error5", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error6", decode: { kind: "json", schema: errorSchema } },
      { on: "default", kind: "error7", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type CaptureOrderRequest = {
    /** The ID of the order for which to capture a payment. */
    id: string;
    /**
     * PayPal's REST API uses a request header to invoke negative testing in the sandbox. This
     * header configures the sandbox into a negative testing state for transactions that include the
     * merchant.
     */
    payPalMockResponse?: string;
    /**
     * The server stores keys for 6 hours. The API callers can request the times to up to 72 hours
     * by speaking to their Account Manager. It is mandatory for all single-step create order calls
     * (E.g. Create Order Request with payment source information like Card, PayPal.vault_id,
     * PayPal.billing_agreement_id, etc).
     */
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
    payPalClientMetadataId?: string;
    /**
     * An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For
     * details, see PayPal-Auth-Assertion.
     */
    payPalAuthAssertion?: string;
    body?: OrderCaptureRequest;
  };

  export class CaptureOrderError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"error", Error>
      | Declared<"error2", Error>
      | Declared<"error3", Error>
      | Declared<"error4", Error>
      | Declared<"error5", Error>
      | Declared<"error6", Error>
      | Declared<"error7", Error>
    >;

    static readonly errors: ErrorDecoders<CaptureOrderError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 401, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error5", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error6", decode: { kind: "json", schema: errorSchema } },
      { on: "default", kind: "error7", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type ConfirmOrderRequestParams = {
    /** The ID of the order for which the payer confirms their intent to pay. */
    id: string;
    payPalClientMetadataId?: string;
    /**
     * An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For
     * details, see PayPal-Auth-Assertion.
     */
    payPalAuthAssertion?: string;
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
    body?: ConfirmOrderRequest;
  };

  export class ConfirmOrderError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"error", Error>
      | Declared<"error2", Error>
      | Declared<"error3", Error>
      | Declared<"error4", Error>
      | Declared<"error5", Error>
    >;

    static readonly errors: ErrorDecoders<ConfirmOrderError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: "default", kind: "error5", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type CreateOrderRequest = {
    /**
     * PayPal's REST API uses a request header to invoke negative testing in the sandbox. This
     * header configures the sandbox into a negative testing state for transactions that include the
     * merchant.
     */
    payPalMockResponse?: string;
    /**
     * The server stores keys for 6 hours. The API callers can request the times to up to 72 hours
     * by speaking to their Account Manager. It is mandatory for all single-step create order calls
     * (E.g. Create Order Request with payment source information like Card, PayPal.vault_id,
     * PayPal.billing_agreement_id, etc).
     */
    payPalRequestId?: string;
    payPalPartnerAttributionId?: string;
    payPalClientMetadataId?: string;
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
     * details, see PayPal-Auth-Assertion.
     */
    payPalAuthAssertion?: string;
    body: OrderRequest;
  };

  export class CreateOrderError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"error", Error>
      | Declared<"error2", Error>
      | Declared<"error3", Error>
      | Declared<"error4", Error>
    >;

    static readonly errors: ErrorDecoders<CreateOrderError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 401, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: "default", kind: "error4", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type CreateOrderTrackingRequest = {
    /** The ID of the order that the tracking information is associated with. */
    id: string;
    /**
     * An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For
     * details, see PayPal-Auth-Assertion.
     */
    payPalAuthAssertion?: string;
    body: OrderTrackerRequest;
  };

  export class CreateOrderTrackingError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"error", Error>
      | Declared<"error2", Error>
      | Declared<"error3", Error>
      | Declared<"error4", Error>
      | Declared<"error5", Error>
      | Declared<"error6", Error>
    >;

    static readonly errors: ErrorDecoders<CreateOrderTrackingError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error5", decode: { kind: "json", schema: errorSchema } },
      { on: "default", kind: "error6", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type GetOrderRequest = {
    /** The ID of the order for which to show details. */
    id: string;
    /**
     * A comma-separated list of fields that should be returned for the order. Valid filter field is
     * `payment_source`.
     */
    fields?: string;
    /**
     * PayPal's REST API uses a request header to invoke negative testing in the sandbox. This
     * header configures the sandbox into a negative testing state for transactions that include the
     * merchant.
     */
    payPalMockResponse?: string;
    /**
     * An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For
     * details, see PayPal-Auth-Assertion.
     */
    payPalAuthAssertion?: string;
  };

  export class GetOrderError extends ApiError {
    declare readonly payload: ErrorPayload<
      Declared<"error", Error> | Declared<"error2", Error> | Declared<"error3", Error>
    >;

    static readonly errors: ErrorDecoders<GetOrderError> = [
      { on: 401, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: "default", kind: "error3", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type PatchOrderRequest = {
    /** The ID of the order to update. */
    id: string;
    /**
     * PayPal's REST API uses a request header to invoke negative testing in the sandbox. This
     * header configures the sandbox into a negative testing state for transactions that include the
     * merchant.
     */
    payPalMockResponse?: string;
    /**
     * An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For
     * details, see PayPal-Auth-Assertion.
     */
    payPalAuthAssertion?: string;
    body?: Patch[];
  };

  export class PatchOrderError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"error", Error>
      | Declared<"error2", Error>
      | Declared<"error3", Error>
      | Declared<"error4", Error>
      | Declared<"error5", Error>
    >;

    static readonly errors: ErrorDecoders<PatchOrderError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 401, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: "default", kind: "error5", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type UpdateOrderTrackingRequest = {
    /** The ID of the order that the tracking information is associated with. */
    id: string;
    /** The order tracking ID. */
    trackerId: string;
    /**
     * An API-caller-provided JSON Web Token (JWT) assertion that identifies the merchant. For
     * details, see PayPal-Auth-Assertion.
     */
    payPalAuthAssertion?: string;
    body?: Patch[];
  };

  export class UpdateOrderTrackingError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"error", Error>
      | Declared<"error2", Error>
      | Declared<"error3", Error>
      | Declared<"error4", Error>
      | Declared<"error5", Error>
      | Declared<"error6", Error>
    >;

    static readonly errors: ErrorDecoders<UpdateOrderTrackingError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 403, kind: "error2", decode: { kind: "json", schema: errorSchema } },
      { on: 404, kind: "error3", decode: { kind: "json", schema: errorSchema } },
      { on: 422, kind: "error4", decode: { kind: "json", schema: errorSchema } },
      { on: 500, kind: "error5", decode: { kind: "json", schema: errorSchema } },
      { on: "default", kind: "error6", decode: { kind: "json", schema: errorSchema } },
    ];
  }
}
