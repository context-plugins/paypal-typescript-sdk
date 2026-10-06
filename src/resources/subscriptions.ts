import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type ErrorDecoders, type ErrorPayload } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import { uuid } from "../core/uuid.js";
import * as s from "../core/validation/index.js";
import {
  activateSubscriptionRequestSchema,
  type ActivateSubscriptionRequest,
} from "../models/activate-subscription-request.js";
import { billingPlanSchema, type BillingPlan } from "../models/billing-plan.js";
import {
  cancelSubscriptionRequestSchema,
  type CancelSubscriptionRequest,
} from "../models/cancel-subscription-request.js";
import {
  captureSubscriptionRequestSchema,
  type CaptureSubscriptionRequest,
} from "../models/capture-subscription-request.js";
import {
  createSubscriptionRequestSchema,
  type CreateSubscriptionRequest,
} from "../models/create-subscription-request.js";
import {
  modifySubscriptionRequestSchema,
  type ModifySubscriptionRequest,
} from "../models/modify-subscription-request.js";
import {
  modifySubscriptionResponseSchema,
  type ModifySubscriptionResponse,
} from "../models/modify-subscription-response.js";
import { patchSchema, type Patch } from "../models/patch.js";
import { planCollectionSchema, type PlanCollection } from "../models/plan-collection.js";
import { planRequestSchema, type PlanRequest } from "../models/plan-request.js";
import {
  subscriptionCollectionSchema,
  type SubscriptionCollection,
} from "../models/subscription-collection.js";
import { subscriptionErrorSchema, type SubscriptionError } from "../models/subscription-error.js";
import {
  subscriptionTransactionDetailsSchema,
  type SubscriptionTransactionDetails,
} from "../models/subscription-transaction-details.js";
import { subscriptionSchema, type Subscription } from "../models/subscription.js";
import { suspendSubscriptionSchema, type SuspendSubscription } from "../models/suspend-subscription.js";
import { transactionsListSchema, type TransactionsList } from "../models/transactions-list.js";
import {
  updatePricingSchemesRequestSchema,
  type UpdatePricingSchemesRequest,
} from "../models/update-pricing-schemes-request.js";
import type { Servers } from "../servers.js";

/**
 * Use the `/subscriptions` resource to create, update, retrieve, and cancel subscriptions and their
 * associated plans.
 */
export class Subscriptions {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * Activate plan
   *
   * @remarks
   * Activates a plan, by ID.
   *
   * @returns A successful request returns the HTTP `204 No Content` status code with no JSON
   * response body.
   *
   * @throws {@link Subscriptions.ActivateBillingPlanError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  activateBillingPlan(
    request: Subscriptions.ActivateBillingPlanRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Subscriptions.ActivateBillingPlanError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/v1/billing/plans/{id}/activate"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "empty" },
        errorFactory: Subscriptions.ActivateBillingPlanError,
      },
      options,
    );
  }

  /**
   * Activate subscription
   *
   * @remarks
   * Activates the subscription.
   *
   * @returns A successful request returns the HTTP `204 No Content` status code with no JSON
   * response body.
   *
   * @throws {@link Subscriptions.ActivateSubscriptionError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  activateSubscription(
    request: Subscriptions.ActivateSubscriptionRequestParams,
    options?: RequestOptions,
  ): ApiPromise<undefined, Subscriptions.ActivateSubscriptionError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/v1/billing/subscriptions/{id}/activate"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => activateSubscriptionRequestSchema)),
        },
      },
      {
        success: { kind: "empty" },
        errorFactory: Subscriptions.ActivateSubscriptionError,
      },
      options,
    );
  }

  /**
   * Cancel subscription
   *
   * @remarks
   * Cancels the subscription.
   *
   * @returns A successful request returns the HTTP `204 No Content` status code with no JSON
   * response body.
   *
   * @throws {@link Subscriptions.CancelSubscriptionError} when the API answers with an error status
   * — narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  cancelSubscription(
    request: Subscriptions.CancelSubscriptionRequestParams,
    options?: RequestOptions,
  ): ApiPromise<undefined, Subscriptions.CancelSubscriptionError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/v1/billing/subscriptions/{id}/cancel"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => cancelSubscriptionRequestSchema)),
        },
      },
      {
        success: { kind: "empty" },
        errorFactory: Subscriptions.CancelSubscriptionError,
      },
      options,
    );
  }

  /**
   * Capture authorized payment on subscription
   *
   * @remarks
   * Captures an authorized payment from the subscriber on the subscription.
   *
   * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
   * that shows subscription details.
   *
   * @throws {@link Subscriptions.CaptureSubscriptionError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  captureSubscription(
    request: Subscriptions.CaptureSubscriptionRequestParams,
    options?: RequestOptions,
  ): ApiPromise<SubscriptionTransactionDetails, Subscriptions.CaptureSubscriptionError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/v1/billing/subscriptions/{id}/capture"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [
          { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
          { name: "Idempotency-Key", value: uuid(), schema: s.string() },
        ],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => captureSubscriptionRequestSchema)),
        },
      },
      {
        success: { kind: "json", schema: subscriptionTransactionDetailsSchema },
        errorFactory: Subscriptions.CaptureSubscriptionError,
      },
      options,
    );
  }

  /**
   * Create plan
   *
   * @remarks
   * Creates a plan that defines pricing and billing cycle details for subscriptions.
   *
   * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
   * that shows billing plan details.
   *
   * @throws {@link Subscriptions.CreateBillingPlanError} when the API answers with an error status
   * — narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  createBillingPlan(
    request: Subscriptions.CreateBillingPlanRequest,
    options?: RequestOptions,
  ): ApiPromise<BillingPlan, Subscriptions.CreateBillingPlanError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/v1/billing/plans"),
        auth: this.#auth.oauth2,
        pathParams: [],
        query: [],
        headers: [
          { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
          { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
          { name: "Idempotency-Key", value: uuid(), schema: s.string() },
        ],
        body: { kind: "json", value: request.body, schema: s.optional(s.lazy(() => planRequestSchema)) },
      },
      {
        success: { kind: "json", schema: billingPlanSchema },
        errorFactory: Subscriptions.CreateBillingPlanError,
      },
      options,
    );
  }

  /**
   * Create subscription
   *
   * @remarks
   * Creates a subscription.
   *
   * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
   * that shows subscription details.
   *
   * @throws {@link Subscriptions.CreateSubscriptionError} when the API answers with an error status
   * — narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  createSubscription(
    request: Subscriptions.CreateSubscriptionRequestParams,
    options?: RequestOptions,
  ): ApiPromise<Subscription, Subscriptions.CreateSubscriptionError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/v1/billing/subscriptions"),
        auth: this.#auth.oauth2,
        pathParams: [],
        query: [],
        headers: [
          { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
          { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
          {
            name: "PayPal-Client-Metadata-Id",
            value: request.payPalClientMetadataId,
            schema: s.optional(s.string()),
          },
          { name: "Idempotency-Key", value: uuid(), schema: s.string() },
        ],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => createSubscriptionRequestSchema)),
        },
      },
      {
        success: { kind: "json", schema: subscriptionSchema },
        errorFactory: Subscriptions.CreateSubscriptionError,
      },
      options,
    );
  }

  /**
   * Deactivate plan
   *
   * @remarks
   * Deactivates a plan, by ID.
   *
   * @returns A successful request returns the HTTP `204 No Content` status code with no JSON
   * response body.
   *
   * @throws {@link Subscriptions.DeactivateBillingPlanError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  deactivateBillingPlan(
    request: Subscriptions.DeactivateBillingPlanRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Subscriptions.DeactivateBillingPlanError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/v1/billing/plans/{id}/deactivate"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "empty" },
        errorFactory: Subscriptions.DeactivateBillingPlanError,
      },
      options,
    );
  }

  /**
   * Show plan details
   *
   * @remarks
   * Shows details for a plan, by ID.
   *
   * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
   * that shows plan details.
   *
   * @throws {@link Subscriptions.GetBillingPlanError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  getBillingPlan(
    request: Subscriptions.GetBillingPlanRequest,
    options?: RequestOptions,
  ): ApiPromise<BillingPlan, Subscriptions.GetBillingPlanError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/v1/billing/plans/{id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: billingPlanSchema },
        errorFactory: Subscriptions.GetBillingPlanError,
      },
      options,
    );
  }

  /**
   * Show subscription details
   *
   * @remarks
   * Shows details for a subscription, by ID.
   *
   * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
   * that shows subscription details.
   *
   * @throws {@link Subscriptions.GetSubscriptionError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  getSubscription(
    request: Subscriptions.GetSubscriptionRequest,
    options?: RequestOptions,
  ): ApiPromise<Subscription, Subscriptions.GetSubscriptionError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/v1/billing/subscriptions/{id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [{ name: "fields", value: request.fields, schema: s.optional(s.string()) }],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: subscriptionSchema },
        errorFactory: Subscriptions.GetSubscriptionError,
      },
      options,
    );
  }

  /**
   * List plans
   *
   * @remarks
   * Lists billing plans.
   *
   * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
   * that lists billing plans.
   *
   * @throws {@link Subscriptions.ListBillingPlansError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  listBillingPlans(
    request: Subscriptions.ListBillingPlansRequest,
    options?: RequestOptions,
  ): ApiPromise<PlanCollection, Subscriptions.ListBillingPlansError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/v1/billing/plans"),
        auth: this.#auth.oauth2,
        pathParams: [],
        query: [
          { name: "product_id", value: request.productId, schema: s.optional(s.string()) },
          { name: "page_size", value: request.pageSize, schema: s.defaulted(s.int(), 10) },
          { name: "page", value: request.page, schema: s.defaulted(s.int(), 1) },
          { name: "total_required", value: request.totalRequired, schema: s.defaulted(s.boolean(), false) },
        ],
        headers: [
          { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
        ],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: planCollectionSchema },
        errorFactory: Subscriptions.ListBillingPlansError,
      },
      options,
    );
  }

  /**
   * List transactions for subscription
   *
   * @remarks
   * Lists transactions for a subscription.
   *
   * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
   * that shows subscription details.
   *
   * @throws {@link Subscriptions.ListSubscriptionTransactionsError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  listSubscriptionTransactions(
    request: Subscriptions.ListSubscriptionTransactionsRequest,
    options?: RequestOptions,
  ): ApiPromise<TransactionsList, Subscriptions.ListSubscriptionTransactionsError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/v1/billing/subscriptions/{id}/transactions"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [
          { name: "start_time", value: request.startTime, schema: s.string() },
          { name: "end_time", value: request.endTime, schema: s.string() },
        ],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: transactionsListSchema },
        errorFactory: Subscriptions.ListSubscriptionTransactionsError,
      },
      options,
    );
  }

  /**
   * List subscriptions
   *
   * @remarks
   * List all subscriptions for merchant account.
   *
   * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
   * that lists the subscriptions.
   *
   * @throws {@link Subscriptions.ListSubscriptionsError} when the API answers with an error status
   * — narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  listSubscriptions(
    request: Subscriptions.ListSubscriptionsRequest,
    options?: RequestOptions,
  ): ApiPromise<SubscriptionCollection, Subscriptions.ListSubscriptionsError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/v1/billing/subscriptions"),
        auth: this.#auth.oauth2,
        pathParams: [],
        query: [
          { name: "plan_ids", value: request.planIds, schema: s.optional(s.string()) },
          { name: "statuses", value: request.statuses, schema: s.optional(s.string()) },
          { name: "created_after", value: request.createdAfter, schema: s.optional(s.string()) },
          { name: "created_before", value: request.createdBefore, schema: s.optional(s.string()) },
          {
            name: "status_updated_before",
            value: request.statusUpdatedBefore,
            schema: s.optional(s.string()),
          },
          { name: "status_updated_after", value: request.statusUpdatedAfter, schema: s.optional(s.string()) },
          { name: "filter", value: request.filter, schema: s.optional(s.string()) },
          { name: "page_size", value: request.pageSize, schema: s.defaulted(s.int(), 10) },
          { name: "page", value: request.page, schema: s.defaulted(s.int(), 1) },
          { name: "customer_ids", value: request.customerIds, schema: s.optional(s.array(s.string())) },
        ],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: subscriptionCollectionSchema },
        errorFactory: Subscriptions.ListSubscriptionsError,
      },
      options,
    );
  }

  /**
   * Update plan
   *
   * @remarks
   * Updates a plan with the `CREATED` or `ACTIVE` status. For an `INACTIVE` plan, you can make only
   * status updates. You can patch these attributes and objects: Attribute or object Operations
   * description replace payment_preferences.auto_bill_outstanding replace taxes.percentage replace
   * payment_preferences.payment_failure_threshold replace payment_preferences.setup_fee replace
   * payment_preferences.setup_fee_failure_action replace name replace
   *
   * @returns A successful request returns the HTTP `204 No Content` status code with no JSON
   * response body.
   *
   * @throws {@link Subscriptions.PatchBillingPlanError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  patchBillingPlan(
    request: Subscriptions.PatchBillingPlanRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Subscriptions.PatchBillingPlanError> {
    return this.#rawClient.execute(
      {
        method: "PATCH",
        urlTemplate: this.#servers.default("/v1/billing/plans/{id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "json", value: request.body, schema: s.optional(s.array(s.lazy(() => patchSchema))) },
      },
      {
        success: { kind: "empty" },
        errorFactory: Subscriptions.PatchBillingPlanError,
      },
      options,
    );
  }

  /**
   * Update subscription
   *
   * @remarks
   * Updates a subscription which could be in ACTIVE or SUSPENDED status. You can override plan
   * level default attributes by providing customised values for plan path in the patch request. You
   * cannot update attributes that have already completed (Example - trial cycles can’t be updated
   * if completed). Once overridden, changes to plan resource will not impact subscription. Any
   * price update will not impact billing cycles within next 10 days (Applicable only for
   * subscriptions funded by PayPal account). Following are the fields eligible for patch. Attribute
   * or object Operations billing_info.outstanding_balance replace custom_id add,replace
   * plan.billing_cycles[@sequence==n]. pricing_scheme.fixed_price add,replace
   * plan.billing_cycles[@sequence==n]. pricing_scheme.tiers replace
   * plan.billing_cycles[@sequence==n]. total_cycles replace plan.payment_preferences.
   * auto_bill_outstanding replace plan.payment_preferences. payment_failure_threshold replace
   * plan.taxes.inclusive add,replace plan.taxes.percentage add,replace shipping_amount add,replace
   * start_time replace subscriber.shipping_address add,replace subscriber.payment_source (for
   * subscriptions funded by card payments) replace
   *
   * @returns A successful request returns the HTTP `204 No Content` status code with no JSON
   * response body.
   *
   * @throws {@link Subscriptions.PatchSubscriptionError} when the API answers with an error status
   * — narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  patchSubscription(
    request: Subscriptions.PatchSubscriptionRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Subscriptions.PatchSubscriptionError> {
    return this.#rawClient.execute(
      {
        method: "PATCH",
        urlTemplate: this.#servers.default("/v1/billing/subscriptions/{id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "json", value: request.body, schema: s.optional(s.array(s.lazy(() => patchSchema))) },
      },
      {
        success: { kind: "empty" },
        errorFactory: Subscriptions.PatchSubscriptionError,
      },
      options,
    );
  }

  /**
   * Revise plan or quantity of subscription
   *
   * @remarks
   * Updates the quantity of the product or service in a subscription. You can also use this method
   * to switch the plan and update the `shipping_amount`, `shipping_address` values for the
   * subscription. This type of update requires the buyer's consent.
   *
   * @returns A successful request returns the HTTP `200 OK` status code and a JSON response body
   * that shows subscription details.
   *
   * @throws {@link Subscriptions.ReviseSubscriptionError} when the API answers with an error status
   * — narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  reviseSubscription(
    request: Subscriptions.ReviseSubscriptionRequest,
    options?: RequestOptions,
  ): ApiPromise<ModifySubscriptionResponse, Subscriptions.ReviseSubscriptionError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/v1/billing/subscriptions/{id}/revise"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => modifySubscriptionRequestSchema)),
        },
      },
      {
        success: { kind: "json", schema: modifySubscriptionResponseSchema },
        errorFactory: Subscriptions.ReviseSubscriptionError,
      },
      options,
    );
  }

  /**
   * Suspend subscription
   *
   * @remarks
   * Suspends the subscription.
   *
   * @returns A successful request returns the HTTP `204 No Content` status code with no JSON
   * response body.
   *
   * @throws {@link Subscriptions.SuspendSubscriptionError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  suspendSubscription(
    request: Subscriptions.SuspendSubscriptionRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Subscriptions.SuspendSubscriptionError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/v1/billing/subscriptions/{id}/suspend"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => suspendSubscriptionSchema)),
        },
      },
      {
        success: { kind: "empty" },
        errorFactory: Subscriptions.SuspendSubscriptionError,
      },
      options,
    );
  }

  /**
   * Update pricing
   *
   * @remarks
   * Updates pricing for a plan. For example, you can update a regular billing cycle from $5 per
   * month to $7 per month.
   *
   * @returns A successful request returns the HTTP `204 No Content` status code with no JSON
   * response body.
   *
   * @throws {@link Subscriptions.UpdateBillingPlanPricingSchemesError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link PaypalError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  updateBillingPlanPricingSchemes(
    request: Subscriptions.UpdateBillingPlanPricingSchemesRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Subscriptions.UpdateBillingPlanPricingSchemesError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/v1/billing/plans/{id}/update-pricing-schemes"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => updatePricingSchemesRequestSchema)),
        },
      },
      {
        success: { kind: "empty" },
        errorFactory: Subscriptions.UpdateBillingPlanPricingSchemesError,
      },
      options,
    );
  }
}

export namespace Subscriptions {
  export type ActivateBillingPlanRequest = {
    /** The ID of the plan. */
    id: string;
  };

  export class ActivateBillingPlanError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"subscriptionError", SubscriptionError>
      | Declared<"subscriptionError2", SubscriptionError>
      | Declared<"subscriptionError3", SubscriptionError>
      | Declared<"subscriptionError4", SubscriptionError>
      | Declared<"subscriptionError5", SubscriptionError>
      | Declared<"subscriptionError6", SubscriptionError>
    >;

    static readonly errors: ErrorDecoders<ActivateBillingPlanError> = [
      { on: 401, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: "default",
        kind: "subscriptionError6",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type ActivateSubscriptionRequestParams = {
    /** The ID of the subscription. */
    id: string;
    body?: ActivateSubscriptionRequest;
  };

  export class ActivateSubscriptionError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"subscriptionError", SubscriptionError>
      | Declared<"subscriptionError2", SubscriptionError>
      | Declared<"subscriptionError3", SubscriptionError>
      | Declared<"subscriptionError4", SubscriptionError>
      | Declared<"subscriptionError5", SubscriptionError>
      | Declared<"subscriptionError6", SubscriptionError>
      | Declared<"subscriptionError7", SubscriptionError>
    >;

    static readonly errors: ErrorDecoders<ActivateSubscriptionError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError6", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: "default",
        kind: "subscriptionError7",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type CancelSubscriptionRequestParams = {
    /** The ID of the subscription. */
    id: string;
    body?: CancelSubscriptionRequest;
  };

  export class CancelSubscriptionError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"subscriptionError", SubscriptionError>
      | Declared<"subscriptionError2", SubscriptionError>
      | Declared<"subscriptionError3", SubscriptionError>
      | Declared<"subscriptionError4", SubscriptionError>
      | Declared<"subscriptionError5", SubscriptionError>
      | Declared<"subscriptionError6", SubscriptionError>
      | Declared<"subscriptionError7", SubscriptionError>
    >;

    static readonly errors: ErrorDecoders<CancelSubscriptionError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError6", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: "default",
        kind: "subscriptionError7",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type CaptureSubscriptionRequestParams = {
    /** The ID of the subscription. */
    id: string;
    /** The server stores keys for 72 hours. */
    payPalRequestId?: string;
    body?: CaptureSubscriptionRequest;
  };

  export class CaptureSubscriptionError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"subscriptionError", SubscriptionError>
      | Declared<"subscriptionError2", SubscriptionError>
      | Declared<"subscriptionError3", SubscriptionError>
      | Declared<"subscriptionError4", SubscriptionError>
      | Declared<"subscriptionError5", SubscriptionError>
      | Declared<"subscriptionError6", SubscriptionError>
      | Declared<"subscriptionError7", SubscriptionError>
    >;

    static readonly errors: ErrorDecoders<CaptureSubscriptionError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError6", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: "default",
        kind: "subscriptionError7",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type CreateBillingPlanRequest = {
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
    /** The server stores keys for 72 hours. */
    payPalRequestId?: string;
    body?: PlanRequest;
  };

  export class CreateBillingPlanError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"subscriptionError", SubscriptionError>
      | Declared<"subscriptionError2", SubscriptionError>
      | Declared<"subscriptionError3", SubscriptionError>
      | Declared<"subscriptionError4", SubscriptionError>
      | Declared<"subscriptionError5", SubscriptionError>
      | Declared<"subscriptionError6", SubscriptionError>
    >;

    static readonly errors: ErrorDecoders<CreateBillingPlanError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: "default",
        kind: "subscriptionError6",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type CreateSubscriptionRequestParams = {
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
    /** The server stores keys for 72 hours. */
    payPalRequestId?: string;
    /**
     * The PayPal Client Metadata Id(CMID) is used to provide device-specific information to
     * PayPal's risk engine. This is crucial for transactions that require device-specific risk
     * assessments. Merchants typically use the Paypal SDK that automatically submits the CMID or
     * they use tools like Fraudnet JS for web or Magnes JS for mobile to generate the CMID on the
     * frontend and then pass it to the API as part of the request headers.
     */
    payPalClientMetadataId?: string;
    body?: CreateSubscriptionRequest;
  };

  export class CreateSubscriptionError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"subscriptionError", SubscriptionError>
      | Declared<"subscriptionError2", SubscriptionError>
      | Declared<"subscriptionError3", SubscriptionError>
      | Declared<"subscriptionError4", SubscriptionError>
      | Declared<"subscriptionError5", SubscriptionError>
      | Declared<"subscriptionError6", SubscriptionError>
    >;

    static readonly errors: ErrorDecoders<CreateSubscriptionError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: "default",
        kind: "subscriptionError6",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type DeactivateBillingPlanRequest = {
    /** The ID of the plan. */
    id: string;
  };

  export class DeactivateBillingPlanError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"subscriptionError", SubscriptionError>
      | Declared<"subscriptionError2", SubscriptionError>
      | Declared<"subscriptionError3", SubscriptionError>
      | Declared<"subscriptionError4", SubscriptionError>
      | Declared<"subscriptionError5", SubscriptionError>
      | Declared<"subscriptionError6", SubscriptionError>
    >;

    static readonly errors: ErrorDecoders<DeactivateBillingPlanError> = [
      { on: 401, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: "default",
        kind: "subscriptionError6",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type GetBillingPlanRequest = {
    /** The ID of the plan. */
    id: string;
  };

  export class GetBillingPlanError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"subscriptionError", SubscriptionError>
      | Declared<"subscriptionError2", SubscriptionError>
      | Declared<"subscriptionError3", SubscriptionError>
      | Declared<"subscriptionError4", SubscriptionError>
      | Declared<"subscriptionError5", SubscriptionError>
    >;

    static readonly errors: ErrorDecoders<GetBillingPlanError> = [
      { on: 401, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: "default",
        kind: "subscriptionError5",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type GetSubscriptionRequest = {
    /** The ID of the subscription. */
    id: string;
    /**
     * List of fields that are to be returned in the response. Possible value for fields are
     * last_failed_payment and plan.
     */
    fields?: string;
  };

  export class GetSubscriptionError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"subscriptionError", SubscriptionError>
      | Declared<"subscriptionError2", SubscriptionError>
      | Declared<"subscriptionError3", SubscriptionError>
      | Declared<"subscriptionError4", SubscriptionError>
      | Declared<"subscriptionError5", SubscriptionError>
    >;

    static readonly errors: ErrorDecoders<GetSubscriptionError> = [
      { on: 401, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: "default",
        kind: "subscriptionError5",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type ListBillingPlansRequest = {
    /** Filters the response by a Product ID. */
    productId?: string;
    /** The number of items to return in the response. @default 10 */
    pageSize?: number;
    /**
     * A non-zero integer which is the start index of the entire list of items to return in the
     * response. The combination of `page=1` and `page_size=20` returns the first 20 items. The
     * combination of `page=2` and `page_size=20` returns the next 20 items.
     *
     * @default 1
     */
    page?: number;
    /** Indicates whether to show the total count in the response. @default false */
    totalRequired?: boolean;
    /**
     * The preferred server response upon successful completion of the request. Value is:
     * return=minimal. The server returns a minimal response to optimize communication between the
     * API caller and the server. A minimal response includes the id, name, description and HATEOAS
     * links. return=representation. The server returns a complete resource representation,
     * including the current state of the resource.
     *
     * @default "return=minimal"
     */
    prefer?: string;
  };

  export class ListBillingPlansError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"subscriptionError", SubscriptionError>
      | Declared<"subscriptionError2", SubscriptionError>
      | Declared<"subscriptionError3", SubscriptionError>
      | Declared<"subscriptionError4", SubscriptionError>
      | Declared<"subscriptionError5", SubscriptionError>
      | Declared<"subscriptionError6", SubscriptionError>
    >;

    static readonly errors: ErrorDecoders<ListBillingPlansError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: "default",
        kind: "subscriptionError6",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type ListSubscriptionTransactionsRequest = {
    /** The ID of the subscription. */
    id: string;
    /** The start time of the range of transactions to list. */
    startTime: string;
    /** The end time of the range of transactions to list. */
    endTime: string;
  };

  export class ListSubscriptionTransactionsError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"subscriptionError", SubscriptionError>
      | Declared<"subscriptionError2", SubscriptionError>
      | Declared<"subscriptionError3", SubscriptionError>
      | Declared<"subscriptionError4", SubscriptionError>
      | Declared<"subscriptionError5", SubscriptionError>
      | Declared<"subscriptionError6", SubscriptionError>
    >;

    static readonly errors: ErrorDecoders<ListSubscriptionTransactionsError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: "default",
        kind: "subscriptionError6",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type ListSubscriptionsRequest = {
    /**
     * Filters the response by list of plan IDs. Filter supports upto 70 plan IDs. URLs should not
     * exceed a length of 2000 characters.
     */
    planIds?: string;
    /** Filters the response by list of subscription statuses. */
    statuses?: string;
    /** Filters the response by subscription creation start time for a range of subscriptions. */
    createdAfter?: string;
    /** Filters the response by subscription creation end time for a range of subscriptions. */
    createdBefore?: string;
    /** Filters the response by status update start time for a range of subscriptions. */
    statusUpdatedBefore?: string;
    /** Filters the response by status update end time for a range of subscriptions. */
    statusUpdatedAfter?: string;
    /**
     * Filter the response using complex expressions that could use comparison operators like ge,
     * gt, le, lt and logical operators such as 'and' and 'or'.
     */
    filter?: string;
    /** The number of items to return in the response. @default 10 */
    pageSize?: number;
    /**
     * A non-zero integer which is the start index of the entire list of items to return in the
     * response. The combination of `page=1` and `page_size=20` returns the first 20 items. The
     * combination of `page=2` and `page_size=20` returns the next 20 items.
     *
     * @default 1
     */
    page?: number;
    /** Filters the response by comma separated vault customer IDs (FSS subscriptions only). */
    customerIds?: string[];
  };

  export class ListSubscriptionsError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"subscriptionError", SubscriptionError>
      | Declared<"subscriptionError2", SubscriptionError>
      | Declared<"subscriptionError3", SubscriptionError>
      | Declared<"subscriptionError4", SubscriptionError>
      | Declared<"subscriptionError5", SubscriptionError>
    >;

    static readonly errors: ErrorDecoders<ListSubscriptionsError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: "default",
        kind: "subscriptionError5",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type PatchBillingPlanRequest = {
    /** The ID of the plan. */
    id: string;
    body?: Patch[];
  };

  export class PatchBillingPlanError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"subscriptionError", SubscriptionError>
      | Declared<"subscriptionError2", SubscriptionError>
      | Declared<"subscriptionError3", SubscriptionError>
      | Declared<"subscriptionError4", SubscriptionError>
      | Declared<"subscriptionError5", SubscriptionError>
      | Declared<"subscriptionError6", SubscriptionError>
      | Declared<"subscriptionError7", SubscriptionError>
    >;

    static readonly errors: ErrorDecoders<PatchBillingPlanError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError6", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: "default",
        kind: "subscriptionError7",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type PatchSubscriptionRequest = {
    /** The ID for the subscription. */
    id: string;
    body?: Patch[];
  };

  export class PatchSubscriptionError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"subscriptionError", SubscriptionError>
      | Declared<"subscriptionError2", SubscriptionError>
      | Declared<"subscriptionError3", SubscriptionError>
      | Declared<"subscriptionError4", SubscriptionError>
      | Declared<"subscriptionError5", SubscriptionError>
      | Declared<"subscriptionError6", SubscriptionError>
      | Declared<"subscriptionError7", SubscriptionError>
    >;

    static readonly errors: ErrorDecoders<PatchSubscriptionError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError6", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: "default",
        kind: "subscriptionError7",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type ReviseSubscriptionRequest = {
    /** The ID of the subscription. */
    id: string;
    body?: ModifySubscriptionRequest;
  };

  export class ReviseSubscriptionError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"subscriptionError", SubscriptionError>
      | Declared<"subscriptionError2", SubscriptionError>
      | Declared<"subscriptionError3", SubscriptionError>
      | Declared<"subscriptionError4", SubscriptionError>
      | Declared<"subscriptionError5", SubscriptionError>
      | Declared<"subscriptionError6", SubscriptionError>
      | Declared<"subscriptionError7", SubscriptionError>
    >;

    static readonly errors: ErrorDecoders<ReviseSubscriptionError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError6", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: "default",
        kind: "subscriptionError7",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type SuspendSubscriptionRequest = {
    /** The ID of the subscription. */
    id: string;
    body?: SuspendSubscription;
  };

  export class SuspendSubscriptionError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"subscriptionError", SubscriptionError>
      | Declared<"subscriptionError2", SubscriptionError>
      | Declared<"subscriptionError3", SubscriptionError>
      | Declared<"subscriptionError4", SubscriptionError>
      | Declared<"subscriptionError5", SubscriptionError>
      | Declared<"subscriptionError6", SubscriptionError>
      | Declared<"subscriptionError7", SubscriptionError>
    >;

    static readonly errors: ErrorDecoders<SuspendSubscriptionError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError6", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: "default",
        kind: "subscriptionError7",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type UpdateBillingPlanPricingSchemesRequest = {
    /** The ID for the plan. */
    id: string;
    body?: UpdatePricingSchemesRequest;
  };

  export class UpdateBillingPlanPricingSchemesError extends ApiError {
    declare readonly payload: ErrorPayload<
      | Declared<"subscriptionError", SubscriptionError>
      | Declared<"subscriptionError2", SubscriptionError>
      | Declared<"subscriptionError3", SubscriptionError>
      | Declared<"subscriptionError4", SubscriptionError>
      | Declared<"subscriptionError5", SubscriptionError>
      | Declared<"subscriptionError6", SubscriptionError>
      | Declared<"subscriptionError7", SubscriptionError>
    >;

    static readonly errors: ErrorDecoders<UpdateBillingPlanPricingSchemesError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError6", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: "default",
        kind: "subscriptionError7",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }
}
