<!-- Generated file — do not edit; regenerated with the SDK. -->

# Subscriptions — operations

Accessor: `client.subscriptions` · Source: `src/resources/subscriptions.ts` · 17 operations · Request and error types: namespace `Subscriptions`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `paypal`; the `Source` path is where to **read** the shape, never what to import. `ResponseError` and the runtime error family are excluded — see sdk-map.md.

### activateBillingPlan

- **Signature**: `activateBillingPlan(request: Subscriptions.ActivateBillingPlanRequest, options?: RequestOptions): ApiPromise<undefined, Subscriptions.ActivateBillingPlanError>`
- **Wire**: `POST /v1/billing/plans/{id}/activate`
- **Auth**: `oauth2`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `Subscriptions.ActivateBillingPlanError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [401] `SubscriptionError` · `"subscriptionError2"` [403] `SubscriptionError` · `"subscriptionError3"` [404] `SubscriptionError` · `"subscriptionError4"` [422] `SubscriptionError` · `"subscriptionError5"` [500] `SubscriptionError` · `"subscriptionError6"` [400–599] `SubscriptionError` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

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
- **Request body**: `application/json` — the `body` field
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `Subscriptions.ActivateSubscriptionError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [404] `SubscriptionError` · `"subscriptionError5"` [422] `SubscriptionError` · `"subscriptionError6"` [500] `SubscriptionError` · `"subscriptionError7"` [400–599] `SubscriptionError` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

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
- **Request body**: `application/json` — the `body` field
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `Subscriptions.CancelSubscriptionError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [404] `SubscriptionError` · `"subscriptionError5"` [422] `SubscriptionError` · `"subscriptionError6"` [500] `SubscriptionError` · `"subscriptionError7"` [400–599] `SubscriptionError` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

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
- **Request body**: `application/json` — the `body` field
- **Returns**: `SubscriptionTransactionDetails`
- **Error**: `Subscriptions.CaptureSubscriptionError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [404] `SubscriptionError` · `"subscriptionError5"` [422] `SubscriptionError` · `"subscriptionError6"` [500] `SubscriptionError` · `"subscriptionError7"` [400–599] `SubscriptionError` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

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
- **Request body**: `application/json` — the `body` field
- **Returns**: `BillingPlan`
- **Error**: `Subscriptions.CreateBillingPlanError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [422] `SubscriptionError` · `"subscriptionError5"` [500] `SubscriptionError` · `"subscriptionError6"` [400–599] `SubscriptionError` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

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
- **Request body**: `application/json` — the `body` field
- **Returns**: `Subscription`
- **Error**: `Subscriptions.CreateSubscriptionError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [422] `SubscriptionError` · `"subscriptionError5"` [500] `SubscriptionError` · `"subscriptionError6"` [400–599] `SubscriptionError` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

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
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `Subscriptions.DeactivateBillingPlanError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [401] `SubscriptionError` · `"subscriptionError2"` [403] `SubscriptionError` · `"subscriptionError3"` [404] `SubscriptionError` · `"subscriptionError4"` [422] `SubscriptionError` · `"subscriptionError5"` [500] `SubscriptionError` · `"subscriptionError6"` [400–599] `SubscriptionError` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

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
- **Error**: `Subscriptions.GetBillingPlanError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [401] `SubscriptionError` · `"subscriptionError2"` [403] `SubscriptionError` · `"subscriptionError3"` [404] `SubscriptionError` · `"subscriptionError4"` [500] `SubscriptionError` · `"subscriptionError5"` [400–599] `SubscriptionError` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

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
- **Error**: `Subscriptions.GetSubscriptionError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [401] `SubscriptionError` · `"subscriptionError2"` [403] `SubscriptionError` · `"subscriptionError3"` [404] `SubscriptionError` · `"subscriptionError4"` [500] `SubscriptionError` · `"subscriptionError5"` [400–599] `SubscriptionError` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

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
- **Error**: `Subscriptions.ListBillingPlansError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [404] `SubscriptionError` · `"subscriptionError5"` [500] `SubscriptionError` · `"subscriptionError6"` [400–599] `SubscriptionError` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

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
- **Error**: `Subscriptions.ListSubscriptionTransactionsError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [404] `SubscriptionError` · `"subscriptionError5"` [500] `SubscriptionError` · `"subscriptionError6"` [400–599] `SubscriptionError` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

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
- **Error**: `Subscriptions.ListSubscriptionsError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [500] `SubscriptionError` · `"subscriptionError5"` [400–599] `SubscriptionError` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

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
- **Request body**: `application/json` — the `body` field, a bare top-level JSON array
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `Subscriptions.PatchBillingPlanError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [404] `SubscriptionError` · `"subscriptionError5"` [422] `SubscriptionError` · `"subscriptionError6"` [500] `SubscriptionError` · `"subscriptionError7"` [400–599] `SubscriptionError` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

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
- **Request body**: `application/json` — the `body` field, a bare top-level JSON array
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `Subscriptions.PatchSubscriptionError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [404] `SubscriptionError` · `"subscriptionError5"` [422] `SubscriptionError` · `"subscriptionError6"` [500] `SubscriptionError` · `"subscriptionError7"` [400–599] `SubscriptionError` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

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
- **Request body**: `application/json` — the `body` field
- **Returns**: `ModifySubscriptionResponse`
- **Error**: `Subscriptions.ReviseSubscriptionError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [404] `SubscriptionError` · `"subscriptionError5"` [422] `SubscriptionError` · `"subscriptionError6"` [500] `SubscriptionError` · `"subscriptionError7"` [400–599] `SubscriptionError` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

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
- **Request body**: `application/json` — the `body` field
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `Subscriptions.SuspendSubscriptionError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [404] `SubscriptionError` · `"subscriptionError5"` [422] `SubscriptionError` · `"subscriptionError6"` [500] `SubscriptionError` · `"subscriptionError7"` [400–599] `SubscriptionError` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

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
- **Request body**: `application/json` — the `body` field
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `Subscriptions.UpdateBillingPlanPricingSchemesError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"subscriptionError"` [400] `SubscriptionError` · `"subscriptionError2"` [401] `SubscriptionError` · `"subscriptionError3"` [403] `SubscriptionError` · `"subscriptionError4"` [404] `SubscriptionError` · `"subscriptionError5"` [422] `SubscriptionError` · `"subscriptionError6"` [500] `SubscriptionError` · `"subscriptionError7"` [400–599] `SubscriptionError` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Subscriptions.UpdateBillingPlanPricingSchemesRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |
| `body` | `body` | `UpdatePricingSchemesRequest` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `UpdatePricingSchemesRequest` | `updatePricingSchemesRequestSchema` | `src/models/update-pricing-schemes-request.ts` |
| `SubscriptionError` | `subscriptionErrorSchema` | `src/models/subscription-error.ts` |

