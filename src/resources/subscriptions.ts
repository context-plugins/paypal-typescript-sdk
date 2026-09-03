import type { AuthSchemes } from "../auth-schemes.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import { ResponseError, type Declared, type ErrorDecoders } from "../core/response-error.js";
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

export class Subscriptions {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  activateBillingPlan(
    request: Subscriptions.ActivateBillingPlanRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Subscriptions.ActivateBillingPlanError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v1/billing/plans/{id}/activate"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "empty" },
        errorFactory: Subscriptions.ActivateBillingPlanError,
      },
      options,
    );
  }

  activateSubscription(
    request: Subscriptions.ActivateSubscriptionRequestParams,
    options?: RequestOptions,
  ): ApiPromise<undefined, Subscriptions.ActivateSubscriptionError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v1/billing/subscriptions/{id}/activate"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
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

  cancelSubscription(
    request: Subscriptions.CancelSubscriptionRequestParams,
    options?: RequestOptions,
  ): ApiPromise<undefined, Subscriptions.CancelSubscriptionError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v1/billing/subscriptions/{id}/cancel"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
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

  captureSubscription(
    request: Subscriptions.CaptureSubscriptionRequestParams,
    options?: RequestOptions,
  ): ApiPromise<SubscriptionTransactionDetails, Subscriptions.CaptureSubscriptionError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v1/billing/subscriptions/{id}/capture"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        headers: [
          { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
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

  createBillingPlan(
    request: Subscriptions.CreateBillingPlanRequest,
    options?: RequestOptions,
  ): ApiPromise<BillingPlan, Subscriptions.CreateBillingPlanError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v1/billing/plans"),
        auth: this.#auth.oauth2,
        headers: [
          { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
          { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
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

  createSubscription(
    request: Subscriptions.CreateSubscriptionRequestParams,
    options?: RequestOptions,
  ): ApiPromise<Subscription, Subscriptions.CreateSubscriptionError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v1/billing/subscriptions"),
        auth: this.#auth.oauth2,
        headers: [
          { name: "Prefer", value: request.prefer, schema: s.defaulted(s.string(), "return=minimal") },
          { name: "PayPal-Request-Id", value: request.payPalRequestId, schema: s.optional(s.string()) },
          {
            name: "PayPal-Client-Metadata-Id",
            value: request.payPalClientMetadataId,
            schema: s.optional(s.string()),
          },
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

  deactivateBillingPlan(
    request: Subscriptions.DeactivateBillingPlanRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Subscriptions.DeactivateBillingPlanError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v1/billing/plans/{id}/deactivate"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "empty" },
        errorFactory: Subscriptions.DeactivateBillingPlanError,
      },
      options,
    );
  }

  getBillingPlan(
    request: Subscriptions.GetBillingPlanRequest,
    options?: RequestOptions,
  ): ApiPromise<BillingPlan, Subscriptions.GetBillingPlanError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/v1/billing/plans/{id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: billingPlanSchema },
        errorFactory: Subscriptions.GetBillingPlanError,
      },
      options,
    );
  }

  getSubscription(
    request: Subscriptions.GetSubscriptionRequest,
    options?: RequestOptions,
  ): ApiPromise<Subscription, Subscriptions.GetSubscriptionError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/v1/billing/subscriptions/{id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [{ name: "fields", value: request.fields, schema: s.optional(s.string()) }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: subscriptionSchema },
        errorFactory: Subscriptions.GetSubscriptionError,
      },
      options,
    );
  }

  listBillingPlans(
    request: Subscriptions.ListBillingPlansRequest,
    options?: RequestOptions,
  ): ApiPromise<PlanCollection, Subscriptions.ListBillingPlansError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/v1/billing/plans"),
        auth: this.#auth.oauth2,
        query: [
          { name: "product_id", value: request.productId, schema: s.optional(s.string()) },
          { name: "page_size", value: request.pageSize, schema: s.defaulted(s.number(), 10) },
          { name: "page", value: request.page, schema: s.defaulted(s.number(), 1) },
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

  listSubscriptionTransactions(
    request: Subscriptions.ListSubscriptionTransactionsRequest,
    options?: RequestOptions,
  ): ApiPromise<TransactionsList, Subscriptions.ListSubscriptionTransactionsError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/v1/billing/subscriptions/{id}/transactions"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [
          { name: "start_time", value: request.startTime, schema: s.string() },
          { name: "end_time", value: request.endTime, schema: s.string() },
        ],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: transactionsListSchema },
        errorFactory: Subscriptions.ListSubscriptionTransactionsError,
      },
      options,
    );
  }

  listSubscriptions(
    request: Subscriptions.ListSubscriptionsRequest,
    options?: RequestOptions,
  ): ApiPromise<SubscriptionCollection, Subscriptions.ListSubscriptionsError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/v1/billing/subscriptions"),
        auth: this.#auth.oauth2,
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
          { name: "page_size", value: request.pageSize, schema: s.defaulted(s.number(), 10) },
          { name: "page", value: request.page, schema: s.defaulted(s.number(), 1) },
          { name: "customer_ids", value: request.customerIds, schema: s.optional(s.array(s.string())) },
        ],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: subscriptionCollectionSchema },
        errorFactory: Subscriptions.ListSubscriptionsError,
      },
      options,
    );
  }

  patchBillingPlan(
    request: Subscriptions.PatchBillingPlanRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Subscriptions.PatchBillingPlanError> {
    return this.#rawClient.execute(
      {
        method: "PATCH",
        url: this.#servers.default("/v1/billing/plans/{id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        body: { kind: "json", value: request.body, schema: s.optional(s.array(s.lazy(() => patchSchema))) },
      },
      {
        success: { kind: "empty" },
        errorFactory: Subscriptions.PatchBillingPlanError,
      },
      options,
    );
  }

  patchSubscription(
    request: Subscriptions.PatchSubscriptionRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Subscriptions.PatchSubscriptionError> {
    return this.#rawClient.execute(
      {
        method: "PATCH",
        url: this.#servers.default("/v1/billing/subscriptions/{id}"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        body: { kind: "json", value: request.body, schema: s.optional(s.array(s.lazy(() => patchSchema))) },
      },
      {
        success: { kind: "empty" },
        errorFactory: Subscriptions.PatchSubscriptionError,
      },
      options,
    );
  }

  reviseSubscription(
    request: Subscriptions.ReviseSubscriptionRequest,
    options?: RequestOptions,
  ): ApiPromise<ModifySubscriptionResponse, Subscriptions.ReviseSubscriptionError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v1/billing/subscriptions/{id}/revise"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
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

  suspendSubscription(
    request: Subscriptions.SuspendSubscriptionRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Subscriptions.SuspendSubscriptionError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v1/billing/subscriptions/{id}/suspend"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
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

  updateBillingPlanPricingSchemes(
    request: Subscriptions.UpdateBillingPlanPricingSchemesRequest,
    options?: RequestOptions,
  ): ApiPromise<undefined, Subscriptions.UpdateBillingPlanPricingSchemesError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v1/billing/plans/{id}/update-pricing-schemes"),
        auth: this.#auth.oauth2,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
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
    id: string;
  };

  export class ActivateBillingPlanError extends ResponseError<
    | Declared<"subscriptionError", SubscriptionError>
    | Declared<"subscriptionError2", SubscriptionError>
    | Declared<"subscriptionError3", SubscriptionError>
    | Declared<"subscriptionError4", SubscriptionError>
    | Declared<"subscriptionError5", SubscriptionError>
    | Declared<"subscriptionError6", SubscriptionError>
  > {
    static readonly errors: ErrorDecoders<ActivateBillingPlanError> = [
      { on: 401, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: [400, 599],
        kind: "subscriptionError6",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type ActivateSubscriptionRequestParams = {
    id: string;
    body?: ActivateSubscriptionRequest;
  };

  export class ActivateSubscriptionError extends ResponseError<
    | Declared<"subscriptionError", SubscriptionError>
    | Declared<"subscriptionError2", SubscriptionError>
    | Declared<"subscriptionError3", SubscriptionError>
    | Declared<"subscriptionError4", SubscriptionError>
    | Declared<"subscriptionError5", SubscriptionError>
    | Declared<"subscriptionError6", SubscriptionError>
    | Declared<"subscriptionError7", SubscriptionError>
  > {
    static readonly errors: ErrorDecoders<ActivateSubscriptionError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError6", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: [400, 599],
        kind: "subscriptionError7",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type CancelSubscriptionRequestParams = {
    id: string;
    body?: CancelSubscriptionRequest;
  };

  export class CancelSubscriptionError extends ResponseError<
    | Declared<"subscriptionError", SubscriptionError>
    | Declared<"subscriptionError2", SubscriptionError>
    | Declared<"subscriptionError3", SubscriptionError>
    | Declared<"subscriptionError4", SubscriptionError>
    | Declared<"subscriptionError5", SubscriptionError>
    | Declared<"subscriptionError6", SubscriptionError>
    | Declared<"subscriptionError7", SubscriptionError>
  > {
    static readonly errors: ErrorDecoders<CancelSubscriptionError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError6", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: [400, 599],
        kind: "subscriptionError7",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type CaptureSubscriptionRequestParams = {
    id: string;
    payPalRequestId?: string;
    body?: CaptureSubscriptionRequest;
  };

  export class CaptureSubscriptionError extends ResponseError<
    | Declared<"subscriptionError", SubscriptionError>
    | Declared<"subscriptionError2", SubscriptionError>
    | Declared<"subscriptionError3", SubscriptionError>
    | Declared<"subscriptionError4", SubscriptionError>
    | Declared<"subscriptionError5", SubscriptionError>
    | Declared<"subscriptionError6", SubscriptionError>
    | Declared<"subscriptionError7", SubscriptionError>
  > {
    static readonly errors: ErrorDecoders<CaptureSubscriptionError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError6", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: [400, 599],
        kind: "subscriptionError7",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type CreateBillingPlanRequest = {
    prefer?: string;
    payPalRequestId?: string;
    body?: PlanRequest;
  };

  export class CreateBillingPlanError extends ResponseError<
    | Declared<"subscriptionError", SubscriptionError>
    | Declared<"subscriptionError2", SubscriptionError>
    | Declared<"subscriptionError3", SubscriptionError>
    | Declared<"subscriptionError4", SubscriptionError>
    | Declared<"subscriptionError5", SubscriptionError>
    | Declared<"subscriptionError6", SubscriptionError>
  > {
    static readonly errors: ErrorDecoders<CreateBillingPlanError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: [400, 599],
        kind: "subscriptionError6",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type CreateSubscriptionRequestParams = {
    prefer?: string;
    payPalRequestId?: string;
    payPalClientMetadataId?: string;
    body?: CreateSubscriptionRequest;
  };

  export class CreateSubscriptionError extends ResponseError<
    | Declared<"subscriptionError", SubscriptionError>
    | Declared<"subscriptionError2", SubscriptionError>
    | Declared<"subscriptionError3", SubscriptionError>
    | Declared<"subscriptionError4", SubscriptionError>
    | Declared<"subscriptionError5", SubscriptionError>
    | Declared<"subscriptionError6", SubscriptionError>
  > {
    static readonly errors: ErrorDecoders<CreateSubscriptionError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: [400, 599],
        kind: "subscriptionError6",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type DeactivateBillingPlanRequest = {
    id: string;
  };

  export class DeactivateBillingPlanError extends ResponseError<
    | Declared<"subscriptionError", SubscriptionError>
    | Declared<"subscriptionError2", SubscriptionError>
    | Declared<"subscriptionError3", SubscriptionError>
    | Declared<"subscriptionError4", SubscriptionError>
    | Declared<"subscriptionError5", SubscriptionError>
    | Declared<"subscriptionError6", SubscriptionError>
  > {
    static readonly errors: ErrorDecoders<DeactivateBillingPlanError> = [
      { on: 401, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: [400, 599],
        kind: "subscriptionError6",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type GetBillingPlanRequest = {
    id: string;
  };

  export class GetBillingPlanError extends ResponseError<
    | Declared<"subscriptionError", SubscriptionError>
    | Declared<"subscriptionError2", SubscriptionError>
    | Declared<"subscriptionError3", SubscriptionError>
    | Declared<"subscriptionError4", SubscriptionError>
    | Declared<"subscriptionError5", SubscriptionError>
  > {
    static readonly errors: ErrorDecoders<GetBillingPlanError> = [
      { on: 401, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: [400, 599],
        kind: "subscriptionError5",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type GetSubscriptionRequest = {
    id: string;
    fields?: string;
  };

  export class GetSubscriptionError extends ResponseError<
    | Declared<"subscriptionError", SubscriptionError>
    | Declared<"subscriptionError2", SubscriptionError>
    | Declared<"subscriptionError3", SubscriptionError>
    | Declared<"subscriptionError4", SubscriptionError>
    | Declared<"subscriptionError5", SubscriptionError>
  > {
    static readonly errors: ErrorDecoders<GetSubscriptionError> = [
      { on: 401, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: [400, 599],
        kind: "subscriptionError5",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type ListBillingPlansRequest = {
    productId?: string;
    pageSize?: number;
    page?: number;
    totalRequired?: boolean;
    prefer?: string;
  };

  export class ListBillingPlansError extends ResponseError<
    | Declared<"subscriptionError", SubscriptionError>
    | Declared<"subscriptionError2", SubscriptionError>
    | Declared<"subscriptionError3", SubscriptionError>
    | Declared<"subscriptionError4", SubscriptionError>
    | Declared<"subscriptionError5", SubscriptionError>
    | Declared<"subscriptionError6", SubscriptionError>
  > {
    static readonly errors: ErrorDecoders<ListBillingPlansError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: [400, 599],
        kind: "subscriptionError6",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type ListSubscriptionTransactionsRequest = {
    id: string;
    startTime: string;
    endTime: string;
  };

  export class ListSubscriptionTransactionsError extends ResponseError<
    | Declared<"subscriptionError", SubscriptionError>
    | Declared<"subscriptionError2", SubscriptionError>
    | Declared<"subscriptionError3", SubscriptionError>
    | Declared<"subscriptionError4", SubscriptionError>
    | Declared<"subscriptionError5", SubscriptionError>
    | Declared<"subscriptionError6", SubscriptionError>
  > {
    static readonly errors: ErrorDecoders<ListSubscriptionTransactionsError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: [400, 599],
        kind: "subscriptionError6",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type ListSubscriptionsRequest = {
    planIds?: string;
    statuses?: string;
    createdAfter?: string;
    createdBefore?: string;
    statusUpdatedBefore?: string;
    statusUpdatedAfter?: string;
    filter?: string;
    pageSize?: number;
    page?: number;
    customerIds?: string[];
  };

  export class ListSubscriptionsError extends ResponseError<
    | Declared<"subscriptionError", SubscriptionError>
    | Declared<"subscriptionError2", SubscriptionError>
    | Declared<"subscriptionError3", SubscriptionError>
    | Declared<"subscriptionError4", SubscriptionError>
    | Declared<"subscriptionError5", SubscriptionError>
  > {
    static readonly errors: ErrorDecoders<ListSubscriptionsError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: [400, 599],
        kind: "subscriptionError5",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type PatchBillingPlanRequest = {
    id: string;
    body?: Patch[];
  };

  export class PatchBillingPlanError extends ResponseError<
    | Declared<"subscriptionError", SubscriptionError>
    | Declared<"subscriptionError2", SubscriptionError>
    | Declared<"subscriptionError3", SubscriptionError>
    | Declared<"subscriptionError4", SubscriptionError>
    | Declared<"subscriptionError5", SubscriptionError>
    | Declared<"subscriptionError6", SubscriptionError>
    | Declared<"subscriptionError7", SubscriptionError>
  > {
    static readonly errors: ErrorDecoders<PatchBillingPlanError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError6", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: [400, 599],
        kind: "subscriptionError7",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type PatchSubscriptionRequest = {
    id: string;
    body?: Patch[];
  };

  export class PatchSubscriptionError extends ResponseError<
    | Declared<"subscriptionError", SubscriptionError>
    | Declared<"subscriptionError2", SubscriptionError>
    | Declared<"subscriptionError3", SubscriptionError>
    | Declared<"subscriptionError4", SubscriptionError>
    | Declared<"subscriptionError5", SubscriptionError>
    | Declared<"subscriptionError6", SubscriptionError>
    | Declared<"subscriptionError7", SubscriptionError>
  > {
    static readonly errors: ErrorDecoders<PatchSubscriptionError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError6", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: [400, 599],
        kind: "subscriptionError7",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type ReviseSubscriptionRequest = {
    id: string;
    body?: ModifySubscriptionRequest;
  };

  export class ReviseSubscriptionError extends ResponseError<
    | Declared<"subscriptionError", SubscriptionError>
    | Declared<"subscriptionError2", SubscriptionError>
    | Declared<"subscriptionError3", SubscriptionError>
    | Declared<"subscriptionError4", SubscriptionError>
    | Declared<"subscriptionError5", SubscriptionError>
    | Declared<"subscriptionError6", SubscriptionError>
    | Declared<"subscriptionError7", SubscriptionError>
  > {
    static readonly errors: ErrorDecoders<ReviseSubscriptionError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError6", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: [400, 599],
        kind: "subscriptionError7",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type SuspendSubscriptionRequest = {
    id: string;
    body?: SuspendSubscription;
  };

  export class SuspendSubscriptionError extends ResponseError<
    | Declared<"subscriptionError", SubscriptionError>
    | Declared<"subscriptionError2", SubscriptionError>
    | Declared<"subscriptionError3", SubscriptionError>
    | Declared<"subscriptionError4", SubscriptionError>
    | Declared<"subscriptionError5", SubscriptionError>
    | Declared<"subscriptionError6", SubscriptionError>
    | Declared<"subscriptionError7", SubscriptionError>
  > {
    static readonly errors: ErrorDecoders<SuspendSubscriptionError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError6", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: [400, 599],
        kind: "subscriptionError7",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }

  export type UpdateBillingPlanPricingSchemesRequest = {
    id: string;
    body?: UpdatePricingSchemesRequest;
  };

  export class UpdateBillingPlanPricingSchemesError extends ResponseError<
    | Declared<"subscriptionError", SubscriptionError>
    | Declared<"subscriptionError2", SubscriptionError>
    | Declared<"subscriptionError3", SubscriptionError>
    | Declared<"subscriptionError4", SubscriptionError>
    | Declared<"subscriptionError5", SubscriptionError>
    | Declared<"subscriptionError6", SubscriptionError>
    | Declared<"subscriptionError7", SubscriptionError>
  > {
    static readonly errors: ErrorDecoders<UpdateBillingPlanPricingSchemesError> = [
      { on: 400, kind: "subscriptionError", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 401, kind: "subscriptionError2", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 403, kind: "subscriptionError3", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 404, kind: "subscriptionError4", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 422, kind: "subscriptionError5", decode: { kind: "json", schema: subscriptionErrorSchema } },
      { on: 500, kind: "subscriptionError6", decode: { kind: "json", schema: subscriptionErrorSchema } },
      {
        on: [400, 599],
        kind: "subscriptionError7",
        decode: { kind: "json", schema: subscriptionErrorSchema },
      },
    ];
  }
}
