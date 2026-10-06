<!-- Generated file — do not edit; regenerated with the SDK. -->

# Subscriptions — operations

Accessor: `client.subscriptions` · Source: `src/resources/subscriptions.ts` · 17 operations · Request and error types: namespace `Subscriptions`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `paypal`; the `Source` path is where to **read** the shape, never what to import. `ApiError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### activateBillingPlan

- **Signature**: `activateBillingPlan(request: Subscriptions.ActivateBillingPlanRequest, options?: RequestOptions): ApiPromise<undefined, Subscriptions.ActivateBillingPlanError>`
- **Wire**: `POST /v1/billing/plans/{id}/activate`
- **Auth**: `oauth2`
- **Request body**: none — no `Content-Type` header is sent
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `PaypalError` with `kind: "api"`, an instance of `Subscriptions.ActivateBillingPlanError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [401] `SubscriptionError` · `"subscriptionError2"` [403] `SubscriptionError` · `"subscriptionError3"` [404] `SubscriptionError` · `"subscriptionError4"` [422] `SubscriptionError` · `"subscriptionError5"` [500] `SubscriptionError` · `"subscriptionError6"` [default — any status no arm above covers] `SubscriptionError` · `"undeclared"` [a `default`-matched body that did not fit `SubscriptionError`] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.ActivateBillingPlanRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `SubscriptionError` | `subscriptionErrorSchema` | `src/models/subscription-error.ts` |

### activateSubscription

- **Signature**: `activateSubscription(request: Subscriptions.ActivateSubscriptionRequestParams, options?: RequestOptions): ApiPromise<undefined, Subscriptions.ActivateSubscriptionError>`
- **Wire**: `POST /v1/billing/subscriptions/{id}/activate`
- **Auth**: `oauth2`
- **Request body**: `application/json` — the `body` field. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `PaypalError` with `kind: "api"`, an instance of `Subscriptions.ActivateSubscriptionError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [404] `SubscriptionError` · `"subscriptionError5"` [422] `SubscriptionError` · `"subscriptionError6"` [500] `SubscriptionError` · `"subscriptionError7"` [default — any status no arm above covers] `SubscriptionError` · `"undeclared"` [a `default`-matched body that did not fit `SubscriptionError`] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.ActivateSubscriptionRequestParams` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |
| `body` | `body` | `ActivateSubscriptionRequest` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `ActivateSubscriptionRequest` | `activateSubscriptionRequestSchema` | `src/models/activate-subscription-request.ts` |
| `SubscriptionError` | `subscriptionErrorSchema` | `src/models/subscription-error.ts` |

### cancelSubscription

- **Signature**: `cancelSubscription(request: Subscriptions.CancelSubscriptionRequestParams, options?: RequestOptions): ApiPromise<undefined, Subscriptions.CancelSubscriptionError>`
- **Wire**: `POST /v1/billing/subscriptions/{id}/cancel`
- **Auth**: `oauth2`
- **Request body**: `application/json` — the `body` field. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `PaypalError` with `kind: "api"`, an instance of `Subscriptions.CancelSubscriptionError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [404] `SubscriptionError` · `"subscriptionError5"` [422] `SubscriptionError` · `"subscriptionError6"` [500] `SubscriptionError` · `"subscriptionError7"` [default — any status no arm above covers] `SubscriptionError` · `"undeclared"` [a `default`-matched body that did not fit `SubscriptionError`] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.CancelSubscriptionRequestParams` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |
| `body` | `body` | `CancelSubscriptionRequest` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `CancelSubscriptionRequest` | `cancelSubscriptionRequestSchema` | `src/models/cancel-subscription-request.ts` |
| `SubscriptionError` | `subscriptionErrorSchema` | `src/models/subscription-error.ts` |

### captureSubscription

- **Signature**: `captureSubscription(request: Subscriptions.CaptureSubscriptionRequestParams, options?: RequestOptions): ApiPromise<SubscriptionTransactionDetails, Subscriptions.CaptureSubscriptionError>`
- **Wire**: `POST /v1/billing/subscriptions/{id}/capture`
- **Auth**: `oauth2`
- **Request body**: `application/json` — the `body` field. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `SubscriptionTransactionDetails`
- **Error**: `PaypalError` with `kind: "api"`, an instance of `Subscriptions.CaptureSubscriptionError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [404] `SubscriptionError` · `"subscriptionError5"` [422] `SubscriptionError` · `"subscriptionError6"` [500] `SubscriptionError` · `"subscriptionError7"` [default — any status no arm above covers] `SubscriptionError` · `"undeclared"` [a `default`-matched body that did not fit `SubscriptionError`] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.CaptureSubscriptionRequestParams` (3):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `id` | `path` | — | `string` | yes |
| `payPalRequestId` | `header` | `PayPal-Request-Id` | `string` | no |
| `body` | `body` | — | `CaptureSubscriptionRequest` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `CaptureSubscriptionRequest` | `captureSubscriptionRequestSchema` | `src/models/capture-subscription-request.ts` |
| `SubscriptionTransactionDetails` | `subscriptionTransactionDetailsSchema` | `src/models/subscription-transaction-details.ts` |
| `SubscriptionError` | `subscriptionErrorSchema` | `src/models/subscription-error.ts` |

### createBillingPlan

- **Signature**: `createBillingPlan(request: Subscriptions.CreateBillingPlanRequest, options?: RequestOptions): ApiPromise<BillingPlan, Subscriptions.CreateBillingPlanError>`
- **Wire**: `POST /v1/billing/plans`
- **Auth**: `oauth2`
- **Request body**: `application/json` — the `body` field. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `BillingPlan`
- **Error**: `PaypalError` with `kind: "api"`, an instance of `Subscriptions.CreateBillingPlanError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [422] `SubscriptionError` · `"subscriptionError5"` [500] `SubscriptionError` · `"subscriptionError6"` [default — any status no arm above covers] `SubscriptionError` · `"undeclared"` [a `default`-matched body that did not fit `SubscriptionError`] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.CreateBillingPlanRequest` (3):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `prefer` | `header` | `Prefer` | `string` | no | `"return=minimal"` |
| `payPalRequestId` | `header` | `PayPal-Request-Id` | `string` | no | — |
| `body` | `body` | — | `PlanRequest` | no | — |

| Type | Schema value | Source |
| --- | --- | --- |
| `PlanRequest` | `planRequestSchema` | `src/models/plan-request.ts` |
| `BillingPlan` | `billingPlanSchema` | `src/models/billing-plan.ts` |
| `SubscriptionError` | `subscriptionErrorSchema` | `src/models/subscription-error.ts` |

### createSubscription

- **Signature**: `createSubscription(request: Subscriptions.CreateSubscriptionRequestParams, options?: RequestOptions): ApiPromise<Subscription, Subscriptions.CreateSubscriptionError>`
- **Wire**: `POST /v1/billing/subscriptions`
- **Auth**: `oauth2`
- **Request body**: `application/json` — the `body` field. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `Subscription`
- **Error**: `PaypalError` with `kind: "api"`, an instance of `Subscriptions.CreateSubscriptionError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [422] `SubscriptionError` · `"subscriptionError5"` [500] `SubscriptionError` · `"subscriptionError6"` [default — any status no arm above covers] `SubscriptionError` · `"undeclared"` [a `default`-matched body that did not fit `SubscriptionError`] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.CreateSubscriptionRequestParams` (4):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `prefer` | `header` | `Prefer` | `string` | no | `"return=minimal"` |
| `payPalRequestId` | `header` | `PayPal-Request-Id` | `string` | no | — |
| `payPalClientMetadataId` | `header` | `PayPal-Client-Metadata-Id` | `string` | no | — |
| `body` | `body` | — | `CreateSubscriptionRequest` | no | — |

| Type | Schema value | Source |
| --- | --- | --- |
| `CreateSubscriptionRequest` | `createSubscriptionRequestSchema` | `src/models/create-subscription-request.ts` |
| `Subscription` | `subscriptionSchema` | `src/models/subscription.ts` |
| `SubscriptionError` | `subscriptionErrorSchema` | `src/models/subscription-error.ts` |

### deactivateBillingPlan

- **Signature**: `deactivateBillingPlan(request: Subscriptions.DeactivateBillingPlanRequest, options?: RequestOptions): ApiPromise<undefined, Subscriptions.DeactivateBillingPlanError>`
- **Wire**: `POST /v1/billing/plans/{id}/deactivate`
- **Auth**: `oauth2`
- **Request body**: none — no `Content-Type` header is sent
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `PaypalError` with `kind: "api"`, an instance of `Subscriptions.DeactivateBillingPlanError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [401] `SubscriptionError` · `"subscriptionError2"` [403] `SubscriptionError` · `"subscriptionError3"` [404] `SubscriptionError` · `"subscriptionError4"` [422] `SubscriptionError` · `"subscriptionError5"` [500] `SubscriptionError` · `"subscriptionError6"` [default — any status no arm above covers] `SubscriptionError` · `"undeclared"` [a `default`-matched body that did not fit `SubscriptionError`] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.DeactivateBillingPlanRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `SubscriptionError` | `subscriptionErrorSchema` | `src/models/subscription-error.ts` |

### getBillingPlan

- **Signature**: `getBillingPlan(request: Subscriptions.GetBillingPlanRequest, options?: RequestOptions): ApiPromise<BillingPlan, Subscriptions.GetBillingPlanError>`
- **Wire**: `GET /v1/billing/plans/{id}`
- **Auth**: `oauth2`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `BillingPlan`
- **Error**: `PaypalError` with `kind: "api"`, an instance of `Subscriptions.GetBillingPlanError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [401] `SubscriptionError` · `"subscriptionError2"` [403] `SubscriptionError` · `"subscriptionError3"` [404] `SubscriptionError` · `"subscriptionError4"` [500] `SubscriptionError` · `"subscriptionError5"` [default — any status no arm above covers] `SubscriptionError` · `"undeclared"` [a `default`-matched body that did not fit `SubscriptionError`] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.GetBillingPlanRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `BillingPlan` | `billingPlanSchema` | `src/models/billing-plan.ts` |
| `SubscriptionError` | `subscriptionErrorSchema` | `src/models/subscription-error.ts` |

### getSubscription

- **Signature**: `getSubscription(request: Subscriptions.GetSubscriptionRequest, options?: RequestOptions): ApiPromise<Subscription, Subscriptions.GetSubscriptionError>`
- **Wire**: `GET /v1/billing/subscriptions/{id}`
- **Auth**: `oauth2`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `Subscription`
- **Error**: `PaypalError` with `kind: "api"`, an instance of `Subscriptions.GetSubscriptionError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [401] `SubscriptionError` · `"subscriptionError2"` [403] `SubscriptionError` · `"subscriptionError3"` [404] `SubscriptionError` · `"subscriptionError4"` [500] `SubscriptionError` · `"subscriptionError5"` [default — any status no arm above covers] `SubscriptionError` · `"undeclared"` [a `default`-matched body that did not fit `SubscriptionError`] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.GetSubscriptionRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |
| `fields` | `query` | `string` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `Subscription` | `subscriptionSchema` | `src/models/subscription.ts` |
| `SubscriptionError` | `subscriptionErrorSchema` | `src/models/subscription-error.ts` |

### listBillingPlans

- **Signature**: `listBillingPlans(request: Subscriptions.ListBillingPlansRequest, options?: RequestOptions): ApiPromise<PlanCollection, Subscriptions.ListBillingPlansError>`
- **Wire**: `GET /v1/billing/plans`
- **Auth**: `oauth2`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `PlanCollection`
- **Error**: `PaypalError` with `kind: "api"`, an instance of `Subscriptions.ListBillingPlansError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [404] `SubscriptionError` · `"subscriptionError5"` [500] `SubscriptionError` · `"subscriptionError6"` [default — any status no arm above covers] `SubscriptionError` · `"undeclared"` [a `default`-matched body that did not fit `SubscriptionError`] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.ListBillingPlansRequest` (5):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `productId` | `query` | `product_id` | `string` | no | — |
| `pageSize` | `query` | `page_size` | `number` | no | `10` |
| `page` | `query` | — | `number` | no | `1` |
| `totalRequired` | `query` | `total_required` | `boolean` | no | `false` |
| `prefer` | `header` | `Prefer` | `string` | no | `"return=minimal"` |

| Type | Schema value | Source |
| --- | --- | --- |
| `PlanCollection` | `planCollectionSchema` | `src/models/plan-collection.ts` |
| `SubscriptionError` | `subscriptionErrorSchema` | `src/models/subscription-error.ts` |

### listSubscriptionTransactions

- **Signature**: `listSubscriptionTransactions(request: Subscriptions.ListSubscriptionTransactionsRequest, options?: RequestOptions): ApiPromise<TransactionsList, Subscriptions.ListSubscriptionTransactionsError>`
- **Wire**: `GET /v1/billing/subscriptions/{id}/transactions`
- **Auth**: `oauth2`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `TransactionsList`
- **Error**: `PaypalError` with `kind: "api"`, an instance of `Subscriptions.ListSubscriptionTransactionsError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [404] `SubscriptionError` · `"subscriptionError5"` [500] `SubscriptionError` · `"subscriptionError6"` [default — any status no arm above covers] `SubscriptionError` · `"undeclared"` [a `default`-matched body that did not fit `SubscriptionError`] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.ListSubscriptionTransactionsRequest` (3):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `id` | `path` | — | `string` | yes |
| `startTime` | `query` | `start_time` | `string` | yes |
| `endTime` | `query` | `end_time` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `TransactionsList` | `transactionsListSchema` | `src/models/transactions-list.ts` |
| `SubscriptionError` | `subscriptionErrorSchema` | `src/models/subscription-error.ts` |

### listSubscriptions

- **Signature**: `listSubscriptions(request: Subscriptions.ListSubscriptionsRequest, options?: RequestOptions): ApiPromise<SubscriptionCollection, Subscriptions.ListSubscriptionsError>`
- **Wire**: `GET /v1/billing/subscriptions`
- **Auth**: `oauth2`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `SubscriptionCollection`
- **Error**: `PaypalError` with `kind: "api"`, an instance of `Subscriptions.ListSubscriptionsError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [500] `SubscriptionError` · `"subscriptionError5"` [default — any status no arm above covers] `SubscriptionError` · `"undeclared"` [a `default`-matched body that did not fit `SubscriptionError`] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.ListSubscriptionsRequest` (10):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `planIds` | `query` | `plan_ids` | `string` | no | — |
| `statuses` | `query` | — | `string` | no | — |
| `createdAfter` | `query` | `created_after` | `string` | no | — |
| `createdBefore` | `query` | `created_before` | `string` | no | — |
| `statusUpdatedBefore` | `query` | `status_updated_before` | `string` | no | — |
| `statusUpdatedAfter` | `query` | `status_updated_after` | `string` | no | — |
| `filter` | `query` | — | `string` | no | — |
| `pageSize` | `query` | `page_size` | `number` | no | `10` |
| `page` | `query` | — | `number` | no | `1` |
| `customerIds` | `query` | `customer_ids` | `string[]` | no | — |

| Type | Schema value | Source |
| --- | --- | --- |
| `SubscriptionCollection` | `subscriptionCollectionSchema` | `src/models/subscription-collection.ts` |
| `SubscriptionError` | `subscriptionErrorSchema` | `src/models/subscription-error.ts` |

### patchBillingPlan

- **Signature**: `patchBillingPlan(request: Subscriptions.PatchBillingPlanRequest, options?: RequestOptions): ApiPromise<undefined, Subscriptions.PatchBillingPlanError>`
- **Wire**: `PATCH /v1/billing/plans/{id}`
- **Auth**: `oauth2`
- **Request body**: `application/json` — the `body` field, a bare top-level JSON array. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `PaypalError` with `kind: "api"`, an instance of `Subscriptions.PatchBillingPlanError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [404] `SubscriptionError` · `"subscriptionError5"` [422] `SubscriptionError` · `"subscriptionError6"` [500] `SubscriptionError` · `"subscriptionError7"` [default — any status no arm above covers] `SubscriptionError` · `"undeclared"` [a `default`-matched body that did not fit `SubscriptionError`] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.PatchBillingPlanRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |
| `body` | `body` | `Patch[]` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `Patch` | `patchSchema` | `src/models/patch.ts` |
| `SubscriptionError` | `subscriptionErrorSchema` | `src/models/subscription-error.ts` |

### patchSubscription

- **Signature**: `patchSubscription(request: Subscriptions.PatchSubscriptionRequest, options?: RequestOptions): ApiPromise<undefined, Subscriptions.PatchSubscriptionError>`
- **Wire**: `PATCH /v1/billing/subscriptions/{id}`
- **Auth**: `oauth2`
- **Request body**: `application/json` — the `body` field, a bare top-level JSON array. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `PaypalError` with `kind: "api"`, an instance of `Subscriptions.PatchSubscriptionError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [404] `SubscriptionError` · `"subscriptionError5"` [422] `SubscriptionError` · `"subscriptionError6"` [500] `SubscriptionError` · `"subscriptionError7"` [default — any status no arm above covers] `SubscriptionError` · `"undeclared"` [a `default`-matched body that did not fit `SubscriptionError`] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.PatchSubscriptionRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |
| `body` | `body` | `Patch[]` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `Patch` | `patchSchema` | `src/models/patch.ts` |
| `SubscriptionError` | `subscriptionErrorSchema` | `src/models/subscription-error.ts` |

### reviseSubscription

- **Signature**: `reviseSubscription(request: Subscriptions.ReviseSubscriptionRequest, options?: RequestOptions): ApiPromise<ModifySubscriptionResponse, Subscriptions.ReviseSubscriptionError>`
- **Wire**: `POST /v1/billing/subscriptions/{id}/revise`
- **Auth**: `oauth2`
- **Request body**: `application/json` — the `body` field. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `ModifySubscriptionResponse`
- **Error**: `PaypalError` with `kind: "api"`, an instance of `Subscriptions.ReviseSubscriptionError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [404] `SubscriptionError` · `"subscriptionError5"` [422] `SubscriptionError` · `"subscriptionError6"` [500] `SubscriptionError` · `"subscriptionError7"` [default — any status no arm above covers] `SubscriptionError` · `"undeclared"` [a `default`-matched body that did not fit `SubscriptionError`] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.ReviseSubscriptionRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |
| `body` | `body` | `ModifySubscriptionRequest` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `ModifySubscriptionRequest` | `modifySubscriptionRequestSchema` | `src/models/modify-subscription-request.ts` |
| `ModifySubscriptionResponse` | `modifySubscriptionResponseSchema` | `src/models/modify-subscription-response.ts` |
| `SubscriptionError` | `subscriptionErrorSchema` | `src/models/subscription-error.ts` |

### suspendSubscription

- **Signature**: `suspendSubscription(request: Subscriptions.SuspendSubscriptionRequest, options?: RequestOptions): ApiPromise<undefined, Subscriptions.SuspendSubscriptionError>`
- **Wire**: `POST /v1/billing/subscriptions/{id}/suspend`
- **Auth**: `oauth2`
- **Request body**: `application/json` — the `body` field. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `PaypalError` with `kind: "api"`, an instance of `Subscriptions.SuspendSubscriptionError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [404] `SubscriptionError` · `"subscriptionError5"` [422] `SubscriptionError` · `"subscriptionError6"` [500] `SubscriptionError` · `"subscriptionError7"` [default — any status no arm above covers] `SubscriptionError` · `"undeclared"` [a `default`-matched body that did not fit `SubscriptionError`] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.SuspendSubscriptionRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |
| `body` | `body` | `SuspendSubscription` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `SuspendSubscription` | `suspendSubscriptionSchema` | `src/models/suspend-subscription.ts` |
| `SubscriptionError` | `subscriptionErrorSchema` | `src/models/subscription-error.ts` |

### updateBillingPlanPricingSchemes

- **Signature**: `updateBillingPlanPricingSchemes(request: Subscriptions.UpdateBillingPlanPricingSchemesRequest, options?: RequestOptions): ApiPromise<undefined, Subscriptions.UpdateBillingPlanPricingSchemesError>`
- **Wire**: `POST /v1/billing/plans/{id}/update-pricing-schemes`
- **Auth**: `oauth2`
- **Request body**: `application/json` — the `body` field. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `PaypalError` with `kind: "api"`, an instance of `Subscriptions.UpdateBillingPlanPricingSchemesError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [404] `SubscriptionError` · `"subscriptionError5"` [422] `SubscriptionError` · `"subscriptionError6"` [500] `SubscriptionError` · `"subscriptionError7"` [default — any status no arm above covers] `SubscriptionError` · `"undeclared"` [a `default`-matched body that did not fit `SubscriptionError`] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.UpdateBillingPlanPricingSchemesRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |
| `body` | `body` | `UpdatePricingSchemesRequest` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `UpdatePricingSchemesRequest` | `updatePricingSchemesRequestSchema` | `src/models/update-pricing-schemes-request.ts` |
| `SubscriptionError` | `subscriptionErrorSchema` | `src/models/subscription-error.ts` |

