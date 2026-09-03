<!-- Generated file — do not edit; regenerated with the SDK. -->

# SDK map — Paypal (TypeScript)

> A generated table of contents for this SDK. Consult this map and its sub-pages to learn signatures, request-field placement, error types and server wiring **by lookup**. Model shapes are *not* duplicated here — the map names the file declaring each type and the schema value exported beside it; read the shape there. The compiler is the backstop: a wrong name fails to build.

|  |  |
| --- | --- |
| SDK display name | Paypal |
| Package | `paypal` |
| Package version | `2.29` |
| API spec version | `2.29` |
| Import specifier | `paypal` — the package root is the **only** entry. Deep imports (`paypal/models/...`) do not resolve; the `exports` map exposes `.` and `./package.json` and nothing else |
| Module format | dual ESM + CommonJS, as folder dialects (`dist/esm`, `dist/commonjs`), each with its own `package.json` marker. No `.mjs`, `.cjs`, `.d.mts` or `.d.cts` files exist |
| Node floor | `>=20` (`engines.node`) |
| TypeScript floor | a resolver that reads `exports` (4.7+), plus whatever the pinned `zod` requires — `zod@4` needs 5.5 or later. The public `.d.ts` chain reaches `zod/v4-mini`, so this is a real constraint rather than a build-tool version |
| Runtime dependency | `zod` (`^3.25.0 \|\| ^4.0.0`), imported as `zod/v4-mini`. The only runtime dependency |
| Generator | APIMatic |

Staleness check: the API spec version above changes when the SDK is regenerated from a new spec. If a lookup here fails to compile, trust the compiler and re-read the source file named in the row.

All `Source` paths on this map and its sub-pages are relative to the **SDK root** — the directory holding this file and `package.json` — never to the page that carries them: a page two directories deep writes exactly what a page at the root would. The package ships its `src/` tree, so the same paths resolve inside `node_modules/paypal/` too. An import specifier ending `.js` inside that source is the NodeNext spelling of the sibling `.ts` file.

---

## Getting a client

```ts
import { PaypalClient, ServerEnvironment } from "paypal";

const client = new PaypalClient({
  serverEnvironment: ServerEnvironment.Sandbox,
  oauth2: { clientId: "YOUR_CLIENT_ID", clientSecret: "YOUR_CLIENT_SECRET" },
});
```

The only constructor is `new PaypalClient(clientOptions: Partial<ClientOptions> = {})`, so `new PaypalClient()` is valid. Resources are memoized lazy getters on the client — `client.orders`, `client.payments`, `client.vault`, `client.transactionSearch`, `client.subscriptions` — and their classes are exported only for their merged namespaces and for `instanceof`; their constructors take engine internals that are not exported, so reach a resource only through its getter.

All `ClientOptions` fields (source: `src/client-options.ts`; every field is `readonly`):

| Field | Type | Default |
| --- | --- | --- |
| `serverEnvironment` | `ServerEnvironment` | `ServerEnvironment.Sandbox` |
| `serverOptions` | `ServerOptions` | `{}` — each resolver merges its own per-environment defaults in |
| `timeout` | `number` (ms) | `60_000` |
| `fetch` | `FetchLike \| undefined` | the global `fetch`, resolved by the transport |
| `oauth2` | `OAuth2ClientCredentials \| undefined` | unset |
| `oauth2Strategy` | `OAuth2TokenStrategy<OAuth2ClientCredentials> \| undefined` | the built-in grant |

The 2 auth fields are all optional, and an unset one is not an error — the operation that wanted it simply sends no credential. What each one puts on the wire, and which operations require it, are under Servers & auth.

Two engine behaviours the table cannot show. A non-finite or non-positive `timeout` is **not** "no timeout" — the transport (`src/core/raw-client.ts`) falls back to its own ceiling and clamps anything above it. And when no `fetch` is reachable the **constructor** throws `SdkError`, not the first call.

**`ClientOptions.fetch` is the one extension point** — there are no hooks, no middleware and no interceptors, so a proxy, a custom agent, extra headers, retries or request logging all go here. A replacement **must forward `init.signal`** to whatever actually performs the request; spreading `...init` does it. Drop it and both the per-call signal and `timeout` go inert — the call neither aborts nor times out.

**Cancellation.** The `signal` on `RequestOptions` is the whole per-request surface. An already-aborted signal rejects immediately, `err.cause` is whatever was passed to `abort()`, and the client-level `timeout` surfaces through the same branch with `err.kind === "timeout"`. There is no per-request timeout.

The entire per-request surface is the optional second argument of every operation:

| Type | Members | Source |
| --- | --- | --- |
| `RequestOptions` | `signal?: AbortSignal` | `src/core/api-request.ts` |

**Not on this SDK.** These are absent by design, not undocumented. This table ships with `src/core/` and is versioned with it.

| You might reach for | Reality |
| --- | --- |
| `maxRetries`, backoff, `Retry-After` handling | no retries. A failed call rejects once |
| a logger, `logLevel`, request/response logging | none. `src/core/` contains no `console` call |
| hooks, middleware, interceptors, `onRequest`/`onResponse` | none. `fetch` is the one extension point |
| pagination, `for await`, auto-paging helpers | no operation is paginated and nothing is async-iterable |
| SSE, `text/event-stream`, `ReadableStream` | no streaming. Every decoder reads the body to completion |
| `FormData`, `Blob`, `File`, multipart, binary bodies | none. The only body kinds are empty, JSON, form-urlencoded and text |
| per-request `headers`, `timeout`, `baseUrl`, idempotency key | none. `RequestOptions` is `{ signal }` |
| the raw `fetch` `Response` | deliberately unreachable. `status` and `headers` are on `asApiResult()` and on a thrown `ResponseError` |

---

## Error-handling model (read once — applies to every operation)

Operations are **throw-based**, and failures fall into **two disjoint families**. Neither is `instanceof` the other, so the two branches can never overlap and a complete `catch` needs both. `instanceof` is reliable **within one dialect**: a process that loads both — `import` in one file, `require` in another — gets two independent copies of every error class, and `instanceof` across that boundary is `false`. Narrow on `err.kind` or on `err.payload.kind` there, or on `err.name`, which is stable across copies.

- **Family A — the API answered with an error status.** The call rejects with `ResponseError`, or with a subclass of it where the spec declared error bodies for that operation. `err.payload` is a discriminated union whose `kind` names the **response schema the spec declared**, *not* the status code — so two statuses sharing one schema share one arm, and `"undeclared"` is an always-present arm carrying the raw bytes.
- **Family B — no usable response was produced.** The call rejects with a member of the `PaypalError` set. `PaypalError` is **abstract**: use it for `instanceof`, never construct it.

Core types (public members with their declared types; all are `readonly`):

| Type | Public members | Source |
| --- | --- | --- |
| `ResponseError<P>` | `status: number` · `headers: Headers` · `payload: ErrorPayload<P>`, and a `message` of the form `<status> <statusText>` | `src/core/response-error.ts` |
| `Declared<K, B>` | `kind: K` · `body: B` | `src/core/response-error.ts` |
| `ErrorPayload<P>` | `P` or `{ kind: "undeclared"; rawBody: ArrayBuffer }` | `src/core/response-error.ts` |
| `PaypalError` (abstract; declared as `CoreError`) | `kind: ErrorKind` · `message` · `cause` | `src/core/errors.ts` |
| `SchemaError` | `kind: "schema"` · `rawBody: unknown` | `src/core/validation/schema-error.ts` |
| `AuthError` | `kind: "auth"` · `failures: readonly unknown[]` | `src/core/errors.ts` |
| `ApiResult<T, E>` | on success `{ ok: true; status; headers; value: T }`, on failure `{ ok: false; status; headers; errorMessage: string; error }` — `error` carries the **payload**, not the error object | `src/core/api-promise.ts` |

`ErrorKind` is one value per Family B class: `connection` (the `fetch` call rejected, or the body read failed mid-stream), `timeout` (the client-level timeout elapsed), `abort` (the per-call signal aborted, including one that was already aborted), `sdk` (a defect on the SDK side), `schema` (a value failed its schema in **either** direction — inbound the response body was malformed, outbound nothing was sent at all), and `auth` (a credential could not be **obtained**).

**`AuthError` is about obtaining a credential, never about being refused one.** A 401 *from the API* is a Family A `ResponseError` like any other status, so the two are disjoint and one `catch` arm cannot absorb the other. A 401 does have one auth consequence: it invalidates whatever that operation's scheme had cached, so the **next** call re-acquires. The current request is not retried — see Servers & auth.

```ts
try {
  const response = await client.orders.authorizeOrder({ id });
} catch (err) {
  if (err instanceof ResponseError) {
    // TODO: the API answered with an error status — read err.status and err.payload
  }
  if (err instanceof PaypalError) {
    // TODO: no usable response was produced — err.kind says which
  }
}
```

A typed subclass narrows further, on `err.payload.kind`. Which arms an operation declares, with the status each covers, is the **Error arms** bullet on its page below.

**Matcher precedence** for a subclass with several arms: an exact numeric status is looked up across the whole table **first**; only then does the first covering wildcard or range win.

**The non-throwing form exists on every operation.** `.asApiResult()` returns `ApiResult<T, E>` and does **not** reject for an HTTP error status — it still rejects for Family B. It must be called on the value the operation returned: `ApiPromise` overrides `Symbol.species`, so `.then()`, `.catch()` and `.finally()` hand back a plain `Promise` and the method is gone.

Of **40 operations**, **40** declare typed error bodies and **0** reject with the base `ResponseError`, whose payload is always the `"undeclared"` arm.

---

## Operations — by resource (5 groups, 40 operations)

Each page below carries one block per operation, with bullets in the fixed order **Server**, **Signature**, **Wire**, **Auth**, **Request body**, **SDK-sent**, **Returns**, **Error**, **Error arms**, then a **Fields** table mapping every request field to the channel it travels on, and a **Type sources** table naming the declaring file and schema value of every type the operation mentions. With `api-reference.md` documenting operations only, that table is the route from an operation to the file declaring what it takes.

**Each block states what is specific to its operation. Everything in the table below holds for EVERY operation unless that operation says otherwise, so a block silent on one of these points is telling you the default here applies — take it and move on rather than opening the source to confirm it.**

| Applies to every operation | Stated where | A block departs from it only by |
| --- | --- | --- |
| **Call shape `op(request, options?)`** — one flat request object first, the per-call options second. There is no positional overload, and no per-call base URL, header, timeout, retry or auth override | here, Getting a client | never — it always holds |
| **The request object is flat and channel-blind.** A field named `body` *is* the whole request body; every other field is fanned out to path, query, header or form by the SDK. Nothing in the object is nested by channel | here | never — the **Fields** table `Channel` column always resolves it |
| **Throw-based, returning `ApiPromise<T, E>`.** `await` it for `T`; call `.asApiResult()` on the returned value for the non-throwing `ApiResult<T, E>`. No operation is result-only | here, Error-handling model | never |
| **`E` is the base `ResponseError`** and the payload is always the `"undeclared"` arm | Error-handling model | the spec declared error bodies — the **Error** bullet names a subclass and an **Error arms** bullet gives each arm's tag, status and body |
| **The request body and its media type are stated on every block**, by a **Request body** bullet that is never omitted. `none` means no body **and no `Content-Type` header** | here | never — the bullet is always present |
| **Resolves once, to one whole value.** No pagination, no streaming, no SSE, no async iterables, no partial results, no multipart and no binary anywhere | here, Not on this SDK | never at this SDK version |
| **Server group `default`** | here, Servers & auth | the operation is on another group — its block carries a **Server** bullet |
| **Every operation states its auth requirement**, by an **Auth** bullet that is never omitted — one scheme, a composition over schemes, or `none` for a public operation | here, Servers & auth | never — the bullet is always present |
| **Every value is schema-encoded before the request is built** — a wrong type or format rejects and nothing is sent. **An omitted field that has a default is still sent, with that default**, filled by the SDK rather than by the server | here, Models | the field has a default — it appears in the **Fields** table `Default` column |
| **Field names are TypeScript camelCase and the wire name is the same** | here | some field differs — the **Fields** table gains a `Wire` column, where an em dash means "same as the field name" |
| **Arrays repeat their key and objects bracket-expand** | the serialization block below | never — this SDK declares no per-field serialization style, so every array takes this one |

**Wire serialization, once, for every channel** (source: `src/core/param-value.ts`, `src/core/url.ts`, `src/core/headers.ts`, `src/core/params.ts`). This block ships with `src/core/` and is versioned with it:

- **`path`** takes no style. An array is comma-joined with each element percent-encoded **separately**; an object becomes one percent-encoded JSON document inside the segment. A field whose encoded value is `undefined` throws `SdkError` naming the unfilled placeholder; `null` collapses the segment.
- **`header`** takes no style. An array is comma-joined un-encoded (OpenAPI `simple`). `undefined` says nothing, while `null` and an empty array are tombstones that remove the header. Later layers win by **lowercased** name, in the order body content type, then client defaults, then operation.
- **`query`** and **`form`** repeat an array's key and bracket-expand an object at any depth (`filter[status]=open`, `ranges[amount][min]=10`). An array of *objects* bracket-expands per element with **no index**, so element boundaries collapse.
- Nullish **fields** are dropped from every channel except `path`, where `null` collapses the segment. A nullish array **element** is dropped, so an all-nullish array emits no key at all.
- `form` bodies use RFC 1866 encoding (space becomes `+`); `query` uses `%20`. On the wire both key and value go through `encodeURIComponent`, plus a further escape of `!`, `'`, `(`, `)` and `*`.

**The verb and route are on the pages below**, where a map for a language whose method names are derived from the route can leave them to the source. A TypeScript method name carries none of it, and a `path` field row is unreadable without the route template it fills.

**Endpoint prose is not on this map.** Where the *semantics* of an operation decide what you must pass — a field whose value changes server-side behaviour, an ordering or exclusivity rule between fields — read `api-reference.md`, whose entries are keyed by the same signature these pages print. Blocks here give you the contract: names, channels, types, defaults, errors.

| Resource (`client.X`) | Ops | Page |
| --- | --- | --- |
| `orders` | 8 | [map/operations/orders.md](map/operations/orders.md) |
| `payments` | 7 | [map/operations/payments.md](map/operations/payments.md) |
| `vault` | 6 | [map/operations/vault.md](map/operations/vault.md) |
| `transactionSearch` | 2 | [map/operations/transaction-search.md](map/operations/transaction-search.md) |
| `subscriptions` | 17 | [map/operations/subscriptions.md](map/operations/subscriptions.md) |

---

## Models — where they live, how to build them

**Shapes live only in the source.** Every module under `src/models/` declares exactly one model type and the schema value beside it, and both are re-exported from the package root. So there are two facts per type, and the map gives both: the **names you import** and the **file you read**.

```ts
import { type AvsCode, avsCodeSchema } from "paypal";
```

Take the pair from an operation's **Type sources** table. **Do not derive the path from the type name** — the transform is not reversible in general, and the table is the authority. There is no default export.

| Group | Count | Directory |
| --- | --- | --- |
| Objects | 284 | `src/models/` |
| Enums (open; const companion plus schema) | 87 | `src/models/` |

**Conventions.** Every model is a plain `type`, not a class — build one with an object literal; there is no constructor and no builder. `f: T` is required, `f?: T` is optional (omit the key), and `f: T | null` is a **required, nullable** field where `null` is a value distinct from an omitted key. Optional properties are declared `f?: T`, not `f?: T | undefined`, so under `exactOptionalPropertyTypes` you must **omit or spread** an absent field rather than assign `undefined` to it.

**Schema companions.** `Schema<T, W = Encoded<T>>` is `{ decode(v: unknown): T; encode(v: unknown): W }`, so a schema value is directly usable both ways. `Encoded<T>` is the wire projection — a `Date` becomes `string | number`, a `Uint8Array` becomes a base64 `string`, recursing through arrays and objects. `EnumSchema<T>` adds `readonly values: readonly T[]`, so an enum's known set is testable at run time.

**Enums are open, and are not TypeScript `enum`s.** Each is a `const` companion object plus a union that includes `(string & {})` or `(number & {})`, so **any** value of the right base type is assignable and the schema validates the base type only, never membership. That is deliberate: an unrecognized server value round-trips instead of throwing. Use `.values` to test membership yourself.

| Enum | Members (member to wire value) | Schema value |
| --- | --- | --- |
| `AvsCode` | `A` to `"A"` · `B` to `"B"` · `C` to `"C"` · `D` to `"D"` · `E` to `"E"` · `F` to `"F"` · `G` to `"G"` · `I` to `"I"` · `M` to `"M"` · `N` to `"N"` · `P` to `"P"` · `R` to `"R"` · `S` to `"S"` · `U` to `"U"` · `W` to `"W"` · `X` to `"X"` · `Y` to `"Y"` · `Z` to `"Z"` · `Null` to `"Null"` · `_0` to `"0"` · `_1` to `"1"` · `_2` to `"2"` · `_3` to `"3"` · `_4` to `"4"` | `avsCodeSchema` |
| `ApplePayPaymentDataType` | `_3Dsecure` to `"3DSECURE"` · `Emv` to `"EMV"` | `applePayPaymentDataTypeSchema` |
| `ApplicationContextUserAction` | `Continue` to `"CONTINUE"` · `SubscribeNow` to `"SUBSCRIBE_NOW"` | `applicationContextUserActionSchema` |
| `AuthorizationIncompleteReason` | `PendingReview` to `"PENDING_REVIEW"` · `DeclinedByRiskFraudFilters` to `"DECLINED_BY_RISK_FRAUD_FILTERS"` | `authorizationIncompleteReasonSchema` |
| `AuthorizationStatus` | `Created` to `"CREATED"` · `Captured` to `"CAPTURED"` · `Denied` to `"DENIED"` · `PartiallyCaptured` to `"PARTIALLY_CAPTURED"` · `Voided` to `"VOIDED"` · `Pending` to `"PENDING"` | `authorizationStatusSchema` |
| `CvvCode` | `E` to `"E"` · `I` to `"I"` · `M` to `"M"` · `N` to `"N"` · `P` to `"P"` · `S` to `"S"` · `U` to `"U"` · `X` to `"X"` · `AllOthers` to `"All others"` · `_0` to `"0"` · `_1` to `"1"` · `_2` to `"2"` · `_3` to `"3"` · `_4` to `"4"` | `cvvCodeSchema` |
| `CallbackEvents` | `ShippingAddress` to `"SHIPPING_ADDRESS"` · `ShippingOptions` to `"SHIPPING_OPTIONS"` | `callbackEventsSchema` |
| `CaptureIncompleteReason` | `BuyerComplaint` to `"BUYER_COMPLAINT"` · `Chargeback` to `"CHARGEBACK"` · `Echeck` to `"ECHECK"` · `InternationalWithdrawal` to `"INTERNATIONAL_WITHDRAWAL"` · `Other` to `"OTHER"` · `PendingReview` to `"PENDING_REVIEW"` · `ReceivingPreferenceMandatesManualAction` to `"RECEIVING_PREFERENCE_MANDATES_MANUAL_ACTION"` · `Refunded` to `"REFUNDED"` · `TransactionApprovedAwaitingFunding` to `"TRANSACTION_APPROVED_AWAITING_FUNDING"` · `Unilateral` to `"UNILATERAL"` · `VerificationRequired` to `"VERIFICATION_REQUIRED"` · `DeclinedByRiskFraudFilters` to `"DECLINED_BY_RISK_FRAUD_FILTERS"` | `captureIncompleteReasonSchema` |
| `CaptureStatus` | `Completed` to `"COMPLETED"` · `Declined` to `"DECLINED"` · `PartiallyRefunded` to `"PARTIALLY_REFUNDED"` · `Pending` to `"PENDING"` · `Refunded` to `"REFUNDED"` · `Failed` to `"FAILED"` | `captureStatusSchema` |
| `CaptureType` | `OutstandingBalance` to `"OUTSTANDING_BALANCE"` | `captureTypeSchema` |
| `CardBrand` | `Visa` to `"VISA"` · `Mastercard` to `"MASTERCARD"` · `Discover` to `"DISCOVER"` · `Amex` to `"AMEX"` · `Solo` to `"SOLO"` · `Jcb` to `"JCB"` · `Star` to `"STAR"` · `Delta` to `"DELTA"` · `Switch` to `"SWITCH"` · `Maestro` to `"MAESTRO"` · `CbNationale` to `"CB_NATIONALE"` · `Configoga` to `"CONFIGOGA"` · `Confidis` to `"CONFIDIS"` · `Electron` to `"ELECTRON"` · `Cetelem` to `"CETELEM"` · `ChinaUnionPay` to `"CHINA_UNION_PAY"` · `Diners` to `"DINERS"` · `Elo` to `"ELO"` · `Hiper` to `"HIPER"` · `Hipercard` to `"HIPERCARD"` · `Rupay` to `"RUPAY"` · `Ge` to `"GE"` · `Synchrony` to `"SYNCHRONY"` · `Eftpos` to `"EFTPOS"` · `CarteBancaire` to `"CARTE_BANCAIRE"` · `StarAccess` to `"STAR_ACCESS"` · `Pulse` to `"PULSE"` · `Nyce` to `"NYCE"` · `Accel` to `"ACCEL"` · `Unknown` to `"UNKNOWN"` | `cardBrandSchema` |
| `CardType` | `Credit` to `"CREDIT"` · `Debit` to `"DEBIT"` · `Prepaid` to `"PREPAID"` · `Store` to `"STORE"` · `Unknown` to `"UNKNOWN"` | `cardTypeSchema` |
| `CardVerificationStatus` | `Verified` to `"VERIFIED"` · `Failed` to `"FAILED"` | `cardVerificationStatusSchema` |
| `CheckoutPaymentIntent` | `Capture` to `"CAPTURE"` · `Authorize` to `"AUTHORIZE"` | `checkoutPaymentIntentSchema` |
| `DisbursementMode` | `Instant` to `"INSTANT"` · `Delayed` to `"DELAYED"` | `disbursementModeSchema` |
| `DisputeCategory` | `ItemNotReceived` to `"ITEM_NOT_RECEIVED"` · `UnauthorizedTransaction` to `"UNAUTHORIZED_TRANSACTION"` | `disputeCategorySchema` |
| `EciFlag` | `MastercardNon3DSecureTransaction` to `"MASTERCARD_NON_3D_SECURE_TRANSACTION"` · `MastercardAttemptedAuthenticationTransaction` to `"MASTERCARD_ATTEMPTED_AUTHENTICATION_TRANSACTION"` · `MastercardFullyAuthenticatedTransaction` to `"MASTERCARD_FULLY_AUTHENTICATED_TRANSACTION"` · `FullyAuthenticatedTransaction` to `"FULLY_AUTHENTICATED_TRANSACTION"` · `AttemptedAuthenticationTransaction` to `"ATTEMPTED_AUTHENTICATION_TRANSACTION"` · `Non3DSecureTransaction` to `"NON_3D_SECURE_TRANSACTION"` | `eciFlagSchema` |
| `EnrollmentStatus` | `Y` to `"Y"` · `N` to `"N"` · `U` to `"U"` · `B` to `"B"` | `enrollmentStatusSchema` |
| `ExperienceContextShippingPreference` | `GetFromFile` to `"GET_FROM_FILE"` · `NoShipping` to `"NO_SHIPPING"` · `SetProvidedAddress` to `"SET_PROVIDED_ADDRESS"` | `experienceContextShippingPreferenceSchema` |
| `ExperienceStatus` | `NotStarted` to `"NOT_STARTED"` · `InProgress` to `"IN_PROGRESS"` · `Canceled` to `"CANCELED"` · `Approved` to `"APPROVED"` | `experienceStatusSchema` |
| `FulfillmentType` | `Shipping` to `"SHIPPING"` · `PickupInPerson` to `"PICKUP_IN_PERSON"` · `PickupInStore` to `"PICKUP_IN_STORE"` · `PickupFromPerson` to `"PICKUP_FROM_PERSON"` | `fulfillmentTypeSchema` |
| `GooglePayAuthenticationMethod` | `PanOnly` to `"PAN_ONLY"` · `Cryptogram3Ds` to `"CRYPTOGRAM_3DS"` | `googlePayAuthenticationMethodSchema` |
| `GooglePayPaymentMethod` | `Card` to `"CARD"` | `googlePayPaymentMethodSchema` |
| `IntervalUnit` | `Day` to `"DAY"` · `Week` to `"WEEK"` · `Month` to `"MONTH"` · `Year` to `"YEAR"` | `intervalUnitSchema` |
| `ItemCategory` | `DigitalGoods` to `"DIGITAL_GOODS"` · `PhysicalGoods` to `"PHYSICAL_GOODS"` · `Donation` to `"DONATION"` | `itemCategorySchema` |
| `LiabilityShiftIndicator` | `No` to `"NO"` · `Possible` to `"POSSIBLE"` · `Unknown` to `"UNKNOWN"` | `liabilityShiftIndicatorSchema` |
| `LinkHttpMethod` | `Get` to `"GET"` · `Post` to `"POST"` · `Put` to `"PUT"` · `Delete` to `"DELETE"` · `Head` to `"HEAD"` · `Connect` to `"CONNECT"` · `Options` to `"OPTIONS"` · `Patch` to `"PATCH"` | `linkHttpMethodSchema` |
| `MobileReturnFlow` | `Auto` to `"AUTO"` · `Manual` to `"MANUAL"` | `mobileReturnFlowSchema` |
| `OsType` | `Android` to `"ANDROID"` · `Ios` to `"IOS"` · `Other` to `"OTHER"` | `osTypeSchema` |
| `OrderApplicationContextLandingPage` | `Login` to `"LOGIN"` · `Billing` to `"BILLING"` · `NoPreference` to `"NO_PREFERENCE"` | `orderApplicationContextLandingPageSchema` |
| `OrderApplicationContextShippingPreference` | `GetFromFile` to `"GET_FROM_FILE"` · `NoShipping` to `"NO_SHIPPING"` · `SetProvidedAddress` to `"SET_PROVIDED_ADDRESS"` | `orderApplicationContextShippingPreferenceSchema` |
| `OrderApplicationContextUserAction` | `Continue` to `"CONTINUE"` · `PayNow` to `"PAY_NOW"` | `orderApplicationContextUserActionSchema` |
| `OrderStatus` | `Created` to `"CREATED"` · `Saved` to `"SAVED"` · `Approved` to `"APPROVED"` · `Voided` to `"VOIDED"` · `Completed` to `"COMPLETED"` · `PayerActionRequired` to `"PAYER_ACTION_REQUIRED"` | `orderStatusSchema` |
| `OrderTrackerStatus` | `Cancelled` to `"CANCELLED"` · `Shipped` to `"SHIPPED"` | `orderTrackerStatusSchema` |
| `OrdersCardVerificationMethod` | `ScaAlways` to `"SCA_ALWAYS"` · `ScaWhenRequired` to `"SCA_WHEN_REQUIRED"` · `_3DSecure` to `"3D_SECURE"` · `AvsCvv` to `"AVS_CVV"` | `ordersCardVerificationMethodSchema` |
| `PaResStatus` | `Y` to `"Y"` · `N` to `"N"` · `U` to `"U"` · `A` to `"A"` · `C` to `"C"` · `R` to `"R"` · `D` to `"D"` · `I` to `"I"` | `paResStatusSchema` |
| `PatchOp` | `Add` to `"add"` · `Remove` to `"remove"` · `Replace` to `"replace"` · `Move` to `"move"` · `Copy` to `"copy"` · `Test` to `"test"` | `patchOpSchema` |
| `PayPalExperienceLandingPage` | `Login` to `"LOGIN"` · `GuestCheckout` to `"GUEST_CHECKOUT"` · `NoPreference` to `"NO_PREFERENCE"` · `Billing` to `"BILLING"` | `payPalExperienceLandingPageSchema` |
| `PayPalExperienceUserAction` | `Continue` to `"CONTINUE"` · `PayNow` to `"PAY_NOW"` | `payPalExperienceUserActionSchema` |
| `PayPalPaymentTokenCustomerType` | `Consumer` to `"CONSUMER"` · `Business` to `"BUSINESS"` | `payPalPaymentTokenCustomerTypeSchema` |
| `PayPalPaymentTokenUsageType` | `Merchant` to `"MERCHANT"` · `Platform` to `"PLATFORM"` | `payPalPaymentTokenUsageTypeSchema` |
| `PayPalReferenceIdType` | `Odr` to `"ODR"` · `Txn` to `"TXN"` · `Sub` to `"SUB"` · `Pap` to `"PAP"` | `payPalReferenceIdTypeSchema` |
| `PayPalWalletAccountVerificationStatus` | `Verified` to `"VERIFIED"` · `Unverified` to `"UNVERIFIED"` | `payPalWalletAccountVerificationStatusSchema` |
| `PayPalWalletContactPreference` | `NoContactInfo` to `"NO_CONTACT_INFO"` · `UpdateContactInfo` to `"UPDATE_CONTACT_INFO"` · `RetainContactInfo` to `"RETAIN_CONTACT_INFO"` | `payPalWalletContactPreferenceSchema` |
| `PayPalWalletContextShippingPreference` | `GetFromFile` to `"GET_FROM_FILE"` · `NoShipping` to `"NO_SHIPPING"` · `SetProvidedAddress` to `"SET_PROVIDED_ADDRESS"` | `payPalWalletContextShippingPreferenceSchema` |
| `PayPalWalletVaultStatus` | `Vaulted` to `"VAULTED"` · `Created` to `"CREATED"` · `Approved` to `"APPROVED"` | `payPalWalletVaultStatusSchema` |
| `PayeePaymentMethodPreference` | `Unrestricted` to `"UNRESTRICTED"` · `ImmediatePaymentRequired` to `"IMMEDIATE_PAYMENT_REQUIRED"` | `payeePaymentMethodPreferenceSchema` |
| `PaymentAdviceCode` | `_01` to `"01"` · `_02` to `"02"` · `_03` to `"03"` · `_04` to `"04"` · `_21` to `"21"` · `_22` to `"22"` · `_24` to `"24"` · `_25` to `"25"` · `_26` to `"26"` · `_27` to `"27"` · `_28` to `"28"` · `_29` to `"29"` · `_30` to `"30"` · `_40` to `"40"` · `_43` to `"43"` | `paymentAdviceCodeSchema` |
| `PaymentInitiator` | `Customer` to `"CUSTOMER"` · `Merchant` to `"MERCHANT"` | `paymentInitiatorSchema` |
| `PaymentTokenStatus` | `Created` to `"CREATED"` · `PayerActionRequired` to `"PAYER_ACTION_REQUIRED"` · `Approved` to `"APPROVED"` · `Vaulted` to `"VAULTED"` · `Tokenized` to `"TOKENIZED"` | `paymentTokenStatusSchema` |
| `PhoneType` | `Fax` to `"FAX"` · `Home` to `"HOME"` · `Mobile` to `"MOBILE"` · `Other` to `"OTHER"` · `Pager` to `"PAGER"` | `phoneTypeSchema` |
| `PlanRequestStatus` | `Created` to `"CREATED"` · `Inactive` to `"INACTIVE"` · `Active` to `"ACTIVE"` | `planRequestStatusSchema` |
| `PricingModel` | `Fixed` to `"FIXED"` · `Variable` to `"VARIABLE"` · `AutoReload` to `"AUTO_RELOAD"` | `pricingModelSchema` |
| `ProcessingInstruction` | `OrderCompleteOnPaymentApproval` to `"ORDER_COMPLETE_ON_PAYMENT_APPROVAL"` | `processingInstructionSchema` |
| `ProcessorResponseCode` | `_0000` to `"0000"` · `_00N7` to `"00N7"` · `_0100` to `"0100"` · `_0390` to `"0390"` · `_0500` to `"0500"` · `_0580` to `"0580"` · `_0800` to `"0800"` · `_0880` to `"0880"` · `_0890` to `"0890"` · `_0960` to `"0960"` · `_0R00` to `"0R00"` · `_1000` to `"1000"` · `_10Br` to `"10BR"` · `_1300` to `"1300"` · `_1310` to `"1310"` · `_1312` to `"1312"` · `_1317` to `"1317"` · `_1320` to `"1320"` · `_1330` to `"1330"` · `_1335` to `"1335"` · `_1340` to `"1340"` · `_1350` to `"1350"` · `_1352` to `"1352"` · `_1360` to `"1360"` · `_1370` to `"1370"` · `_1380` to `"1380"` · `_1382` to `"1382"` · `_1384` to `"1384"` · `_1390` to `"1390"` · `_1393` to `"1393"` · `_5100` to `"5100"` · `_5110` to `"5110"` · `_5120` to `"5120"` · `_5130` to `"5130"` · `_5135` to `"5135"` · `_5140` to `"5140"` · `_5150` to `"5150"` · `_5160` to `"5160"` · `_5170` to `"5170"` · `_5180` to `"5180"` · `_5190` to `"5190"` · `_5200` to `"5200"` · `_5210` to `"5210"` · `_5400` to `"5400"` · `_5500` to `"5500"` · `_5650` to `"5650"` · `_5700` to `"5700"` · `_5710` to `"5710"` · `_5800` to `"5800"` · `_5900` to `"5900"` · `_5910` to `"5910"` · `_5920` to `"5920"` · `_5930` to `"5930"` · `_5950` to `"5950"` · `_6300` to `"6300"` · `_7600` to `"7600"` · `_7700` to `"7700"` · `_7710` to `"7710"` · `_7800` to `"7800"` · `_7900` to `"7900"` · `_8000` to `"8000"` · `_8010` to `"8010"` · `_8020` to `"8020"` · `_8030` to `"8030"` · `_8100` to `"8100"` · `_8110` to `"8110"` · `_8220` to `"8220"` · `_9100` to `"9100"` · `_9500` to `"9500"` · `_9510` to `"9510"` · `_9520` to `"9520"` · `_9530` to `"9530"` · `_9540` to `"9540"` · `_9600` to `"9600"` · `Pcnr` to `"PCNR"` · `Pcvv` to `"PCVV"` · `Pp06` to `"PP06"` · `Pprn` to `"PPRN"` · `Ppad` to `"PPAD"` · `Ppab` to `"PPAB"` · `Ppae` to `"PPAE"` · `Ppag` to `"PPAG"` · `Ppai` to `"PPAI"` · `Ppar` to `"PPAR"` · `Ppau` to `"PPAU"` · `Ppav` to `"PPAV"` · `Ppax` to `"PPAX"` · `Ppbg` to `"PPBG"` · `Ppc2` to `"PPC2"` · `Ppce` to `"PPCE"` · `Ppco` to `"PPCO"` · `Ppcr` to `"PPCR"` · `Ppct` to `"PPCT"` · `Ppcu` to `"PPCU"` · `Ppd3` to `"PPD3"` · `Ppdc` to `"PPDC"` · `Ppdi` to `"PPDI"` · `Ppdv` to `"PPDV"` · `Ppdt` to `"PPDT"` · `Ppef` to `"PPEF"` · `Ppel` to `"PPEL"` · `Pper` to `"PPER"` · `Ppex` to `"PPEX"` · `Ppfe` to `"PPFE"` · `Ppfi` to `"PPFI"` · `Ppfr` to `"PPFR"` · `Ppfv` to `"PPFV"` · `Ppgr` to `"PPGR"` · `Pph1` to `"PPH1"` · `Ppif` to `"PPIF"` · `Ppii` to `"PPII"` · `Ppim` to `"PPIM"` · `Ppit` to `"PPIT"` · `Pplr` to `"PPLR"` · `Ppls` to `"PPLS"` · `Ppmb` to `"PPMB"` · `Ppmc` to `"PPMC"` · `Ppmd` to `"PPMD"` · `Ppnc` to `"PPNC"` · `Ppnl` to `"PPNL"` · `Ppnm` to `"PPNM"` · `Ppnt` to `"PPNT"` · `Ppph` to `"PPPH"` · `Pppi` to `"PPPI"` · `Pppm` to `"PPPM"` · `Ppqc` to `"PPQC"` · `Ppre` to `"PPRE"` · `Pprf` to `"PPRF"` · `Pprr` to `"PPRR"` · `Pps0` to `"PPS0"` · `Pps1` to `"PPS1"` · `Pps2` to `"PPS2"` · `Pps3` to `"PPS3"` · `Pps4` to `"PPS4"` · `Pps5` to `"PPS5"` · `Pps6` to `"PPS6"` · `Ppsc` to `"PPSC"` · `Ppsd` to `"PPSD"` · `Ppse` to `"PPSE"` · `Ppte` to `"PPTE"` · `Pptf` to `"PPTF"` · `Ppti` to `"PPTI"` · `Pptr` to `"PPTR"` · `Pptt` to `"PPTT"` · `Pptv` to `"PPTV"` · `Ppua` to `"PPUA"` · `Ppuc` to `"PPUC"` · `Ppue` to `"PPUE"` · `Ppui` to `"PPUI"` · `Ppup` to `"PPUP"` · `Ppur` to `"PPUR"` · `Ppvc` to `"PPVC"` · `Ppve` to `"PPVE"` · `Ppvt` to `"PPVT"` | `processorResponseCodeSchema` |
| `ReasonCode` | `PaymentDenied` to `"PAYMENT_DENIED"` · `InternalServerError` to `"INTERNAL_SERVER_ERROR"` · `PayeeAccountRestricted` to `"PAYEE_ACCOUNT_RESTRICTED"` · `PayerAccountRestricted` to `"PAYER_ACCOUNT_RESTRICTED"` · `PayerCannotPay` to `"PAYER_CANNOT_PAY"` · `SendingLimitExceeded` to `"SENDING_LIMIT_EXCEEDED"` · `TransactionReceivingLimitExceeded` to `"TRANSACTION_RECEIVING_LIMIT_EXCEEDED"` · `CurrencyMismatch` to `"CURRENCY_MISMATCH"` | `reasonCodeSchema` |
| `RefundIncompleteReason` | `Echeck` to `"ECHECK"` | `refundIncompleteReasonSchema` |
| `RefundStatus` | `Cancelled` to `"CANCELLED"` · `Failed` to `"FAILED"` · `Pending` to `"PENDING"` · `Completed` to `"COMPLETED"` | `refundStatusSchema` |
| `ReturnFlow` | `Auto` to `"AUTO"` · `Manual` to `"MANUAL"` | `returnFlowSchema` |
| `SellerProtectionStatus` | `Eligible` to `"ELIGIBLE"` · `PartiallyEligible` to `"PARTIALLY_ELIGIBLE"` · `NotEligible` to `"NOT_ELIGIBLE"` | `sellerProtectionStatusSchema` |
| `SetupFeeFailureAction` | `Continue` to `"CONTINUE"` · `Cancel` to `"CANCEL"` | `setupFeeFailureActionSchema` |
| `ShipmentCarrier` | `DpdRu` to `"DPD_RU"` · `BgBulgarianPost` to `"BG_BULGARIAN_POST"` · `KrKoreaPost` to `"KR_KOREA_POST"` · `ZaCourierit` to `"ZA_COURIERIT"` · `FrExapaq` to `"FR_EXAPAQ"` · `AreEmiratesPost` to `"ARE_EMIRATES_POST"` · `Gac` to `"GAC"` · `Geis` to `"GEIS"` · `SfEx` to `"SF_EX"` · `Pago` to `"PAGO"` · `Myhermes` to `"MYHERMES"` · `DiamondEurogistics` to `"DIAMOND_EUROGISTICS"` · `CorporatecouriersWebhook` to `"CORPORATECOURIERS_WEBHOOK"` · `Bond` to `"BOND"` · `Omniparcel` to `"OMNIPARCEL"` · `SkPosta` to `"SK_POSTA"` · `Purolator` to `"PUROLATOR"` · `FetchrWebhook` to `"FETCHR_WEBHOOK"` · `Thedeliverygroup` to `"THEDELIVERYGROUP"` · `CelloSquare` to `"CELLO_SQUARE"` · `Tarrive` to `"TARRIVE"` · `Collivery` to `"COLLIVERY"` · `Mainfreight` to `"MAINFREIGHT"` · `IndFirstflight` to `"IND_FIRSTFLIGHT"` · `Acsworldwide` to `"ACSWORLDWIDE"` · `Amstan` to `"AMSTAN"` · `Okayparcel` to `"OKAYPARCEL"` · `EnvialiaReference` to `"ENVIALIA_REFERENCE"` · `SeurEs` to `"SEUR_ES"` · `Continental` to `"CONTINENTAL"` · `Fdsexpress` to `"FDSEXPRESS"` · `AmazonFbaSwiship` to `"AMAZON_FBA_SWISHIP"` · `Wyngs` to `"WYNGS"` · `DhlActiveTracing` to `"DHL_ACTIVE_TRACING"` · `Zyllem` to `"ZYLLEM"` · `Ruston` to `"RUSTON"` · `Xpost` to `"XPOST"` · `CorreosEs` to `"CORREOS_ES"` · `DhlFr` to `"DHL_FR"` · `PanAsia` to `"PAN_ASIA"` · `BrtIt` to `"BRT_IT"` · `SreKorea` to `"SRE_KOREA"` · `Speedee` to `"SPEEDEE"` · `TntUk` to `"TNT_UK"` · `Venipak` to `"VENIPAK"` · `Shreenandancourier` to `"SHREENANDANCOURIER"` · `Croshot` to `"CROSHOT"` · `NipostNg` to `"NIPOST_NG"` · `EpstGlbl` to `"EPST_GLBL"` · `Newgistics` to `"NEWGISTICS"` · `PostSlovenia` to `"POST_SLOVENIA"` · `JerseyPost` to `"JERSEY_POST"` · `Bombinoexp` to `"BOMBINOEXP"` · `Wmg` to `"WMG"` · `XqExpress` to `"XQ_EXPRESS"` · `Furdeco` to `"FURDECO"` · `LhtExpress` to `"LHT_EXPRESS"` · `SouthAfricanPostOffice` to `"SOUTH_AFRICAN_POST_OFFICE"` · `Spoton` to `"SPOTON"` · `Dimerco` to `"DIMERCO"` · `CyprusPostCyp` to `"CYPRUS_POST_CYP"` · `Abcustom` to `"ABCUSTOM"` · `IndDelivree` to `"IND_DELIVREE"` · `CnBestexpress` to `"CN_BESTEXPRESS"` · `DxSftp` to `"DX_SFTP"` · `PickuppMys` to `"PICKUPP_MYS"` · `Fmx` to `"FMX"` · `Hellmann` to `"HELLMANN"` · `ShipItAsia` to `"SHIP_IT_ASIA"` · `KerryEcommerce` to `"KERRY_ECOMMERCE"` · `Freterapido` to `"FRETERAPIDO"` · `PitneyBowes` to `"PITNEY_BOWES"` · `XpressenDk` to `"XPRESSEN_DK"` · `SeurSpApi` to `"SEUR_SP_API"` · `Deliveryontime` to `"DELIVERYONTIME"` · `Jinsung` to `"JINSUNG"` · `TransKargo` to `"TRANS_KARGO"` · `SwishipDe` to `"SWISHIP_DE"` · `IvoyWebhook` to `"IVOY_WEBHOOK"` · `AirmeeWebhook` to `"AIRMEE_WEBHOOK"` · `DhlBenelux` to `"DHL_BENELUX"` · `Firstmile` to `"FIRSTMILE"` · `FastwayIr` to `"FASTWAY_IR"` · `HhExp` to `"HH_EXP"` · `MysMypostOnline` to `"MYS_MYPOST_ONLINE"` · `TntNl` to `"TNT_NL"` · `Tipsa` to `"TIPSA"` · `TaqbinMy` to `"TAQBIN_MY"` · `Kgmhub` to `"KGMHUB"` · `Intexpress` to `"INTEXPRESS"` · `OverseExp` to `"OVERSE_EXP"` · `Oneclick` to `"ONECLICK"` · `RoadrunnerFreight` to `"ROADRUNNER_FREIGHT"` · `GlsCrotia` to `"GLS_CROTIA"` · `MrwFtp` to `"MRW_FTP"` · `Bluex` to `"BLUEX"` · `Dylt` to `"DYLT"` · `DpdIr` to `"DPD_IR"` · `SinGlbl` to `"SIN_GLBL"` · `TuffnellsReference` to `"TUFFNELLS_REFERENCE"` · `Cjpacket` to `"CJPACKET"` · `Milkman` to `"MILKMAN"` · `Asigna` to `"ASIGNA"` · `Oneworldexpress` to `"ONEWORLDEXPRESS"` · `RoyalMail` to `"ROYAL_MAIL"` · `ViaExpress` to `"VIA_EXPRESS"` · `Tigfreight` to `"TIGFREIGHT"` · `ZtoExpress` to `"ZTO_EXPRESS"` · `TwoGo` to `"TWO_GO"` · `Iml` to `"IML"` · `IntelValley` to `"INTEL_VALLEY"` · `Efs` to `"EFS"` · `UkUkMail` to `"UK_UK_MAIL"` · `Ram` to `"RAM"` · `Alliedexpress` to `"ALLIEDEXPRESS"` · `ApcOvernight` to `"APC_OVERNIGHT"` · `Shippit` to `"SHIPPIT"` · `Tfm` to `"TFM"` · `MXpress` to `"M_XPRESS"` · `HdbBox` to `"HDB_BOX"` · `ClevyLinks` to `"CLEVY_LINKS"` · `Ibeone` to `"IBEONE"` · `FiegeNl` to `"FIEGE_NL"` · `KweGlobal` to `"KWE_GLOBAL"` · `CtcExpress` to `"CTC_EXPRESS"` · `Amazon` to `"AMAZON"` · `MoreLink` to `"MORE_LINK"` · `Jx` to `"JX"` · `EasyMail` to `"EASY_MAIL"` · `Aduiepyle` to `"ADUIEPYLE"` · `GbPanther` to `"GB_PANTHER"` · `Expresssale` to `"EXPRESSSALE"` · `SgDetrack` to `"SG_DETRACK"` · `TrunkrsWebhook` to `"TRUNKRS_WEBHOOK"` · `Matdespatch` to `"MATDESPATCH"` · `Dicom` to `"DICOM"` · `Mbw` to `"MBW"` · `KhmCambodiaPost` to `"KHM_CAMBODIA_POST"` · `Sinotrans` to `"SINOTRANS"` · `BrtItParcelid` to `"BRT_IT_PARCELID"` · `DhlSupplyChain` to `"DHL_SUPPLY_CHAIN"` · `DhlPl` to `"DHL_PL"` · `Topyou` to `"TOPYOU"` · `Palexpress` to `"PALEXPRESS"` · `DhlSg` to `"DHL_SG"` · `CnWedo` to `"CN_WEDO"` · `Fulfillme` to `"FULFILLME"` · `DpdDelistrack` to `"DPD_DELISTRACK"` · `UpsReference` to `"UPS_REFERENCE"` · `Caribou` to `"CARIBOU"` · `LocusWebhook` to `"LOCUS_WEBHOOK"` · `Dsv` to `"DSV"` · `P2PTrc` to `"P2P_TRC"` · `Directparcels` to `"DIRECTPARCELS"` · `NovaPoshtaInt` to `"NOVA_POSHTA_INT"` · `FedexPoland` to `"FEDEX_POLAND"` · `CnJcex` to `"CN_JCEX"` · `FarInternational` to `"FAR_INTERNATIONAL"` · `Idexpress` to `"IDEXPRESS"` · `Gangbao` to `"GANGBAO"` · `Neway` to `"NEWAY"` · `PostnlInt3S` to `"POSTNL_INT_3_S"` · `RpxId` to `"RPX_ID"` · `DesignertransportWebhook` to `"DESIGNERTRANSPORT_WEBHOOK"` · `GlsSloven` to `"GLS_SLOVEN"` · `ParcelledIn` to `"PARCELLED_IN"` · `GsiExpress` to `"GSI_EXPRESS"` · `ConWay` to `"CON_WAY"` · `BrouwerTransport` to `"BROUWER_TRANSPORT"` · `Cpex` to `"CPEX"` · `IsraelPost` to `"ISRAEL_POST"` · `DtdcIn` to `"DTDC_IN"` · `PttPost` to `"PTT_POST"` · `XdeWebhook` to `"XDE_WEBHOOK"` · `Tolos` to `"TOLOS"` · `GiaoHang` to `"GIAO_HANG"` · `GeodisEspace` to `"GEODIS_ESPACE"` · `MagyarHu` to `"MAGYAR_HU"` · `DoordashWebhook` to `"DOORDASH_WEBHOOK"` · `TikiId` to `"TIKI_ID"` · `CjHkInternational` to `"CJ_HK_INTERNATIONAL"` · `StarTrackExpress` to `"STAR_TRACK_EXPRESS"` · `Helthjem` to `"HELTHJEM"` · `Sfb2C` to `"SFB2C"` · `Freightquote` to `"FREIGHTQUOTE"` · `LandmarkGlobalReference` to `"LANDMARK_GLOBAL_REFERENCE"` · `Parcel2Go` to `"PARCEL2GO"` · `Delnext` to `"DELNEXT"` · `Rcl` to `"RCL"` · `CgsExpress` to `"CGS_EXPRESS"` · `HkPost` to `"HK_POST"` · `SapExpress` to `"SAP_EXPRESS"` · `ParcelpostSg` to `"PARCELPOST_SG"` · `Hermes` to `"HERMES"` · `IndSafeexpress` to `"IND_SAFEEXPRESS"` · `Tophatterexpress` to `"TOPHATTEREXPRESS"` · `Mglobal` to `"MGLOBAL"` · `Averitt` to `"AVERITT"` · `Leader` to `"LEADER"` · `_2Ebox` to `"_2EBOX"` · `SgSpeedpost` to `"SG_SPEEDPOST"` · `DbschenkerSe` to `"DBSCHENKER_SE"` · `IsrPostDomestic` to `"ISR_POST_DOMESTIC"` · `Bestwayparcel` to `"BESTWAYPARCEL"` · `AsendiaDe` to `"ASENDIA_DE"` · `NightlineUk` to `"NIGHTLINE_UK"` · `TaqbinSg` to `"TAQBIN_SG"` · `TckExpress` to `"TCK_EXPRESS"` · `EndeavourDelivery` to `"ENDEAVOUR_DELIVERY"` · `Nanjingwoyuan` to `"NANJINGWOYUAN"` · `HeppnerFr` to `"HEPPNER_FR"` · `EmpsCn` to `"EMPS_CN"` · `Fonsen` to `"FONSEN"` · `Pickrr` to `"PICKRR"` · `ApcOvernightConnum` to `"APC_OVERNIGHT_CONNUM"` · `StarTrackNextFlight` to `"STAR_TRACK_NEXT_FLIGHT"` · `Dajin` to `"DAJIN"` · `UpsFreight` to `"UPS_FREIGHT"` · `PostaPlus` to `"POSTA_PLUS"` · `Ceva` to `"CEVA"` · `Anserx` to `"ANSERX"` · `JsExpress` to `"JS_EXPRESS"` · `Padtf` to `"PADTF"` · `UpsMailInnovations` to `"UPS_MAIL_INNOVATIONS"` · `Sypost` to `"SYPOST"` · `AmazonShipMcf` to `"AMAZON_SHIP_MCF"` · `Yusen` to `"YUSEN"` · `Bring` to `"BRING"` · `SdaIt` to `"SDA_IT"` · `Gba` to `"GBA"` · `Neweggexpress` to `"NEWEGGEXPRESS"` · `SpeedcouriersGr` to `"SPEEDCOURIERS_GR"` · `Forrun` to `"FORRUN"` · `Pickup` to `"PICKUP"` · `Ecms` to `"ECMS"` · `Intelipost` to `"INTELIPOST"` · `Flashexpress` to `"FLASHEXPRESS"` · `CnSto` to `"CN_STO"` · `SekoSftp` to `"SEKO_SFTP"` · `HomeDeliverySolutions` to `"HOME_DELIVERY_SOLUTIONS"` · `DpdHgry` to `"DPD_HGRY"` · `KerryttcVn` to `"KERRYTTC_VN"` · `JoyingBox` to `"JOYING_BOX"` · `TotalExpress` to `"TOTAL_EXPRESS"` · `ZjsExpress` to `"ZJS_EXPRESS"` · `Starken` to `"STARKEN"` · `Demandship` to `"DEMANDSHIP"` · `CnDpex` to `"CN_DPEX"` · `AupostCn` to `"AUPOST_CN"` · `Logisters` to `"LOGISTERS"` · `Goglobalpost` to `"GOGLOBALPOST"` · `GlsCz` to `"GLS_CZ"` · `PaackWebhook` to `"PAACK_WEBHOOK"` · `GrabWebhook` to `"GRAB_WEBHOOK"` · `Parcelpoint` to `"PARCELPOINT"` · `Icumulus` to `"ICUMULUS"` · `Daiglobaltrack` to `"DAIGLOBALTRACK"` · `GlobalIparcel` to `"GLOBAL_IPARCEL"` · `YurticiKargo` to `"YURTICI_KARGO"` · `CnPaypalPackage` to `"CN_PAYPAL_PACKAGE"` · `Parcel2Post` to `"PARCEL_2_POST"` · `GlsIt` to `"GLS_IT"` · `PilLogistics` to `"PIL_LOGISTICS"` · `Heppner` to `"HEPPNER"` · `GeneralOvernight` to `"GENERAL_OVERNIGHT"` · `Happy2Point` to `"HAPPY2POINT"` · `Chitchats` to `"CHITCHATS"` · `Smooth` to `"SMOOTH"` · `CleLogistics` to `"CLE_LOGISTICS"` · `Fiege` to `"FIEGE"` · `MxCargo` to `"MX_CARGO"` · `Ziingfinalmile` to `"ZIINGFINALMILE"` · `DaytonFreight` to `"DAYTON_FREIGHT"` · `Tcs` to `"TCS"` · `Aex` to `"AEX"` · `HermesDe` to `"HERMES_DE"` · `RoutificWebhook` to `"ROUTIFIC_WEBHOOK"` · `Globavend` to `"GLOBAVEND"` · `CjLogistics` to `"CJ_LOGISTICS"` · `PalletNetwork` to `"PALLET_NETWORK"` · `RafPh` to `"RAF_PH"` · `UkXdp` to `"UK_XDP"` · `PaperExpress` to `"PAPER_EXPRESS"` · `LaPosteSuivi` to `"LA_POSTE_SUIVI"` · `Paquetexpress` to `"PAQUETEXPRESS"` · `Liefery` to `"LIEFERY"` · `StreckTransport` to `"STRECK_TRANSPORT"` · `PonyExpress` to `"PONY_EXPRESS"` · `AlwaysExpress` to `"ALWAYS_EXPRESS"` · `GbsBroker` to `"GBS_BROKER"` · `CitylinkMy` to `"CITYLINK_MY"` · `Alljoy` to `"ALLJOY"` · `Yodel` to `"YODEL"` · `YodelDir` to `"YODEL_DIR"` · `Stone3Pl` to `"STONE3PL"` · `ParcelpalWebhook` to `"PARCELPAL_WEBHOOK"` · `DhlEcomerceAsa` to `"DHL_ECOMERCE_ASA"` · `Simplypost` to `"SIMPLYPOST"` · `KyExpress` to `"KY_EXPRESS"` · `Shenzhen` to `"SHENZHEN"` · `UsLasership` to `"US_LASERSHIP"` · `UcExpre` to `"UC_EXPRE"` · `Didadi` to `"DIDADI"` · `CjKr` to `"CJ_KR"` · `DbschenkerB2B` to `"DBSCHENKER_B2B"` · `Mxe` to `"MXE"` · `CaeDelivers` to `"CAE_DELIVERS"` · `Pfcexpress` to `"PFCEXPRESS"` · `Whistl` to `"WHISTL"` · `Wepost` to `"WEPOST"` · `DhlParcelEs` to `"DHL_PARCEL_ES"` · `Ddexpress` to `"DDEXPRESS"` · `AramexAu` to `"ARAMEX_AU"` · `Bneed` to `"BNEED"` · `HkTgx` to `"HK_TGX"` · `LatvijasPasts` to `"LATVIJAS_PASTS"` · `Viaeurope` to `"VIAEUROPE"` · `CorreoUy` to `"CORREO_UY"` · `ChronopostFr` to `"CHRONOPOST_FR"` · `JNet` to `"J_NET"` · `_6Ls` to `"_6LS"` · `BlrBelpost` to `"BLR_BELPOST"` · `Birdsystem` to `"BIRDSYSTEM"` · `Dobropost` to `"DOBROPOST"` · `WahanaId` to `"WAHANA_ID"` · `Weaship` to `"WEASHIP"` · `Sonictl` to `"SONICTL"` · `Kwt` to `"KWT"` · `AfllogFtp` to `"AFLLOG_FTP"` · `SkynetWorldwide` to `"SKYNET_WORLDWIDE"` · `NovaPoshta` to `"NOVA_POSHTA"` · `Seino` to `"SEINO"` · `Szendex` to `"SZENDEX"` · `BpostInt` to `"BPOST_INT"` · `DbschenkerSv` to `"DBSCHENKER_SV"` · `AoDeutschland` to `"AO_DEUTSCHLAND"` · `EuFleetSolutions` to `"EU_FLEET_SOLUTIONS"` · `Pcfcorp` to `"PCFCORP"` · `Linkbridge` to `"LINKBRIDGE"` · `Primamulticipta` to `"PRIMAMULTICIPTA"` · `Courex` to `"COUREX"` · `ZajilExpress` to `"ZAJIL_EXPRESS"` · `Collectco` to `"COLLECTCO"` · `Jtexpress` to `"JTEXPRESS"` · `FedexUk` to `"FEDEX_UK"` · `Uship` to `"USHIP"` · `Pixsell` to `"PIXSELL"` · `Shiptor` to `"SHIPTOR"` · `Cdek` to `"CDEK"` · `VnmViettelpost` to `"VNM_VIETTELPOST"` · `CjCentury` to `"CJ_CENTURY"` · `Gso` to `"GSO"` · `Viwo` to `"VIWO"` · `Skybox` to `"SKYBOX"` · `Kerrytj` to `"KERRYTJ"` · `NtlogisticsVn` to `"NTLOGISTICS_VN"` · `SdhScm` to `"SDH_SCM"` · `Zinc` to `"ZINC"` · `DpeSouthAfrc` to `"DPE_SOUTH_AFRC"` · `CeskaCz` to `"CESKA_CZ"` · `AcsGr` to `"ACS_GR"` · `Dealersend` to `"DEALERSEND"` · `Jocom` to `"JOCOM"` · `Cse` to `"CSE"` · `TforceFinalmile` to `"TFORCE_FINALMILE"` · `ShipGate` to `"SHIP_GATE"` · `Shipter` to `"SHIPTER"` · `NationalSameday` to `"NATIONAL_SAMEDAY"` · `Yunexpress` to `"YUNEXPRESS"` · `Cainiao` to `"CAINIAO"` · `DmsMatrix` to `"DMS_MATRIX"` · `Directlog` to `"DIRECTLOG"` · `AsendiaUs` to `"ASENDIA_US"` · `_3Jmslogistics` to `"_3JMSLOGISTICS"` · `LiccardiExpress` to `"LICCARDI_EXPRESS"` · `SkyPostal` to `"SKY_POSTAL"` · `Cnwangtong` to `"CNWANGTONG"` · `PostnordLogisticsDk` to `"POSTNORD_LOGISTICS_DK"` · `Logistika` to `"LOGISTIKA"` · `Celeritas` to `"CELERITAS"` · `Pressiode` to `"PRESSIODE"` · `ShreeMaruti` to `"SHREE_MARUTI"` · `LogisticsworldwideHk` to `"LOGISTICSWORLDWIDE_HK"` · `Efex` to `"EFEX"` · `Lotte` to `"LOTTE"` · `Lonestar` to `"LONESTAR"` · `Aprisaexpress` to `"APRISAEXPRESS"` · `BelRs` to `"BEL_RS"` · `OsmWorldwide` to `"OSM_WORLDWIDE"` · `WestgateGl` to `"WESTGATE_GL"` · `Fastrack` to `"FASTRACK"` · `DtdExpr` to `"DTD_EXPR"` · `Alfatrex` to `"ALFATREX"` · `Promeddelivery` to `"PROMEDDELIVERY"` · `ThabitLogistics` to `"THABIT_LOGISTICS"` · `HctLogistics` to `"HCT_LOGISTICS"` · `CarryFlap` to `"CARRY_FLAP"` · `UsOldDominion` to `"US_OLD_DOMINION"` · `AnicamBox` to `"ANICAM_BOX"` · `Wanbexpress` to `"WANBEXPRESS"` · `AnPost` to `"AN_POST"` · `DpdLocal` to `"DPD_LOCAL"` · `Stallionexpress` to `"STALLIONEXPRESS"` · `Raiderex` to `"RAIDEREX"` · `Shopfans` to `"SHOPFANS"` · `KyungdongParcel` to `"KYUNGDONG_PARCEL"` · `ChampionLogistics` to `"CHAMPION_LOGISTICS"` · `PickuppSgp` to `"PICKUPP_SGP"` · `MorningExpress` to `"MORNING_EXPRESS"` · `Nacex` to `"NACEX"` · `ThenileWebhook` to `"THENILE_WEBHOOK"` · `Holisol` to `"HOLISOL"` · `LbcexpressFtp` to `"LBCEXPRESS_FTP"` · `Kurasi` to `"KURASI"` · `UsfReddaway` to `"USF_REDDAWAY"` · `Apg` to `"APG"` · `CnBoxc` to `"CN_BOXC"` · `Ecoscooting` to `"ECOSCOOTING"` · `Mainway` to `"MAINWAY"` · `Paperfly` to `"PAPERFLY"` · `Houndexpress` to `"HOUNDEXPRESS"` · `BoxBerry` to `"BOX_BERRY"` · `EpBox` to `"EP_BOX"` · `PlusLogUk` to `"PLUS_LOG_UK"` · `Fulfilla` to `"FULFILLA"` · `Ase` to `"ASE"` · `MailPlus` to `"MAIL_PLUS"` · `XpoLogistics` to `"XPO_LOGISTICS"` · `Wndirect` to `"WNDIRECT"` · `CloudwishAsia` to `"CLOUDWISH_ASIA"` · `Zeleris` to `"ZELERIS"` · `GioExpress` to `"GIO_EXPRESS"` · `OcsWorldwide` to `"OCS_WORLDWIDE"` · `ArkLogistics` to `"ARK_LOGISTICS"` · `Aquiline` to `"AQUILINE"` · `PilotFreight` to `"PILOT_FREIGHT"` · `Qwintry` to `"QWINTRY"` · `DanskeFragt` to `"DANSKE_FRAGT"` · `Carriers` to `"CARRIERS"` · `AirCanadaGlobal` to `"AIR_CANADA_GLOBAL"` · `PresidentTrans` to `"PRESIDENT_TRANS"` · `Stepforwardfs` to `"STEPFORWARDFS"` · `SkynetUk` to `"SKYNET_UK"` · `Pittohio` to `"PITTOHIO"` · `CorreosExpress` to `"CORREOS_EXPRESS"` · `RlUs` to `"RL_US"` · `Destiny` to `"DESTINY"` · `UkYodel` to `"UK_YODEL"` · `CometTech` to `"COMET_TECH"` · `DhlParcelRu` to `"DHL_PARCEL_RU"` · `TntRefr` to `"TNT_REFR"` · `ShreeAnjaniCourier` to `"SHREE_ANJANI_COURIER"` · `MikropakketBe` to `"MIKROPAKKET_BE"` · `EtsExpress` to `"ETS_EXPRESS"` · `ColisPrive` to `"COLIS_PRIVE"` · `CnYunda` to `"CN_YUNDA"` · `AaaCooper` to `"AAA_COOPER"` · `RocketParcel` to `"ROCKET_PARCEL"` · `_360Lion` to `"_360LION"` · `Pandu` to `"PANDU"` · `ProfessionalCouriers` to `"PROFESSIONAL_COURIERS"` · `Flytexpress` to `"FLYTEXPRESS"` · `LogisticsworldwideMy` to `"LOGISTICSWORLDWIDE_MY"` · `CorreosDeEspana` to `"CORREOS_DE_ESPANA"` · `Imx` to `"IMX"` · `FourPxExpress` to `"FOUR_PX_EXPRESS"` · `Xpressbees` to `"XPRESSBEES"` · `PickuppVnm` to `"PICKUPP_VNM"` · `StartrackExpress` to `"STARTRACK_EXPRESS"` · `FrColissimo` to `"FR_COLISSIMO"` · `NacexSpainReference` to `"NACEX_SPAIN_REFERENCE"` · `DhlSupplyChainAu` to `"DHL_SUPPLY_CHAIN_AU"` · `Eshipping` to `"ESHIPPING"` · `Shreetirupati` to `"SHREETIRUPATI"` · `HxExpress` to `"HX_EXPRESS"` · `Indopaket` to `"INDOPAKET"` · `Cn17Post` to `"CN_17POST"` · `K1Express` to `"K1_EXPRESS"` · `CjGls` to `"CJ_GLS"` · `MysGdex` to `"MYS_GDEX"` · `Nationex` to `"NATIONEX"` · `Anjun` to `"ANJUN"` · `Fargood` to `"FARGOOD"` · `SmgExpress` to `"SMG_EXPRESS"` · `Rzyexpress` to `"RZYEXPRESS"` · `Sefl` to `"SEFL"` · `TntClickIt` to `"TNT_CLICK_IT"` · `Hdb` to `"HDB"` · `Hipshipper` to `"HIPSHIPPER"` · `Rpxlogistics` to `"RPXLOGISTICS"` · `Kuehne` to `"KUEHNE"` · `ItNexive` to `"IT_NEXIVE"` · `Pts` to `"PTS"` · `SwissPostFtp` to `"SWISS_POST_FTP"` · `FastrkServ` to `"FASTRK_SERV"` · `_472` to `"_4_72"` · `UsYrc` to `"US_YRC"` · `PostnlIntl3S` to `"POSTNL_INTL_3S"` · `ElianPost` to `"ELIAN_POST"` · `Cubyn` to `"CUBYN"` · `SauSaudiPost` to `"SAU_SAUDI_POST"` · `AbxexpressMy` to `"ABXEXPRESS_MY"` · `HuahanExpress` to `"HUAHAN_EXPRESS"` · `ZesExpress` to `"ZES_EXPRESS"` · `ZeptoExpress` to `"ZEPTO_EXPRESS"` · `SkynetZa` to `"SKYNET_ZA"` · `Zeek2Door` to `"ZEEK_2_DOOR"` · `Blinklastmile` to `"BLINKLASTMILE"` · `PostaUkr` to `"POSTA_UKR"` · `Chrobinson` to `"CHROBINSON"` · `CnPost56` to `"CN_POST56"` · `CourantPlus` to `"COURANT_PLUS"` · `ScudexExpress` to `"SCUDEX_EXPRESS"` · `Shipentegra` to `"SHIPENTEGRA"` · `BTwoCEurope` to `"B_TWO_C_EUROPE"` · `Cope` to `"COPE"` · `IndGati` to `"IND_GATI"` · `CnWishpost` to `"CN_WISHPOST"` · `NacexEs` to `"NACEX_ES"` · `TaqbinHk` to `"TAQBIN_HK"` · `Globaltranz` to `"GLOBALTRANZ"` · `Hkd` to `"HKD"` · `Bjshomedelivery` to `"BJSHOMEDELIVERY"` · `Omniva` to `"OMNIVA"` · `Sutton` to `"SUTTON"` · `PantherReference` to `"PANTHER_REFERENCE"` · `Sfcservice` to `"SFCSERVICE"` · `Ltl` to `"LTL"` · `Parknparcel` to `"PARKNPARCEL"` · `SpringGds` to `"SPRING_GDS"` · `Ecexpress` to `"ECEXPRESS"` · `InterparcelAu` to `"INTERPARCEL_AU"` · `Agility` to `"AGILITY"` · `XlExpress` to `"XL_EXPRESS"` · `Aderonline` to `"ADERONLINE"` · `Directcouriers` to `"DIRECTCOURIERS"` · `Planzer` to `"PLANZER"` · `Sending` to `"SENDING"` · `NinjavanWb` to `"NINJAVAN_WB"` · `NationwideMy` to `"NATIONWIDE_MY"` · `Sendit` to `"SENDIT"` · `GbArrow` to `"GB_ARROW"` · `IndGojavas` to `"IND_GOJAVAS"` · `Kpost` to `"KPOST"` · `DhlFreight` to `"DHL_FREIGHT"` · `Bluecare` to `"BLUECARE"` · `Jindouyun` to `"JINDOUYUN"` · `Trackon` to `"TRACKON"` · `GbTuffnells` to `"GB_TUFFNELLS"` · `Trumpcard` to `"TRUMPCARD"` · `Etotal` to `"ETOTAL"` · `SfplusWebhook` to `"SFPLUS_WEBHOOK"` · `Sekologistics` to `"SEKOLOGISTICS"` · `Hermes2MannHandling` to `"HERMES_2MANN_HANDLING"` · `DpdLocalRef` to `"DPD_LOCAL_REF"` · `Uds` to `"UDS"` · `ZaSpecialisedFreight` to `"ZA_SPECIALISED_FREIGHT"` · `ThaKerry` to `"THA_KERRY"` · `PrtIntSeur` to `"PRT_INT_SEUR"` · `BraCorreios` to `"BRA_CORREIOS"` · `NzNzPost` to `"NZ_NZ_POST"` · `CnEquick` to `"CN_EQUICK"` · `MysEms` to `"MYS_EMS"` · `GbNorsk` to `"GB_NORSK"` · `EspMrw` to `"ESP_MRW"` · `EspPacklink` to `"ESP_PACKLINK"` · `KangarooMy` to `"KANGAROO_MY"` · `Rpx` to `"RPX"` · `XdpUkReference` to `"XDP_UK_REFERENCE"` · `NinjavanMy` to `"NINJAVAN_MY"` · `Adicional` to `"ADICIONAL"` · `Roadbull` to `"ROADBULL"` · `Yakit` to `"YAKIT"` · `Mailamericas` to `"MAILAMERICAS"` · `Mikropakket` to `"MIKROPAKKET"` · `Dynalogic` to `"DYNALOGIC"` · `DhlEs` to `"DHL_ES"` · `DhlParcelNl` to `"DHL_PARCEL_NL"` · `DhlGlobalMailAsia` to `"DHL_GLOBAL_MAIL_ASIA"` · `DawnWing` to `"DAWN_WING"` · `GenikiGr` to `"GENIKI_GR"` · `HermesworldUk` to `"HERMESWORLD_UK"` · `Alphafast` to `"ALPHAFAST"` · `Buylogic` to `"BUYLOGIC"` · `Ekart` to `"EKART"` · `MexSenda` to `"MEX_SENDA"` · `SfcLogistics` to `"SFC_LOGISTICS"` · `PostSerbia` to `"POST_SERBIA"` · `IndDelhivery` to `"IND_DELHIVERY"` · `DeDpdDelistrack` to `"DE_DPD_DELISTRACK"` · `Rpd2Man` to `"RPD2MAN"` · `CnSfExpress` to `"CN_SF_EXPRESS"` · `Yanwen` to `"YANWEN"` · `MysSkynet` to `"MYS_SKYNET"` · `CorreosDeMexico` to `"CORREOS_DE_MEXICO"` · `CblLogistica` to `"CBL_LOGISTICA"` · `MexEstafeta` to `"MEX_ESTAFETA"` · `AuAustrianPost` to `"AU_AUSTRIAN_POST"` · `Rincos` to `"RINCOS"` · `NldDhl` to `"NLD_DHL"` · `RussianPost` to `"RUSSIAN_POST"` · `CouriersPlease` to `"COURIERS_PLEASE"` · `PostnordLogistics` to `"POSTNORD_LOGISTICS"` · `Fedex` to `"FEDEX"` · `DpeExpress` to `"DPE_EXPRESS"` · `Dpd` to `"DPD"` · `Adsone` to `"ADSONE"` · `IdnJne` to `"IDN_JNE"` · `Thecourierguy` to `"THECOURIERGUY"` · `Cnexps` to `"CNEXPS"` · `PrtChronopost` to `"PRT_CHRONOPOST"` · `LandmarkGlobal` to `"LANDMARK_GLOBAL"` · `ItDhlEcommerce` to `"IT_DHL_ECOMMERCE"` · `EspNacex` to `"ESP_NACEX"` · `PrtCtt` to `"PRT_CTT"` · `BeKiala` to `"BE_KIALA"` · `AsendiaUk` to `"ASENDIA_UK"` · `GlobalTnt` to `"GLOBAL_TNT"` · `PosturIs` to `"POSTUR_IS"` · `EparcelKr` to `"EPARCEL_KR"` · `InpostPaczkomaty` to `"INPOST_PACZKOMATY"` · `ItPosteItalia` to `"IT_POSTE_ITALIA"` · `BeBpost` to `"BE_BPOST"` · `PlPocztaPolska` to `"PL_POCZTA_POLSKA"` · `MysMysPost` to `"MYS_MYS_POST"` · `SgSgPost` to `"SG_SG_POST"` · `ThaThailandPost` to `"THA_THAILAND_POST"` · `Lexship` to `"LEXSHIP"` · `FastwayNz` to `"FASTWAY_NZ"` · `DhlAu` to `"DHL_AU"` · `Costmeticsnow` to `"COSTMETICSNOW"` · `Pflogistics` to `"PFLOGISTICS"` · `LoomisExpress` to `"LOOMIS_EXPRESS"` · `GlsItaly` to `"GLS_ITALY"` · `Line` to `"LINE"` · `GelExpress` to `"GEL_EXPRESS"` · `Huodull` to `"HUODULL"` · `NinjavanSg` to `"NINJAVAN_SG"` · `Janio` to `"JANIO"` · `AoCourier` to `"AO_COURIER"` · `BrtItSenderRef` to `"BRT_IT_SENDER_REF"` · `Sailpost` to `"SAILPOST"` · `Lalamove` to `"LALAMOVE"` · `NewzealandCouriers` to `"NEWZEALAND_COURIERS"` · `Etomars` to `"ETOMARS"` · `Virtransport` to `"VIRTRANSPORT"` · `Wizmo` to `"WIZMO"` · `Palletways` to `"PALLETWAYS"` · `IDika` to `"I_DIKA"` · `CflLogistics` to `"CFL_LOGISTICS"` · `Gemworldwide` to `"GEMWORLDWIDE"` · `GlobalExpress` to `"GLOBAL_EXPRESS"` · `LogistyxTransgroup` to `"LOGISTYX_TRANSGROUP"` · `WestbankCourier` to `"WESTBANK_COURIER"` · `ArcoSpedizioni` to `"ARCO_SPEDIZIONI"` · `YdhExpress` to `"YDH_EXPRESS"` · `Parcelinklogistics` to `"PARCELINKLOGISTICS"` · `Cndexpress` to `"CNDEXPRESS"` · `NoxNightTimeExpress` to `"NOX_NIGHT_TIME_EXPRESS"` · `Aeronet` to `"AERONET"` · `Ltianexp` to `"LTIANEXP"` · `Integra2Ftp` to `"INTEGRA2_FTP"` · `Parcelone` to `"PARCELONE"` · `NoxNachtexpress` to `"NOX_NACHTEXPRESS"` · `CnChinaPostEms` to `"CN_CHINA_POST_EMS"` · `Chukou1` to `"CHUKOU1"` · `GlsSlov` to `"GLS_SLOV"` · `OrangeDs` to `"ORANGE_DS"` · `JoomLogis` to `"JOOM_LOGIS"` · `AusStartrack` to `"AUS_STARTRACK"` · `Dhl` to `"DHL"` · `GbApc` to `"GB_APC"` · `Bondscouriers` to `"BONDSCOURIERS"` · `JpnJapanPost` to `"JPN_JAPAN_POST"` · `Usps` to `"USPS"` · `Winit` to `"WINIT"` · `ArgOca` to `"ARG_OCA"` · `TwTaiwanPost` to `"TW_TAIWAN_POST"` · `DmmNetwork` to `"DMM_NETWORK"` · `Tnt` to `"TNT"` · `BhPosta` to `"BH_POSTA"` · `SwePostnord` to `"SWE_POSTNORD"` · `CaCanadaPost` to `"CA_CANADA_POST"` · `Wiseloads` to `"WISELOADS"` · `AsendiaHk` to `"ASENDIA_HK"` · `NldGls` to `"NLD_GLS"` · `MexRedpack` to `"MEX_REDPACK"` · `JetShip` to `"JET_SHIP"` · `DeDhlExpress` to `"DE_DHL_EXPRESS"` · `NinjavanThai` to `"NINJAVAN_THAI"` · `RabenGroup` to `"RABEN_GROUP"` · `EspAsm` to `"ESP_ASM"` · `HrvHrvatska` to `"HRV_HRVATSKA"` · `GlobalEstes` to `"GLOBAL_ESTES"` · `LtuLietuvos` to `"LTU_LIETUVOS"` · `BelDhl` to `"BEL_DHL"` · `AuAuPost` to `"AU_AU_POST"` · `Speedexcourier` to `"SPEEDEXCOURIER"` · `FrColis` to `"FR_COLIS"` · `Aramex` to `"ARAMEX"` · `Dpex` to `"DPEX"` · `MysAirpak` to `"MYS_AIRPAK"` · `Cuckooexpress` to `"CUCKOOEXPRESS"` · `DpdPoland` to `"DPD_POLAND"` · `NldPostnl` to `"NLD_POSTNL"` · `NimExpress` to `"NIM_EXPRESS"` · `Quantium` to `"QUANTIUM"` · `Sendle` to `"SENDLE"` · `EspRedur` to `"ESP_REDUR"` · `Matkahuolto` to `"MATKAHUOLTO"` · `Cpacket` to `"CPACKET"` · `Posti` to `"POSTI"` · `HunterExpress` to `"HUNTER_EXPRESS"` · `ChoirExp` to `"CHOIR_EXP"` · `LegionExpress` to `"LEGION_EXPRESS"` · `AustrianPostExpress` to `"AUSTRIAN_POST_EXPRESS"` · `Grupo` to `"GRUPO"` · `PostaRo` to `"POSTA_RO"` · `InterparcelUk` to `"INTERPARCEL_UK"` · `GlobalAbf` to `"GLOBAL_ABF"` · `PostenNorge` to `"POSTEN_NORGE"` · `XpertDelivery` to `"XPERT_DELIVERY"` · `DhlRefr` to `"DHL_REFR"` · `DhlHk` to `"DHL_HK"` · `SkynetUae` to `"SKYNET_UAE"` · `Gojek` to `"GOJEK"` · `YodelIntnl` to `"YODEL_INTNL"` · `Janco` to `"JANCO"` · `Yto` to `"YTO"` · `WiseExpress` to `"WISE_EXPRESS"` · `JtexpressVn` to `"JTEXPRESS_VN"` · `FedexIntlMlserv` to `"FEDEX_INTL_MLSERV"` · `Vamox` to `"VAMOX"` · `AmsGrp` to `"AMS_GRP"` · `DhlJp` to `"DHL_JP"` · `Hrparcel` to `"HRPARCEL"` · `Geswl` to `"GESWL"` · `Bluestar` to `"BLUESTAR"` · `CdekTr` to `"CDEK_TR"` · `Descartes` to `"DESCARTES"` · `DeltecUk` to `"DELTEC_UK"` · `DtdcExpress` to `"DTDC_EXPRESS"` · `Tourline` to `"TOURLINE"` · `BhWorldwide` to `"BH_WORLDWIDE"` · `Ocs` to `"OCS"` · `YingnuoLogistics` to `"YINGNUO_LOGISTICS"` · `Ups` to `"UPS"` · `Toll` to `"TOLL"` · `PrtSeur` to `"PRT_SEUR"` · `DtdcAu` to `"DTDC_AU"` · `ThaDynamicLogistics` to `"THA_DYNAMIC_LOGISTICS"` · `UbiLogistics` to `"UBI_LOGISTICS"` · `FedexCrossborder` to `"FEDEX_CROSSBORDER"` · `A1Post` to `"A1POST"` · `TazmanianFreight` to `"TAZMANIAN_FREIGHT"` · `CjIntMy` to `"CJ_INT_MY"` · `SaiaFreight` to `"SAIA_FREIGHT"` · `SgQxpress` to `"SG_QXPRESS"` · `NhansSolutions` to `"NHANS_SOLUTIONS"` · `DpdFr` to `"DPD_FR"` · `Coordinadora` to `"COORDINADORA"` · `Andreani` to `"ANDREANI"` · `Doora` to `"DOORA"` · `InterparcelNz` to `"INTERPARCEL_NZ"` · `PhlJamexpress` to `"PHL_JAMEXPRESS"` · `BelBelgiumPost` to `"BEL_BELGIUM_POST"` · `UsApc` to `"US_APC"` · `IdnPos` to `"IDN_POS"` · `FrMondial` to `"FR_MONDIAL"` · `DeDhl` to `"DE_DHL"` · `HkRpx` to `"HK_RPX"` · `DhlPieceid` to `"DHL_PIECEID"` · `VnpostEms` to `"VNPOST_EMS"` · `Rrdonnelley` to `"RRDONNELLEY"` · `DpdDe` to `"DPD_DE"` · `DelcartIn` to `"DELCART_IN"` · `Imexglobalsolutions` to `"IMEXGLOBALSOLUTIONS"` · `Acommerce` to `"ACOMMERCE"` · `Eurodis` to `"EURODIS"` · `Canpar` to `"CANPAR"` · `Gls` to `"GLS"` · `IndEcom` to `"IND_ECOM"` · `EspEnvialia` to `"ESP_ENVIALIA"` · `DhlUk` to `"DHL_UK"` · `SmsaExpress` to `"SMSA_EXPRESS"` · `TntFr` to `"TNT_FR"` · `DexI` to `"DEX_I"` · `BudbeeWebhook` to `"BUDBEE_WEBHOOK"` · `CopaCourier` to `"COPA_COURIER"` · `VnmVietnamPost` to `"VNM_VIETNAM_POST"` · `DpdHk` to `"DPD_HK"` · `TollNz` to `"TOLL_NZ"` · `Echo` to `"ECHO"` · `FedexFr` to `"FEDEX_FR"` · `Borderexpress` to `"BORDEREXPRESS"` · `MailplusJpn` to `"MAILPLUS_JPN"` · `TntUkRefr` to `"TNT_UK_REFR"` · `Kec` to `"KEC"` · `DpdRo` to `"DPD_RO"` · `TntJp` to `"TNT_JP"` · `ThCj` to `"TH_CJ"` · `EcCn` to `"EC_CN"` · `FastwayUk` to `"FASTWAY_UK"` · `FastwayUs` to `"FASTWAY_US"` · `GlsDe` to `"GLS_DE"` · `GlsEs` to `"GLS_ES"` · `GlsFr` to `"GLS_FR"` · `MondialBe` to `"MONDIAL_BE"` · `SgtIt` to `"SGT_IT"` · `TntCn` to `"TNT_CN"` · `TntDe` to `"TNT_DE"` · `TntEs` to `"TNT_ES"` · `TntPl` to `"TNT_PL"` · `Parcelforce` to `"PARCELFORCE"` · `SwissPost` to `"SWISS_POST"` · `TollIpec` to `"TOLL_IPEC"` · `Air21` to `"AIR_21"` · `Airspeed` to `"AIRSPEED"` · `Bert` to `"BERT"` · `Bluedart` to `"BLUEDART"` · `Collectplus` to `"COLLECTPLUS"` · `Courierplus` to `"COURIERPLUS"` · `CourierPost` to `"COURIER_POST"` · `DhlGlobalMail` to `"DHL_GLOBAL_MAIL"` · `DpdUk` to `"DPD_UK"` · `DeltecDe` to `"DELTEC_DE"` · `DeutscheDe` to `"DEUTSCHE_DE"` · `Dotzot` to `"DOTZOT"` · `EltaGr` to `"ELTA_GR"` · `EmsCn` to `"EMS_CN"` · `Ecargo` to `"ECARGO"` · `Ensenda` to `"ENSENDA"` · `FercamIt` to `"FERCAM_IT"` · `FastwayZa` to `"FASTWAY_ZA"` · `FastwayAu` to `"FASTWAY_AU"` · `FirstLogisitcs` to `"FIRST_LOGISITCS"` · `Geodis` to `"GEODIS"` · `Globegistics` to `"GLOBEGISTICS"` · `Greyhound` to `"GREYHOUND"` · `JetshipMy` to `"JETSHIP_MY"` · `LionParcel` to `"LION_PARCEL"` · `Aeroflash` to `"AEROFLASH"` · `Ontrac` to `"ONTRAC"` · `Sagawa` to `"SAGAWA"` · `Siodemka` to `"SIODEMKA"` · `Startrack` to `"STARTRACK"` · `TntAu` to `"TNT_AU"` · `TntIt` to `"TNT_IT"` · `Transmission` to `"TRANSMISSION"` · `Yamato` to `"YAMATO"` · `DhlIt` to `"DHL_IT"` · `DhlAt` to `"DHL_AT"` · `LogisticsworldwideKr` to `"LOGISTICSWORLDWIDE_KR"` · `GlsSpain` to `"GLS_SPAIN"` · `AmazonUkApi` to `"AMAZON_UK_API"` · `DpdFrReference` to `"DPD_FR_REFERENCE"` · `DhlparcelUk` to `"DHLPARCEL_UK"` · `Megasave` to `"MEGASAVE"` · `Qualitypost` to `"QUALITYPOST"` · `IdsLogistics` to `"IDS_LOGISTICS"` · `Joyingbox` to `"JOYINGBOX"` · `PantherOrderNumber` to `"PANTHER_ORDER_NUMBER"` · `WatkinsShepard` to `"WATKINS_SHEPARD"` · `Fasttrack` to `"FASTTRACK"` · `UpExpress` to `"UP_EXPRESS"` · `Elogistica` to `"ELOGISTICA"` · `Ecourier` to `"ECOURIER"` · `CjPhilippines` to `"CJ_PHILIPPINES"` · `Speedex` to `"SPEEDEX"` · `Orangeconnex` to `"ORANGECONNEX"` · `Tecor` to `"TECOR"` · `Saee` to `"SAEE"` · `GlsItalyFtp` to `"GLS_ITALY_FTP"` · `Delivere` to `"DELIVERE"` · `Yycom` to `"YYCOM"` · `AdicionalPt` to `"ADICIONAL_PT"` · `Dksh` to `"DKSH"` · `NipponExpressFtp` to `"NIPPON_EXPRESS_FTP"` · `Gols` to `"GOLS"` · `Fujexp` to `"FUJEXP"` · `Qtrack` to `"QTRACK"` · `OmlogisticsApi` to `"OMLOGISTICS_API"` · `Gdpharm` to `"GDPHARM"` · `MisumiCn` to `"MISUMI_CN"` · `AirCanada` to `"AIR_CANADA"` · `City56Webhook` to `"CITY56_WEBHOOK"` · `SagawaApi` to `"SAGAWA_API"` · `Kedaex` to `"KEDAEX"` · `PgeonApi` to `"PGEON_API"` · `Weworldexpress` to `"WEWORLDEXPRESS"` · `JtLogistics` to `"JT_LOGISTICS"` · `Trusk` to `"TRUSK"` · `Viaxpress` to `"VIAXPRESS"` · `DhlSupplychainId` to `"DHL_SUPPLYCHAIN_ID"` · `ZuelligpharmaSftp` to `"ZUELLIGPHARMA_SFTP"` · `Meest` to `"MEEST"` · `TollPriority` to `"TOLL_PRIORITY"` · `MothershipApi` to `"MOTHERSHIP_API"` · `Capital` to `"CAPITAL"` · `EuropaketApi` to `"EUROPAKET_API"` · `Hfd` to `"HFD"` · `TourlineReference` to `"TOURLINE_REFERENCE"` · `GioEcourier` to `"GIO_ECOURIER"` · `CnLogistics` to `"CN_LOGISTICS"` · `Pandion` to `"PANDION"` · `BpostApi` to `"BPOST_API"` · `Passportshipping` to `"PASSPORTSHIPPING"` · `Pakajo` to `"PAKAJO"` · `Dachser` to `"DACHSER"` · `YusenSftp` to `"YUSEN_SFTP"` · `Shyplite` to `"SHYPLITE"` · `Xyy` to `"XYY"` · `Mwd` to `"MWD"` · `Faxecargo` to `"FAXECARGO"` · `Mazet` to `"MAZET"` · `FirstLogisticsApi` to `"FIRST_LOGISTICS_API"` · `SprintPack` to `"SPRINT_PACK"` · `HermesDeFtp` to `"HERMES_DE_FTP"` · `Concise` to `"CONCISE"` · `KerryExpressTwApi` to `"KERRY_EXPRESS_TW_API"` · `Ewe` to `"EWE"` · `Fastdespatch` to `"FASTDESPATCH"` · `AbcustomSftp` to `"ABCUSTOM_SFTP"` · `Chazki` to `"CHAZKI"` · `Shippie` to `"SHIPPIE"` · `GeodisApi` to `"GEODIS_API"` · `NaqelExpress` to `"NAQEL_EXPRESS"` · `PapaWebhook` to `"PAPA_WEBHOOK"` · `Forwardair` to `"FORWARDAIR"` · `DialogoLogisticaApi` to `"DIALOGO_LOGISTICA_API"` · `LalamoveApi` to `"LALAMOVE_API"` · `Tomydoor` to `"TOMYDOOR"` · `KronosWebhook` to `"KRONOS_WEBHOOK"` · `Jtcargo` to `"JTCARGO"` · `TCat` to `"T_CAT"` · `ConciseWebhook` to `"CONCISE_WEBHOOK"` · `TeleportWebhook` to `"TELEPORT_WEBHOOK"` · `CustomcoApi` to `"CUSTOMCO_API"` · `SpxTh` to `"SPX_TH"` · `BolloreLogistics` to `"BOLLORE_LOGISTICS"` · `ClicklinkSftp` to `"CLICKLINK_SFTP"` · `M3Logistics` to `"M3LOGISTICS"` · `VnpostApi` to `"VNPOST_API"` · `AxlehireFtp` to `"AXLEHIRE_FTP"` · `Shadowfax` to `"SHADOWFAX"` · `MyhermesUkApi` to `"MYHERMES_UK_API"` · `Daiichi` to `"DAIICHI"` · `MensajerosurbanosApi` to `"MENSAJEROSURBANOS_API"` · `Polarspeed` to `"POLARSPEED"` · `IdexpressId` to `"IDEXPRESS_ID"` · `Payo` to `"PAYO"` · `WhistlSftp` to `"WHISTL_SFTP"` · `IntexDe` to `"INTEX_DE"` · `Trans2U` to `"TRANS2U"` · `ProductcaregroupSftp` to `"PRODUCTCAREGROUP_SFTP"` · `Bigsmart` to `"BIGSMART"` · `ExpeditorsApiRef` to `"EXPEDITORS_API_REF"` · `AitworldwideApi` to `"AITWORLDWIDE_API"` · `Worldcourier` to `"WORLDCOURIER"` · `Quiqup` to `"QUIQUP"` · `AgedissSftp` to `"AGEDISS_SFTP"` · `AndreaniApi` to `"ANDREANI_API"` · `Crlexpress` to `"CRLEXPRESS"` · `Smartcat` to `"SMARTCAT"` · `Crossflight` to `"CROSSFLIGHT"` · `Procarrier` to `"PROCARRIER"` · `DhlReferenceApi` to `"DHL_REFERENCE_API"` · `SeinoApi` to `"SEINO_API"` · `Wspexpress` to `"WSPEXPRESS"` · `Kronos` to `"KRONOS"` · `TotalExpressApi` to `"TOTAL_EXPRESS_API"` · `Parcll` to `"PARCLL"` · `Xpedigo` to `"XPEDIGO"` · `StarTrackWebhook` to `"STAR_TRACK_WEBHOOK"` · `Gpost` to `"GPOST"` · `Ucs` to `"UCS"` · `Dmfgroup` to `"DMFGROUP"` · `CoordinadoraApi` to `"COORDINADORA_API"` · `Marken` to `"MARKEN"` · `Ntl` to `"NTL"` · `Redjepakketje` to `"REDJEPAKKETJE"` · `AlliedExpressFtp` to `"ALLIED_EXPRESS_FTP"` · `MondialrelayEs` to `"MONDIALRELAY_ES"` · `NaekoFtp` to `"NAEKO_FTP"` · `Mhi` to `"MHI"` · `Shippify` to `"SHIPPIFY"` · `MalcaAmitApi` to `"MALCA_AMIT_API"` · `JtexpressSgApi` to `"JTEXPRESS_SG_API"` · `DachserWeb` to `"DACHSER_WEB"` · `Flightlg` to `"FLIGHTLG"` · `Cago` to `"CAGO"` · `Com1Express` to `"COM1EXPRESS"` · `TonamiFtp` to `"TONAMI_FTP"` · `Packfleet` to `"PACKFLEET"` · `PurolatorInternational` to `"PUROLATOR_INTERNATIONAL"` · `WineshippingWebhook` to `"WINESHIPPING_WEBHOOK"` · `DhlEsSftp` to `"DHL_ES_SFTP"` · `PchomeApi` to `"PCHOME_API"` · `CeskapostaApi` to `"CESKAPOSTA_API"` · `Gorush` to `"GORUSH"` · `Homerunner` to `"HOMERUNNER"` · `AmazonOrder` to `"AMAZON_ORDER"` · `EfwnowApi` to `"EFWNOW_API"` · `CblLogisticaApi` to `"CBL_LOGISTICA_API"` · `Nimbuspost` to `"NIMBUSPOST"` · `LogwinLogistics` to `"LOGWIN_LOGISTICS"` · `NowlogApi` to `"NOWLOG_API"` · `DpdNl` to `"DPD_NL"` · `Godependable` to `"GODEPENDABLE"` · `Esdex` to `"ESDEX"` · `LogisystemsSftp` to `"LOGISYSTEMS_SFTP"` · `Expeditors` to `"EXPEDITORS"` · `SntglobalApi` to `"SNTGLOBAL_API"` · `Shipx` to `"SHIPX"` · `QintlApi` to `"QINTL_API"` · `Packs` to `"PACKS"` · `PostnlInternational` to `"POSTNL_INTERNATIONAL"` · `AmazonEmailPush` to `"AMAZON_EMAIL_PUSH"` · `DhlApi` to `"DHL_API"` · `Spx` to `"SPX"` · `Axlehire` to `"AXLEHIRE"` · `Icscourier` to `"ICSCOURIER"` · `DialogoLogistica` to `"DIALOGO_LOGISTICA"` · `ShunbangExpress` to `"SHUNBANG_EXPRESS"` · `TcsApi` to `"TCS_API"` · `SfExpressCn` to `"SF_EXPRESS_CN"` · `Packeta` to `"PACKETA"` · `SicTeliway` to `"SIC_TELIWAY"` · `MondialrelayFr` to `"MONDIALRELAY_FR"` · `IntimeFtp` to `"INTIME_FTP"` · `JdExpress` to `"JD_EXPRESS"` · `Fastbox` to `"FASTBOX"` · `Patheon` to `"PATHEON"` · `IndiaPost` to `"INDIA_POST"` · `TipsaRef` to `"TIPSA_REF"` · `Ecofreight` to `"ECOFREIGHT"` · `Vox` to `"VOX"` · `DirectfreightAuRef` to `"DIRECTFREIGHT_AU_REF"` · `BesttransportSftp` to `"BESTTRANSPORT_SFTP"` · `AustraliaPostApi` to `"AUSTRALIA_POST_API"` · `FragilepakSftp` to `"FRAGILEPAK_SFTP"` · `Flipxp` to `"FLIPXP"` · `ValueWebhook` to `"VALUE_WEBHOOK"` · `Daeshin` to `"DAESHIN"` · `Sherpa` to `"SHERPA"` · `MwdApi` to `"MWD_API"` · `Smartkargo` to `"SMARTKARGO"` · `DnjExpress` to `"DNJ_EXPRESS"` · `Gopeople` to `"GOPEOPLE"` · `MysendleApi` to `"MYSENDLE_API"` · `AramexApi` to `"ARAMEX_API"` · `Pidge` to `"PIDGE"` · `Thaiparcels` to `"THAIPARCELS"` · `PantherReferenceApi` to `"PANTHER_REFERENCE_API"` · `Postaplus` to `"POSTAPLUS"` · `Buffalo` to `"BUFFALO"` · `UEnvios` to `"U_ENVIOS"` · `EliteCo` to `"ELITE_CO"` · `RocheInternalSftp` to `"ROCHE_INTERNAL_SFTP"` · `DbschenkerIceland` to `"DBSCHENKER_ICELAND"` · `TntFrReference` to `"TNT_FR_REFERENCE"` · `Newgisticsapi` to `"NEWGISTICSAPI"` · `Glovo` to `"GLOVO"` · `GwlogisApi` to `"GWLOGIS_API"` · `SpreetailApi` to `"SPREETAIL_API"` · `Moova` to `"MOOVA"` · `Plycongroup` to `"PLYCONGROUP"` · `UspsWebhook` to `"USPS_WEBHOOK"` · `Reimaginedelivery` to `"REIMAGINEDELIVERY"` · `EdfFtp` to `"EDF_FTP"` · `Dao365` to `"DAO365"` · `BiocairFtp` to `"BIOCAIR_FTP"` · `RansaWebhook` to `"RANSA_WEBHOOK"` · `Shipxpres` to `"SHIPXPRES"` · `CourantPlusApi` to `"COURANT_PLUS_API"` · `Shipa` to `"SHIPA"` · `Homelogistics` to `"HOMELOGISTICS"` · `Dx` to `"DX"` · `PosteItalianePaccocelere` to `"POSTE_ITALIANE_PACCOCELERE"` · `TollWebhook` to `"TOLL_WEBHOOK"` · `LctbrApi` to `"LCTBR_API"` · `DxFreight` to `"DX_FREIGHT"` · `DhlSftp` to `"DHL_SFTP"` · `Shiprocket` to `"SHIPROCKET"` · `UberWebhook` to `"UBER_WEBHOOK"` · `Statovernight` to `"STATOVERNIGHT"` · `Burd` to `"BURD"` · `Fastship` to `"FASTSHIP"` · `IbventureWebhook` to `"IBVENTURE_WEBHOOK"` · `GatiKweApi` to `"GATI_KWE_API"` · `CryopdpFtp` to `"CRYOPDP_FTP"` · `Hubbed` to `"HUBBED"` · `TipsaApi` to `"TIPSA_API"` · `Araskargo` to `"ARASKARGO"` · `ThijsNl` to `"THIJS_NL"` · `AtshealthcareReference` to `"ATSHEALTHCARE_REFERENCE"` · `_99Minutos` to `"99MINUTOS"` · `HellenicPost` to `"HELLENIC_POST"` · `HsmGlobal` to `"HSM_GLOBAL"` · `Mnx` to `"MNX"` · `Nmtransfer` to `"NMTRANSFER"` · `Logysto` to `"LOGYSTO"` · `IndiaPostInt` to `"INDIA_POST_INT"` · `AmazonFbaSwishipIn` to `"AMAZON_FBA_SWISHIP_IN"` · `SrtTransport` to `"SRT_TRANSPORT"` · `Bomi` to `"BOMI"` · `DeliverrSftp` to `"DELIVERR_SFTP"` · `Hsdexpress` to `"HSDEXPRESS"` · `SimpletireWebhook` to `"SIMPLETIRE_WEBHOOK"` · `HunterExpressSftp` to `"HUNTER_EXPRESS_SFTP"` · `UpsApi` to `"UPS_API"` · `WooyoungLogisticsSftp` to `"WOOYOUNG_LOGISTICS_SFTP"` · `PhseApi` to `"PHSE_API"` · `WishEmailPush` to `"WISH_EMAIL_PUSH"` · `Northline` to `"NORTHLINE"` · `Medafrica` to `"MEDAFRICA"` · `DpdAtSftp` to `"DPD_AT_SFTP"` · `Anteraja` to `"ANTERAJA"` · `DhlGlobalForwardingApi` to `"DHL_GLOBAL_FORWARDING_API"` · `LbcexpressApi` to `"LBCEXPRESS_API"` · `Simsglobal` to `"SIMSGLOBAL"` · `Cdldelivers` to `"CDLDELIVERS"` · `Typ` to `"TYP"` · `TestingCourierWebhook` to `"TESTING_COURIER_WEBHOOK"` · `PandagoApi` to `"PANDAGO_API"` · `RoyalMailFtp` to `"ROYAL_MAIL_FTP"` · `Thunderexpress` to `"THUNDEREXPRESS"` · `SecretlabWebhook` to `"SECRETLAB_WEBHOOK"` · `Setel` to `"SETEL"` · `JdWorldwide` to `"JD_WORLDWIDE"` · `DpdRuApi` to `"DPD_RU_API"` · `ArgentsWebhook` to `"ARGENTS_WEBHOOK"` · `Postone` to `"POSTONE"` · `Tusklogistics` to `"TUSKLOGISTICS"` · `RhenusUkApi` to `"RHENUS_UK_API"` · `TaqbinSgApi` to `"TAQBIN_SG_API"` · `InntralogSftp` to `"INNTRALOG_SFTP"` · `Dayross` to `"DAYROSS"` · `CorreosexpressApi` to `"CORREOSEXPRESS_API"` · `InternationalSeurApi` to `"INTERNATIONAL_SEUR_API"` · `YodelApi` to `"YODEL_API"` · `Heroexpress` to `"HEROEXPRESS"` · `DhlSupplychainIn` to `"DHL_SUPPLYCHAIN_IN"` · `UrgentCargus` to `"URGENT_CARGUS"` · `Frontdoorcorp` to `"FRONTDOORCORP"` · `JtexpressPh` to `"JTEXPRESS_PH"` · `ParcelstarsWebhook` to `"PARCELSTARS_WEBHOOK"` · `DpdSkSftp` to `"DPD_SK_SFTP"` · `Movianto` to `"MOVIANTO"` · `OzepartsShipping` to `"OZEPARTS_SHIPPING"` · `Kargomkolay` to `"KARGOMKOLAY"` · `Trunkrs` to `"TRUNKRS"` · `OmnirpsWebhook` to `"OMNIRPS_WEBHOOK"` · `Chilexpress` to `"CHILEXPRESS"` · `TestingCourier` to `"TESTING_COURIER"` · `JneApi` to `"JNE_API"` · `BjshomedeliveryFtp` to `"BJSHOMEDELIVERY_FTP"` · `DexpressWebhook` to `"DEXPRESS_WEBHOOK"` · `UspsApi` to `"USPS_API"` · `Transvirtual` to `"TRANSVIRTUAL"` · `SolisticaApi` to `"SOLISTICA_API"` · `ChienventureWebhook` to `"CHIENVENTURE_WEBHOOK"` · `DpdUkSftp` to `"DPD_UK_SFTP"` · `InpostUk` to `"INPOST_UK"` · `Javit` to `"JAVIT"` · `ZtoDomestic` to `"ZTO_DOMESTIC"` · `DhlGtApi` to `"DHL_GT_API"` · `CevaTracking` to `"CEVA_TRACKING"` · `KomonExpress` to `"KOMON_EXPRESS"` · `EastwestcourierFtp` to `"EASTWESTCOURIER_FTP"` · `Danniao` to `"DANNIAO"` · `Spectran` to `"SPECTRAN"` · `DeliverIt` to `"DELIVER_IT"` · `Relaiscolis` to `"RELAISCOLIS"` · `GlsSpainApi` to `"GLS_SPAIN_API"` · `Postplus` to `"POSTPLUS"` · `Airterra` to `"AIRTERRA"` · `GioEcourierApi` to `"GIO_ECOURIER_API"` · `DpdChSftp` to `"DPD_CH_SFTP"` · `FedexApi` to `"FEDEX_API"` · `Intersmarttrans` to `"INTERSMARTTRANS"` · `HermesUkSftp` to `"HERMES_UK_SFTP"` · `ExelotFtp` to `"EXELOT_FTP"` · `DhlPaApi` to `"DHL_PA_API"` · `VirtransportSftp` to `"VIRTRANSPORT_SFTP"` · `Worldnet` to `"WORLDNET"` · `InstaboxWebhook` to `"INSTABOX_WEBHOOK"` · `Kng` to `"KNG"` · `FlashexpressWebhook` to `"FLASHEXPRESS_WEBHOOK"` · `MagyarPostaApi` to `"MAGYAR_POSTA_API"` · `WeshipApi` to `"WESHIP_API"` · `OhiWebhook` to `"OHI_WEBHOOK"` · `Mudita` to `"MUDITA"` · `BluedartApi` to `"BLUEDART_API"` · `TCatApi` to `"T_CAT_API"` · `Ads` to `"ADS"` · `HermesIt` to `"HERMES_IT"` · `FitzmarkApi` to `"FITZMARK_API"` · `PostiApi` to `"POSTI_API"` · `SmsaExpressWebhook` to `"SMSA_EXPRESS_WEBHOOK"` · `TamergroupWebhook` to `"TAMERGROUP_WEBHOOK"` · `Livrapide` to `"LIVRAPIDE"` · `NipponExpress` to `"NIPPON_EXPRESS"` · `Bettertrucks` to `"BETTERTRUCKS"` · `Fan` to `"FAN"` · `PbUspsflatsFtp` to `"PB_USPSFLATS_FTP"` · `Parcelright` to `"PARCELRIGHT"` · `Ithinklogistics` to `"ITHINKLOGISTICS"` · `KerryExpressThWebhook` to `"KERRY_EXPRESS_TH_WEBHOOK"` · `Ecoutier` to `"ECOUTIER"` · `Showl` to `"SHOWL"` · `BrtItApi` to `"BRT_IT_API"` · `RixonhkApi` to `"RIXONHK_API"` · `DbschenkerApi` to `"DBSCHENKER_API"` · `Ilyanglogis` to `"ILYANGLOGIS"` · `MailBoxEtc` to `"MAIL_BOX_ETC"` · `Weship` to `"WESHIP"` · `DhlGlobalMailApi` to `"DHL_GLOBAL_MAIL_API"` · `Activos24Api` to `"ACTIVOS24_API"` · `Atshealthcare` to `"ATSHEALTHCARE"` · `Luwjistik` to `"LUWJISTIK"` · `GwWorld` to `"GW_WORLD"` · `FairsendenApi` to `"FAIRSENDEN_API"` · `ServipWebhook` to `"SERVIP_WEBHOOK"` · `Swiship` to `"SWISHIP"` · `Tanet` to `"TANET"` · `HotsinCargo` to `"HOTSIN_CARGO"` · `Direx` to `"DIREX"` · `Huantong` to `"HUANTONG"` · `ImileApi` to `"IMILE_API"` · `Auexpress` to `"AUEXPRESS"` · `Nytlogistics` to `"NYTLOGISTICS"` · `DsvReference` to `"DSV_REFERENCE"` · `NovofarmaWebhook` to `"NOVOFARMA_WEBHOOK"` · `AitworldwideSftp` to `"AITWORLDWIDE_SFTP"` · `Shopolive` to `"SHOPOLIVE"` · `FnfZa` to `"FNF_ZA"` · `DhlEcommerceGc` to `"DHL_ECOMMERCE_GC"` · `Fetchr` to `"FETCHR"` · `StarlinksApi` to `"STARLINKS_API"` · `Yyexpress` to `"YYEXPRESS"` · `Servientrega` to `"SERVIENTREGA"` · `Hanjin` to `"HANJIN"` · `SpanishSeurFtp` to `"SPANISH_SEUR_FTP"` · `DxB2BConnum` to `"DX_B2B_CONNUM"` · `HelthjemApi` to `"HELTHJEM_API"` · `Inexpost` to `"INEXPOST"` · `A2BBa` to `"A2B_BA"` · `RhenusGroup` to `"RHENUS_GROUP"` · `SberlogisticsRu` to `"SBERLOGISTICS_RU"` · `MalcaAmit` to `"MALCA_AMIT"` · `Ppl` to `"PPL"` · `OsmWorldwideSftp` to `"OSM_WORLDWIDE_SFTP"` · `Acilogistix` to `"ACILOGISTIX"` · `Optimacourier` to `"OPTIMACOURIER"` · `NovaPoshtaApi` to `"NOVA_POSHTA_API"` · `Loggi` to `"LOGGI"` · `Yifan` to `"YIFAN"` · `Mydynalogic` to `"MYDYNALOGIC"` · `Morninglobal` to `"MORNINGLOBAL"` · `ConciseApi` to `"CONCISE_API"` · `Fxtran` to `"FXTRAN"` · `DeliveryourparcelZa` to `"DELIVERYOURPARCEL_ZA"` · `Uparcel` to `"UPARCEL"` · `MobiBr` to `"MOBI_BR"` · `LoginextWebhook` to `"LOGINEXT_WEBHOOK"` · `Ems` to `"EMS"` · `Speedy` to `"SPEEDY"` · `ZoomRed` to `"ZOOM_RED"` · `Navlungo` to `"NAVLUNGO"` · `Castleparcels` to `"CASTLEPARCELS"` · `Weee` to `"WEEE"` · `Packaly` to `"PACKALY"` · `Yunhuipost` to `"YUNHUIPOST"` · `Youparcel` to `"YOUPARCEL"` · `Leman` to `"LEMAN"` · `Moovin` to `"MOOVIN"` · `UrbIt` to `"URB_IT"` · `Multientregapanama` to `"MULTIENTREGAPANAMA"` · `Jusdasr` to `"JUSDASR"` · `Discountpost` to `"DISCOUNTPOST"` · `RhenusUk` to `"RHENUS_UK"` · `SwishipJp` to `"SWISHIP_JP"` · `GlsUs` to `"GLS_US"` · `Smtl` to `"SMTL"` · `Emega` to `"EMEGA"` · `ExpressoneSv` to `"EXPRESSONE_SV"` · `Hepsijet` to `"HEPSIJET"` · `Welivery` to `"WELIVERY"` · `Bringer` to `"BRINGER"` · `Easyroutes` to `"EASYROUTES"` · `Mrw` to `"MRW"` · `Rpm` to `"RPM"` · `DpdPrt` to `"DPD_PRT"` · `GlsRomania` to `"GLS_ROMANIA"` · `Lmparcel` to `"LMPARCEL"` · `Gtagsm` to `"GTAGSM"` · `Domino` to `"DOMINO"` · `Eshipper` to `"ESHIPPER"` · `Transpak` to `"TRANSPAK"` · `Xindus` to `"XINDUS"` · `Aoyue` to `"AOYUE"` · `Easyparcel` to `"EASYPARCEL"` · `Expressone` to `"EXPRESSONE"` · `SendeoKargo` to `"SENDEO_KARGO"` · `Speedaf` to `"SPEEDAF"` · `Etower` to `"ETOWER"` · `Gcx` to `"GCX"` · `NinjavanVn` to `"NINJAVAN_VN"` · `Allegro` to `"ALLEGRO"` · `Jumppoint` to `"JUMPPOINT"` · `ShipglobalUs` to `"SHIPGLOBAL_US"` · `Kinisi` to `"KINISI"` · `Oakh` to `"OAKH"` · `Awest` to `"AWEST"` · `Barsan` to `"BARSAN"` · `Energologistic` to `"ENERGOLOGISTIC"` · `Madrooex` to `"MADROOEX"` · `Gobolt` to `"GOBOLT"` · `SwissUniversalExpress` to `"SWISS_UNIVERSAL_EXPRESS"` · `Iordirect` to `"IORDIRECT"` · `Xmszm` to `"XMSZM"` · `GlsHun` to `"GLS_HUN"` · `Sendy` to `"SENDY"` · `Braunsexpress` to `"BRAUNSEXPRESS"` · `Grandslamexpress` to `"GRANDSLAMEXPRESS"` · `Xgs` to `"XGS"` · `Otschile` to `"OTSCHILE"` · `PackUp` to `"PACK_UP"` · `Parcelstars` to `"PARCELSTARS"` · `Teamexpressllc` to `"TEAMEXPRESSLLC"` · `Asyadexpress` to `"ASYADEXPRESS"` · `Tdn` to `"TDN"` · `Earlybird` to `"EARLYBIRD"` · `Cacesa` to `"CACESA"` · `Parceljet` to `"PARCELJET"` · `MngKargo` to `"MNG_KARGO"` · `Superpackline` to `"SUPERPACKLINE"` · `Speedx` to `"SPEEDX"` · `Vesyl` to `"VESYL"` · `Skyking` to `"SKYKING"` · `Dirmensajeria` to `"DIRMENSAJERIA"` · `Netlogixgroup` to `"NETLOGIXGROUP"` · `Zyou` to `"ZYOU"` · `Jawar` to `"JAWAR"` · `Agsystems` to `"AGSYSTEMS"` · `Gps` to `"GPS"` · `PttKargo` to `"PTT_KARGO"` · `Maergo` to `"MAERGO"` · `Arihantcourier` to `"ARIHANTCOURIER"` · `Vtfe` to `"VTFE"` · `Yunant` to `"YUNANT"` · `Urbify` to `"URBIFY"` · `PackMan` to `"PACK_MAN"` · `Liefergrun` to `"LIEFERGRUN"` · `Obibox` to `"OBIBOX"` · `Paikeda` to `"PAIKEDA"` · `Scotty` to `"SCOTTY"` · `IntelcomCa` to `"INTELCOM_CA"` · `Swe` to `"SWE"` · `Asendia` to `"ASENDIA"` · `DpdAt` to `"DPD_AT"` · `Relay` to `"RELAY"` · `Ata` to `"ATA"` · `SkyexpressInternational` to `"SKYEXPRESS_INTERNATIONAL"` · `SuratKargo` to `"SURAT_KARGO"` · `Sglink` to `"SGLINK"` · `Fleetopticsinc` to `"FLEETOPTICSINC"` · `Shopline` to `"SHOPLINE"` · `Piggyship` to `"PIGGYSHIP"` · `Logoix` to `"LOGOIX"` · `KolayGelsin` to `"KOLAY_GELSIN"` · `AssociatedCouriers` to `"ASSOCIATED_COURIERS"` · `UpsChecker` to `"UPS_CHECKER"` · `Wineshipping` to `"WINESHIPPING"` · `Spedisci` to `"SPEDISCI"` · `Fourkites` to `"FOURKITES"` · `Etonas` to `"ETONAS"` · `Finmile` to `"FINMILE"` · `Uniuni` to `"UNIUNI"` · `Rodonaves` to `"RODONAVES"` · `InpostIt` to `"INPOST_IT"` · `TforceFreight` to `"TFORCE_FREIGHT"` · `Richmom` to `"RICHMOM"` · `Franco` to `"FRANCO"` · `Ecparcel` to `"ECPARCEL"` · `FedexChina` to `"FEDEX_CHINA"` · `GofoExpress` to `"GOFO_EXPRESS"` · `Shipbob` to `"SHIPBOB"` · `JerseypostAtlas` to `"JERSEYPOST_ATLAS"` · `Coretrails` to `"CORETRAILS"` · `RhenusItaly` to `"RHENUS_ITALY"` · `Jadlog` to `"JADLOG"` · `Jitsu` to `"JITSU"` · `YanwenExpress` to `"YANWEN_EXPRESS"` · `Dashlink` to `"DASHLINK"` · `SeinoSuperExpress` to `"SEINO_SUPER_EXPRESS"` · `Floship` to `"FLOSHIP"` · `Metroscg` to `"METROSCG"` · `Sendparcel` to `"SENDPARCEL"` · `P2P` to `"P2P"` · `CnExpress` to `"CN_EXPRESS"` · `Cirrotrack` to `"CIRROTRACK"` · `LandLogistics` to `"LAND_LOGISTICS"` · `Veho` to `"VEHO"` · `Medline` to `"MEDLINE"` · `Vdtrack` to `"VDTRACK"` · `SinoScm` to `"SINO_SCM"` · `_3PeExpress` to `"3PE_EXPRESS"` · `Swiftx` to `"SWIFTX"` · `Sfydexpress` to `"SFYDEXPRESS"` · `Toptrans` to `"TOPTRANS"` · `Other` to `"OTHER"` | `shipmentCarrierSchema` |
| `ShippingType` | `Shipping` to `"SHIPPING"` · `Pickup` to `"PICKUP"` · `PickupInStore` to `"PICKUP_IN_STORE"` · `PickupFromPerson` to `"PICKUP_FROM_PERSON"` | `shippingTypeSchema` |
| `StandardEntryClassCode` | `Tel` to `"TEL"` · `Web` to `"WEB"` · `Ccd` to `"CCD"` · `Ppd` to `"PPD"` | `standardEntryClassCodeSchema` |
| `StoreInVaultInstruction` | `OnSuccess` to `"ON_SUCCESS"` | `storeInVaultInstructionSchema` |
| `StoredPaymentSourcePaymentType` | `OneTime` to `"ONE_TIME"` · `Recurring` to `"RECURRING"` · `Unscheduled` to `"UNSCHEDULED"` | `storedPaymentSourcePaymentTypeSchema` |
| `StoredPaymentSourceUsageType` | `First` to `"FIRST"` · `Subsequent` to `"SUBSEQUENT"` · `Derived` to `"DERIVED"` | `storedPaymentSourceUsageTypeSchema` |
| `SubscriptionPlanStatus` | `Created` to `"CREATED"` · `Inactive` to `"INACTIVE"` · `Active` to `"ACTIVE"` | `subscriptionPlanStatusSchema` |
| `SubscriptionPricingModel` | `Volume` to `"VOLUME"` · `Tiered` to `"TIERED"` | `subscriptionPricingModelSchema` |
| `SubscriptionsCardBrand` | `Visa` to `"VISA"` · `Mastercard` to `"MASTERCARD"` · `Discover` to `"DISCOVER"` · `Amex` to `"AMEX"` · `Solo` to `"SOLO"` · `Jcb` to `"JCB"` · `Star` to `"STAR"` · `Delta` to `"DELTA"` · `Switch` to `"SWITCH"` · `Maestro` to `"MAESTRO"` · `CbNationale` to `"CB_NATIONALE"` · `Configoga` to `"CONFIGOGA"` · `Confidis` to `"CONFIDIS"` · `Electron` to `"ELECTRON"` · `Cetelem` to `"CETELEM"` · `ChinaUnionPay` to `"CHINA_UNION_PAY"` · `Diners` to `"DINERS"` · `Elo` to `"ELO"` · `Hiper` to `"HIPER"` · `Hipercard` to `"HIPERCARD"` · `Rupay` to `"RUPAY"` · `Ge` to `"GE"` · `Synchrony` to `"SYNCHRONY"` · `Eftpos` to `"EFTPOS"` · `Unknown` to `"UNKNOWN"` | `subscriptionsCardBrandSchema` |
| `TaxIdType` | `BrCpf` to `"BR_CPF"` · `BrCnpj` to `"BR_CNPJ"` | `taxIdTypeSchema` |
| `TenureType` | `Regular` to `"REGULAR"` · `Trial` to `"TRIAL"` | `tenureTypeSchema` |
| `TokenType` | `BillingAgreement` to `"BILLING_AGREEMENT"` | `tokenTypeSchema` |
| `UpcType` | `UpcA` to `"UPC-A"` · `UpcB` to `"UPC-B"` · `UpcC` to `"UPC-C"` · `UpcD` to `"UPC-D"` · `UpcE` to `"UPC-E"` · `Upc2` to `"UPC-2"` · `Upc5` to `"UPC-5"` | `upcTypeSchema` |
| `UsagePattern` | `Immediate` to `"IMMEDIATE"` · `Deferred` to `"DEFERRED"` · `RecurringPrepaid` to `"RECURRING_PREPAID"` · `RecurringPostpaid` to `"RECURRING_POSTPAID"` · `ThresholdPrepaid` to `"THRESHOLD_PREPAID"` · `ThresholdPostpaid` to `"THRESHOLD_POSTPAID"` · `SubscriptionPrepaid` to `"SUBSCRIPTION_PREPAID"` · `SubscriptionPostpaid` to `"SUBSCRIPTION_POSTPAID"` · `UnscheduledPrepaid` to `"UNSCHEDULED_PREPAID"` · `UnscheduledPostpaid` to `"UNSCHEDULED_POSTPAID"` · `InstallmentPrepaid` to `"INSTALLMENT_PREPAID"` · `InstallmentPostpaid` to `"INSTALLMENT_POSTPAID"` | `usagePatternSchema` |
| `UsageType` | `Merchant` to `"MERCHANT"` · `Platform` to `"PLATFORM"` | `usageTypeSchema` |
| `VaultCardVerificationMethod` | `ScaWhenRequired` to `"SCA_WHEN_REQUIRED"` · `ScaAlways` to `"SCA_ALWAYS"` | `vaultCardVerificationMethodSchema` |
| `VaultInstructionAction` | `OnCreatePaymentTokens` to `"ON_CREATE_PAYMENT_TOKENS"` · `OnPayerApproval` to `"ON_PAYER_APPROVAL"` | `vaultInstructionActionSchema` |
| `VaultStatus` | `Vaulted` to `"VAULTED"` · `Created` to `"CREATED"` · `Approved` to `"APPROVED"` | `vaultStatusSchema` |
| `VaultTokenRequestType` | `SetupToken` to `"SETUP_TOKEN"` | `vaultTokenRequestTypeSchema` |
| `VaultUserAction` | `SetupNow` to `"SETUP_NOW"` · `Continue` to `"CONTINUE"` | `vaultUserActionSchema` |
| `VenmoPaymentTokenCustomerType` | `Consumer` to `"CONSUMER"` · `Business` to `"BUSINESS"` | `venmoPaymentTokenCustomerTypeSchema` |
| `VenmoPaymentTokenUsagePattern` | `Immediate` to `"IMMEDIATE"` · `Deferred` to `"DEFERRED"` · `RecurringPrepaid` to `"RECURRING_PREPAID"` · `RecurringPostpaid` to `"RECURRING_POSTPAID"` · `ThresholdPrepaid` to `"THRESHOLD_PREPAID"` · `ThresholdPostpaid` to `"THRESHOLD_POSTPAID"` | `venmoPaymentTokenUsagePatternSchema` |
| `VenmoPaymentTokenUsageType` | `Merchant` to `"MERCHANT"` · `Platform` to `"PLATFORM"` | `venmoPaymentTokenUsageTypeSchema` |
| `VenmoVaultResponseStatus` | `Vaulted` to `"VAULTED"` · `Created` to `"CREATED"` · `Approved` to `"APPROVED"` | `venmoVaultResponseStatusSchema` |
| `VenmoWalletExperienceContextShippingPreference` | `GetFromFile` to `"GET_FROM_FILE"` · `NoShipping` to `"NO_SHIPPING"` · `SetProvidedAddress` to `"SET_PROVIDED_ADDRESS"` | `venmoWalletExperienceContextShippingPreferenceSchema` |
| `VenmoWalletExperienceContextUserAction` | `Continue` to `"CONTINUE"` · `PayNow` to `"PAY_NOW"` | `venmoWalletExperienceContextUserActionSchema` |

**Wire-name divergences.** Only these model properties are sent and received under a different name; every other property uses its TypeScript name verbatim.

| Type | Property | Wire key |
| --- | --- | --- |
| `ActivityTimestamps` | `createTime` | `create_time` |
| `ActivityTimestamps` | `updateTime` | `update_time` |
| `Address` | `addressLine1` | `address_line_1` |
| `Address` | `addressLine2` | `address_line_2` |
| `Address` | `adminArea2` | `admin_area_2` |
| `Address` | `adminArea1` | `admin_area_1` |
| `Address` | `postalCode` | `postal_code` |
| `Address` | `countryCode` | `country_code` |
| `AmountBreakdown` | `itemTotal` | `item_total` |
| `AmountBreakdown` | `taxTotal` | `tax_total` |
| `AmountBreakdown` | `shippingDiscount` | `shipping_discount` |
| `AmountWithBreakdown` | `currencyCode` | `currency_code` |
| `AppSwitchContext` | `nativeApp` | `native_app` |
| `AppSwitchContext` | `mobileWeb` | `mobile_web` |
| `ApplePayCard` | `lastDigits` | `last_digits` |
| `ApplePayCard` | `billingAddress` | `billing_address` |
| `ApplePayCardResponse` | `lastDigits` | `last_digits` |
| `ApplePayCardResponse` | `availableNetworks` | `available_networks` |
| `ApplePayCardResponse` | `authenticationResult` | `authentication_result` |
| `ApplePayCardResponse` | `fromRequest` | `from_request` |
| `ApplePayCardResponse` | `binDetails` | `bin_details` |
| `ApplePayCardResponse` | `storedCredential` | `stored_credential` |
| `ApplePayCardResponse` | `billingAddress` | `billing_address` |
| `ApplePayCardResponse` | `countryCode` | `country_code` |
| `ApplePayDecryptedTokenData` | `transactionAmount` | `transaction_amount` |
| `ApplePayDecryptedTokenData` | `tokenizedCard` | `tokenized_card` |
| `ApplePayDecryptedTokenData` | `deviceManufacturerId` | `device_manufacturer_id` |
| `ApplePayDecryptedTokenData` | `paymentDataType` | `payment_data_type` |
| `ApplePayDecryptedTokenData` | `paymentData` | `payment_data` |
| `ApplePayExperienceContext` | `returnUrl` | `return_url` |
| `ApplePayExperienceContext` | `cancelUrl` | `cancel_url` |
| `ApplePayPaymentData` | `eciIndicator` | `eci_indicator` |
| `ApplePayPaymentData` | `emvData` | `emv_data` |
| `ApplePayPaymentObject` | `emailAddress` | `email_address` |
| `ApplePayPaymentObject` | `phoneNumber` | `phone_number` |
| `ApplePayPaymentObject` | `storedCredential` | `stored_credential` |
| `ApplePayRequest` | `emailAddress` | `email_address` |
| `ApplePayRequest` | `phoneNumber` | `phone_number` |
| `ApplePayRequest` | `decryptedToken` | `decrypted_token` |
| `ApplePayRequest` | `storedCredential` | `stored_credential` |
| `ApplePayRequest` | `vaultId` | `vault_id` |
| `ApplePayRequest` | `experienceContext` | `experience_context` |
| `ApplePayRequestCard` | `billingAddress` | `billing_address` |
| `ApplePayTokenizedCard` | `cardType` | `card_type` |
| `ApplePayTokenizedCard` | `billingAddress` | `billing_address` |
| `AssuranceDetails` | `accountVerified` | `account_verified` |
| `AssuranceDetails` | `cardHolderAuthenticated` | `card_holder_authenticated` |
| `AuctionInformation` | `auctionSite` | `auction_site` |
| `AuctionInformation` | `auctionItemSite` | `auction_item_site` |
| `AuctionInformation` | `auctionBuyerId` | `auction_buyer_id` |
| `AuctionInformation` | `auctionClosingDate` | `auction_closing_date` |
| `AuthenticationResponse` | `liabilityShift` | `liability_shift` |
| `AuthenticationResponse` | `threeDSecure` | `three_d_secure` |
| `Authorization` | `statusDetails` | `status_details` |
| `Authorization` | `invoiceId` | `invoice_id` |
| `Authorization` | `customId` | `custom_id` |
| `Authorization` | `networkTransactionReference` | `network_transaction_reference` |
| `Authorization` | `sellerProtection` | `seller_protection` |
| `Authorization` | `expirationTime` | `expiration_time` |
| `Authorization` | `createTime` | `create_time` |
| `Authorization` | `updateTime` | `update_time` |
| `AuthorizationStatusWithDetails` | `statusDetails` | `status_details` |
| `AuthorizationWithAdditionalData` | `statusDetails` | `status_details` |
| `AuthorizationWithAdditionalData` | `invoiceId` | `invoice_id` |
| `AuthorizationWithAdditionalData` | `customId` | `custom_id` |
| `AuthorizationWithAdditionalData` | `networkTransactionReference` | `network_transaction_reference` |
| `AuthorizationWithAdditionalData` | `sellerProtection` | `seller_protection` |
| `AuthorizationWithAdditionalData` | `expirationTime` | `expiration_time` |
| `AuthorizationWithAdditionalData` | `createTime` | `create_time` |
| `AuthorizationWithAdditionalData` | `updateTime` | `update_time` |
| `AuthorizationWithAdditionalData` | `processorResponse` | `processor_response` |
| `BlikExperienceContext` | `brandName` | `brand_name` |
| `BlikExperienceContext` | `shippingPreference` | `shipping_preference` |
| `BlikExperienceContext` | `returnUrl` | `return_url` |
| `BlikExperienceContext` | `cancelUrl` | `cancel_url` |
| `BlikExperienceContext` | `consumerIp` | `consumer_ip` |
| `BlikExperienceContext` | `consumerUserAgent` | `consumer_user_agent` |
| `BlikLevel0PaymentObject` | `authCode` | `auth_code` |
| `BlikOneClickPaymentObject` | `consumerReference` | `consumer_reference` |
| `BlikOneClickPaymentRequest` | `authCode` | `auth_code` |
| `BlikOneClickPaymentRequest` | `consumerReference` | `consumer_reference` |
| `BlikOneClickPaymentRequest` | `aliasLabel` | `alias_label` |
| `BlikOneClickPaymentRequest` | `aliasKey` | `alias_key` |
| `BlikPaymentObject` | `countryCode` | `country_code` |
| `BlikPaymentObject` | `oneClick` | `one_click` |
| `BlikPaymentRequest` | `countryCode` | `country_code` |
| `BlikPaymentRequest` | `experienceContext` | `experience_context` |
| `BlikPaymentRequest` | `level0` | `level_0` |
| `BlikPaymentRequest` | `oneClick` | `one_click` |
| `BalanceInformation` | `totalBalance` | `total_balance` |
| `BalanceInformation` | `availableBalance` | `available_balance` |
| `BalanceInformation` | `withheldBalance` | `withheld_balance` |
| `BalancesResponse` | `accountId` | `account_id` |
| `BalancesResponse` | `asOfTime` | `as_of_time` |
| `BalancesResponse` | `lastRefreshTime` | `last_refresh_time` |
| `BancontactPaymentObject` | `countryCode` | `country_code` |
| `BancontactPaymentObject` | `ibanLastChars` | `iban_last_chars` |
| `BancontactPaymentObject` | `cardLastDigits` | `card_last_digits` |
| `BancontactPaymentRequest` | `countryCode` | `country_code` |
| `BancontactPaymentRequest` | `experienceContext` | `experience_context` |
| `BankRequest` | `achDebit` | `ach_debit` |
| `BankRequest` | `sepaDebit` | `sepa_debit` |
| `BillingCycle` | `tenureType` | `tenure_type` |
| `BillingCycle` | `pricingScheme` | `pricing_scheme` |
| `BillingCycle` | `totalCycles` | `total_cycles` |
| `BillingCycle` | `startDate` | `start_date` |
| `BillingCycleOverride` | `pricingScheme` | `pricing_scheme` |
| `BillingCycleOverride` | `totalCycles` | `total_cycles` |
| `BillingPlan` | `productId` | `product_id` |
| `BillingPlan` | `billingCycles` | `billing_cycles` |
| `BillingPlan` | `paymentPreferences` | `payment_preferences` |
| `BillingPlan` | `merchantPreferences` | `merchant_preferences` |
| `BillingPlan` | `quantitySupported` | `quantity_supported` |
| `BillingPlan` | `createTime` | `create_time` |
| `BillingPlan` | `updateTime` | `update_time` |
| `BinDetails` | `issuingBank` | `issuing_bank` |
| `BinDetails` | `binCountryCode` | `bin_country_code` |
| `CallbackConfiguration` | `callbackEvents` | `callback_events` |
| `CallbackConfiguration` | `callbackUrl` | `callback_url` |
| `CapturePaymentInstruction` | `platformFees` | `platform_fees` |
| `CapturePaymentInstruction` | `disbursementMode` | `disbursement_mode` |
| `CapturePaymentInstruction` | `payeeReceivableFxRateId` | `payee_receivable_fx_rate_id` |
| `CaptureRequest` | `invoiceId` | `invoice_id` |
| `CaptureRequest` | `finalCapture` | `final_capture` |
| `CaptureRequest` | `paymentInstruction` | `payment_instruction` |
| `CaptureRequest` | `noteToPayer` | `note_to_payer` |
| `CaptureRequest` | `softDescriptor` | `soft_descriptor` |
| `CaptureStatusWithDetails` | `statusDetails` | `status_details` |
| `CaptureSubscriptionRequest` | `captureType` | `capture_type` |
| `CapturedPayment` | `statusDetails` | `status_details` |
| `CapturedPayment` | `invoiceId` | `invoice_id` |
| `CapturedPayment` | `customId` | `custom_id` |
| `CapturedPayment` | `networkTransactionReference` | `network_transaction_reference` |
| `CapturedPayment` | `sellerProtection` | `seller_protection` |
| `CapturedPayment` | `finalCapture` | `final_capture` |
| `CapturedPayment` | `sellerReceivableBreakdown` | `seller_receivable_breakdown` |
| `CapturedPayment` | `disbursementMode` | `disbursement_mode` |
| `CapturedPayment` | `processorResponse` | `processor_response` |
| `CapturedPayment` | `createTime` | `create_time` |
| `CapturedPayment` | `updateTime` | `update_time` |
| `CapturedPayment` | `supplementaryData` | `supplementary_data` |
| `CardAuthenticationResponse` | `threeDSecure` | `three_d_secure` |
| `CardCustomer` | `emailAddress` | `email_address` |
| `CardCustomer` | `merchantCustomerId` | `merchant_customer_id` |
| `CardCustomerInformation` | `emailAddress` | `email_address` |
| `CardCustomerInformation` | `merchantCustomerId` | `merchant_customer_id` |
| `CardExperienceContext` | `returnUrl` | `return_url` |
| `CardExperienceContext` | `cancelUrl` | `cancel_url` |
| `CardFromRequest` | `lastDigits` | `last_digits` |
| `CardPaymentTokenEntity` | `lastDigits` | `last_digits` |
| `CardPaymentTokenEntity` | `billingAddress` | `billing_address` |
| `CardPaymentTokenEntity` | `verificationStatus` | `verification_status` |
| `CardPaymentTokenEntity` | `networkTransactionReference` | `network_transaction_reference` |
| `CardPaymentTokenEntity` | `authenticationResult` | `authentication_result` |
| `CardPaymentTokenEntity` | `binDetails` | `bin_details` |
| `CardRequest` | `securityCode` | `security_code` |
| `CardRequest` | `billingAddress` | `billing_address` |
| `CardRequest` | `vaultId` | `vault_id` |
| `CardRequest` | `singleUseToken` | `single_use_token` |
| `CardRequest` | `storedCredential` | `stored_credential` |
| `CardRequest` | `networkToken` | `network_token` |
| `CardRequest` | `experienceContext` | `experience_context` |
| `CardResponse` | `lastDigits` | `last_digits` |
| `CardResponse` | `availableNetworks` | `available_networks` |
| `CardResponse` | `authenticationResult` | `authentication_result` |
| `CardResponse` | `fromRequest` | `from_request` |
| `CardResponse` | `binDetails` | `bin_details` |
| `CardResponse` | `storedCredential` | `stored_credential` |
| `CardResponseAddress` | `addressLine1` | `address_line_1` |
| `CardResponseAddress` | `addressLine2` | `address_line_2` |
| `CardResponseAddress` | `adminArea2` | `admin_area_2` |
| `CardResponseAddress` | `adminArea1` | `admin_area_1` |
| `CardResponseAddress` | `postalCode` | `postal_code` |
| `CardResponseAddress` | `countryCode` | `country_code` |
| `CardResponseWithBillingAddress` | `billingAddress` | `billing_address` |
| `CardResponseWithBillingAddress` | `currencyCode` | `currency_code` |
| `CardStoredCredential` | `paymentInitiator` | `payment_initiator` |
| `CardStoredCredential` | `paymentType` | `payment_type` |
| `CardStoredCredential` | `previousNetworkTransactionReference` | `previous_network_transaction_reference` |
| `CardSupplementaryData` | `level2` | `level_2` |
| `CardSupplementaryData` | `level3` | `level_3` |
| `CardVerificationDetails` | `networkTransactionId` | `network_transaction_id` |
| `CardVerificationDetails` | `processorResponse` | `processor_response` |
| `CardVerificationDetails` | `threeDSecure` | `three_d_secure` |
| `CardVerificationProcessorResponse` | `avsCode` | `avs_code` |
| `CardVerificationProcessorResponse` | `cvvCode` | `cvv_code` |
| `CartInformation` | `itemDetails` | `item_details` |
| `CartInformation` | `taxInclusive` | `tax_inclusive` |
| `CartInformation` | `paypalInvoiceId` | `paypal_invoice_id` |
| `CheckoutOption` | `checkoutOptionName` | `checkout_option_name` |
| `CheckoutOption` | `checkoutOptionValue` | `checkout_option_value` |
| `ConfirmOrderRequest` | `paymentSource` | `payment_source` |
| `ConfirmOrderRequest` | `processingInstruction` | `processing_instruction` |
| `ConfirmOrderRequest` | `applicationContext` | `application_context` |
| `CreateSubscriptionRequest` | `planId` | `plan_id` |
| `CreateSubscriptionRequest` | `startTime` | `start_time` |
| `CreateSubscriptionRequest` | `shippingAmount` | `shipping_amount` |
| `CreateSubscriptionRequest` | `autoRenewal` | `auto_renewal` |
| `CreateSubscriptionRequest` | `applicationContext` | `application_context` |
| `CreateSubscriptionRequest` | `customId` | `custom_id` |
| `Customer` | `merchantCustomerId` | `merchant_customer_id` |
| `CustomerInformation` | `emailAddress` | `email_address` |
| `CustomerResponse` | `merchantCustomerId` | `merchant_customer_id` |
| `CustomerVaultPaymentTokensResponse` | `totalItems` | `total_items` |
| `CustomerVaultPaymentTokensResponse` | `totalPages` | `total_pages` |
| `CustomerVaultPaymentTokensResponse` | `paymentTokens` | `payment_tokens` |
| `CycleExecution` | `tenureType` | `tenure_type` |
| `CycleExecution` | `cyclesCompleted` | `cycles_completed` |
| `CycleExecution` | `cyclesRemaining` | `cycles_remaining` |
| `CycleExecution` | `currentPricingSchemeVersion` | `current_pricing_scheme_version` |
| `CycleExecution` | `totalCycles` | `total_cycles` |
| `DefaultError` | `debugId` | `debug_id` |
| `DefaultError` | `informationLink` | `information_link` |
| `DefaultErrorError` | `debugId` | `debug_id` |
| `DefaultErrorError` | `informationLink` | `information_link` |
| `EpsPaymentObject` | `countryCode` | `country_code` |
| `EpsPaymentRequest` | `countryCode` | `country_code` |
| `EpsPaymentRequest` | `experienceContext` | `experience_context` |
| `Error` | `debugId` | `debug_id` |
| `ErrorError` | `debugId` | `debug_id` |
| `ExchangeRate` | `sourceCurrency` | `source_currency` |
| `ExchangeRate` | `targetCurrency` | `target_currency` |
| `ExperienceContext` | `brandName` | `brand_name` |
| `ExperienceContext` | `shippingPreference` | `shipping_preference` |
| `ExperienceContext` | `returnUrl` | `return_url` |
| `ExperienceContext` | `cancelUrl` | `cancel_url` |
| `FailedPaymentDetails` | `reasonCode` | `reason_code` |
| `FailedPaymentDetails` | `nextPaymentRetryTime` | `next_payment_retry_time` |
| `Frequency` | `intervalUnit` | `interval_unit` |
| `Frequency` | `intervalCount` | `interval_count` |
| `GiropayPaymentObject` | `countryCode` | `country_code` |
| `GiropayPaymentRequest` | `countryCode` | `country_code` |
| `GiropayPaymentRequest` | `experienceContext` | `experience_context` |
| `GooglePayCard` | `lastDigits` | `last_digits` |
| `GooglePayCard` | `billingAddress` | `billing_address` |
| `GooglePayCardResponse` | `lastDigits` | `last_digits` |
| `GooglePayCardResponse` | `billingAddress` | `billing_address` |
| `GooglePayCardResponse` | `authenticationResult` | `authentication_result` |
| `GooglePayDecryptedTokenData` | `messageId` | `message_id` |
| `GooglePayDecryptedTokenData` | `messageExpiration` | `message_expiration` |
| `GooglePayDecryptedTokenData` | `paymentMethod` | `payment_method` |
| `GooglePayDecryptedTokenData` | `authenticationMethod` | `authentication_method` |
| `GooglePayDecryptedTokenData` | `eciIndicator` | `eci_indicator` |
| `GooglePayExperienceContext` | `returnUrl` | `return_url` |
| `GooglePayExperienceContext` | `cancelUrl` | `cancel_url` |
| `GooglePayRequest` | `emailAddress` | `email_address` |
| `GooglePayRequest` | `phoneNumber` | `phone_number` |
| `GooglePayRequest` | `decryptedToken` | `decrypted_token` |
| `GooglePayRequest` | `assuranceDetails` | `assurance_details` |
| `GooglePayRequest` | `experienceContext` | `experience_context` |
| `GooglePayRequestCard` | `billingAddress` | `billing_address` |
| `GooglePayWalletResponse` | `emailAddress` | `email_address` |
| `GooglePayWalletResponse` | `phoneNumber` | `phone_number` |
| `IncentiveDetails` | `incentiveType` | `incentive_type` |
| `IncentiveDetails` | `incentiveCode` | `incentive_code` |
| `IncentiveDetails` | `incentiveAmount` | `incentive_amount` |
| `IncentiveDetails` | `incentiveProgramCode` | `incentive_program_code` |
| `IncentiveInformation` | `incentiveDetails` | `incentive_details` |
| `Item` | `unitAmount` | `unit_amount` |
| `Item` | `imageUrl` | `image_url` |
| `Item` | `billingPlan` | `billing_plan` |
| `ItemDetails` | `itemCode` | `item_code` |
| `ItemDetails` | `itemName` | `item_name` |
| `ItemDetails` | `itemDescription` | `item_description` |
| `ItemDetails` | `itemOptions` | `item_options` |
| `ItemDetails` | `itemQuantity` | `item_quantity` |
| `ItemDetails` | `itemUnitPrice` | `item_unit_price` |
| `ItemDetails` | `itemAmount` | `item_amount` |
| `ItemDetails` | `discountAmount` | `discount_amount` |
| `ItemDetails` | `adjustmentAmount` | `adjustment_amount` |
| `ItemDetails` | `giftWrapAmount` | `gift_wrap_amount` |
| `ItemDetails` | `taxPercentage` | `tax_percentage` |
| `ItemDetails` | `taxAmounts` | `tax_amounts` |
| `ItemDetails` | `basicShippingAmount` | `basic_shipping_amount` |
| `ItemDetails` | `extraShippingAmount` | `extra_shipping_amount` |
| `ItemDetails` | `handlingAmount` | `handling_amount` |
| `ItemDetails` | `insuranceAmount` | `insurance_amount` |
| `ItemDetails` | `totalItemAmount` | `total_item_amount` |
| `ItemDetails` | `invoiceNumber` | `invoice_number` |
| `ItemDetails` | `checkoutOptions` | `checkout_options` |
| `ItemRequest` | `unitAmount` | `unit_amount` |
| `ItemRequest` | `imageUrl` | `image_url` |
| `ItemRequest` | `billingPlan` | `billing_plan` |
| `Level2CardProcessingData` | `invoiceId` | `invoice_id` |
| `Level2CardProcessingData` | `taxTotal` | `tax_total` |
| `Level3CardProcessingData` | `shippingAmount` | `shipping_amount` |
| `Level3CardProcessingData` | `dutyAmount` | `duty_amount` |
| `Level3CardProcessingData` | `discountAmount` | `discount_amount` |
| `Level3CardProcessingData` | `shippingAddress` | `shipping_address` |
| `Level3CardProcessingData` | `shipsFromPostalCode` | `ships_from_postal_code` |
| `Level3CardProcessingData` | `lineItems` | `line_items` |
| `LineItem` | `imageUrl` | `image_url` |
| `LineItem` | `billingPlan` | `billing_plan` |
| `LineItem` | `unitAmount` | `unit_amount` |
| `LineItem` | `commodityCode` | `commodity_code` |
| `LineItem` | `discountAmount` | `discount_amount` |
| `LineItem` | `totalAmount` | `total_amount` |
| `LineItem` | `unitOfMeasure` | `unit_of_measure` |
| `MerchantPreferences` | `returnUrl` | `return_url` |
| `MerchantPreferences` | `cancelUrl` | `cancel_url` |
| `MobileWebContext` | `returnFlow` | `return_flow` |
| `MobileWebContext` | `buyerUserAgent` | `buyer_user_agent` |
| `ModifySubscriptionRequest` | `planId` | `plan_id` |
| `ModifySubscriptionRequest` | `shippingAmount` | `shipping_amount` |
| `ModifySubscriptionRequest` | `shippingAddress` | `shipping_address` |
| `ModifySubscriptionRequest` | `applicationContext` | `application_context` |
| `ModifySubscriptionResponse` | `planId` | `plan_id` |
| `ModifySubscriptionResponse` | `shippingAmount` | `shipping_amount` |
| `ModifySubscriptionResponse` | `shippingAddress` | `shipping_address` |
| `ModifySubscriptionResponse` | `planOverridden` | `plan_overridden` |
| `Money` | `currencyCode` | `currency_code` |
| `MyBankPaymentObject` | `countryCode` | `country_code` |
| `MyBankPaymentObject` | `ibanLastChars` | `iban_last_chars` |
| `MyBankPaymentRequest` | `countryCode` | `country_code` |
| `MyBankPaymentRequest` | `experienceContext` | `experience_context` |
| `Name` | `givenName` | `given_name` |
| `NativeAppContext` | `osType` | `os_type` |
| `NativeAppContext` | `osVersion` | `os_version` |
| `NetAmountBreakdownItem` | `payableAmount` | `payable_amount` |
| `NetAmountBreakdownItem` | `convertedAmount` | `converted_amount` |
| `NetAmountBreakdownItem` | `exchangeRate` | `exchange_rate` |
| `NetworkToken` | `eciFlag` | `eci_flag` |
| `NetworkToken` | `tokenRequestorId` | `token_requestor_id` |
| `NetworkTransaction` | `acquirerReferenceNumber` | `acquirer_reference_number` |
| `OneTimeCharge` | `setupFee` | `setup_fee` |
| `OneTimeCharge` | `shippingAmount` | `shipping_amount` |
| `OneTimeCharge` | `productPrice` | `product_price` |
| `OneTimeCharge` | `totalAmount` | `total_amount` |
| `Order` | `createTime` | `create_time` |
| `Order` | `updateTime` | `update_time` |
| `Order` | `paymentSource` | `payment_source` |
| `Order` | `processingInstruction` | `processing_instruction` |
| `Order` | `purchaseUnits` | `purchase_units` |
| `OrderApplicationContext` | `brandName` | `brand_name` |
| `OrderApplicationContext` | `landingPage` | `landing_page` |
| `OrderApplicationContext` | `shippingPreference` | `shipping_preference` |
| `OrderApplicationContext` | `userAction` | `user_action` |
| `OrderApplicationContext` | `paymentMethod` | `payment_method` |
| `OrderApplicationContext` | `returnUrl` | `return_url` |
| `OrderApplicationContext` | `cancelUrl` | `cancel_url` |
| `OrderApplicationContext` | `storedPaymentSource` | `stored_payment_source` |
| `OrderAuthorizeRequest` | `paymentSource` | `payment_source` |
| `OrderAuthorizeRequestPaymentSource` | `applePay` | `apple_pay` |
| `OrderAuthorizeRequestPaymentSource` | `googlePay` | `google_pay` |
| `OrderAuthorizeResponse` | `createTime` | `create_time` |
| `OrderAuthorizeResponse` | `updateTime` | `update_time` |
| `OrderAuthorizeResponse` | `paymentSource` | `payment_source` |
| `OrderAuthorizeResponse` | `processingInstruction` | `processing_instruction` |
| `OrderAuthorizeResponse` | `purchaseUnits` | `purchase_units` |
| `OrderAuthorizeResponsePaymentSource` | `applePay` | `apple_pay` |
| `OrderAuthorizeResponsePaymentSource` | `googlePay` | `google_pay` |
| `OrderBillingPlan` | `billingCycles` | `billing_cycles` |
| `OrderBillingPlan` | `setupFee` | `setup_fee` |
| `OrderCaptureRequest` | `paymentSource` | `payment_source` |
| `OrderCaptureRequestPaymentSource` | `applePay` | `apple_pay` |
| `OrderCaptureRequestPaymentSource` | `googlePay` | `google_pay` |
| `OrderConfirmApplicationContext` | `brandName` | `brand_name` |
| `OrderConfirmApplicationContext` | `returnUrl` | `return_url` |
| `OrderConfirmApplicationContext` | `cancelUrl` | `cancel_url` |
| `OrderConfirmApplicationContext` | `storedPaymentSource` | `stored_payment_source` |
| `OrderRequest` | `processingInstruction` | `processing_instruction` |
| `OrderRequest` | `purchaseUnits` | `purchase_units` |
| `OrderRequest` | `paymentSource` | `payment_source` |
| `OrderRequest` | `applicationContext` | `application_context` |
| `OrderTrackerItem` | `imageUrl` | `image_url` |
| `OrderTrackerRequest` | `trackingNumber` | `tracking_number` |
| `OrderTrackerRequest` | `carrierNameOther` | `carrier_name_other` |
| `OrderTrackerRequest` | `captureId` | `capture_id` |
| `OrderTrackerRequest` | `notifyPayer` | `notify_payer` |
| `OrderTrackerResponse` | `createTime` | `create_time` |
| `OrderTrackerResponse` | `updateTime` | `update_time` |
| `OrdersCapture` | `statusDetails` | `status_details` |
| `OrdersCapture` | `invoiceId` | `invoice_id` |
| `OrdersCapture` | `customId` | `custom_id` |
| `OrdersCapture` | `networkTransactionReference` | `network_transaction_reference` |
| `OrdersCapture` | `sellerProtection` | `seller_protection` |
| `OrdersCapture` | `finalCapture` | `final_capture` |
| `OrdersCapture` | `sellerReceivableBreakdown` | `seller_receivable_breakdown` |
| `OrdersCapture` | `disbursementMode` | `disbursement_mode` |
| `OrdersCapture` | `processorResponse` | `processor_response` |
| `OrdersCapture` | `createTime` | `create_time` |
| `OrdersCapture` | `updateTime` | `update_time` |
| `P24PaymentObject` | `countryCode` | `country_code` |
| `P24PaymentObject` | `paymentDescriptor` | `payment_descriptor` |
| `P24PaymentObject` | `methodId` | `method_id` |
| `P24PaymentObject` | `methodDescription` | `method_description` |
| `P24PaymentRequest` | `countryCode` | `country_code` |
| `P24PaymentRequest` | `experienceContext` | `experience_context` |
| `ParticipantMetadata` | `ipAddress` | `ip_address` |
| `PayPalPaymentToken` | `usagePattern` | `usage_pattern` |
| `PayPalPaymentToken` | `permitMultiplePaymentTokens` | `permit_multiple_payment_tokens` |
| `PayPalPaymentToken` | `usageType` | `usage_type` |
| `PayPalPaymentToken` | `customerType` | `customer_type` |
| `PayPalPaymentToken` | `emailAddress` | `email_address` |
| `PayPalPaymentToken` | `payerId` | `payer_id` |
| `PayPalPaymentToken` | `accountId` | `account_id` |
| `PayPalPaymentToken` | `phoneNumber` | `phone_number` |
| `PayPalWallet` | `vaultId` | `vault_id` |
| `PayPalWallet` | `emailAddress` | `email_address` |
| `PayPalWallet` | `birthDate` | `birth_date` |
| `PayPalWallet` | `taxInfo` | `tax_info` |
| `PayPalWallet` | `experienceContext` | `experience_context` |
| `PayPalWallet` | `billingAgreementId` | `billing_agreement_id` |
| `PayPalWallet` | `storedCredential` | `stored_credential` |
| `PayPalWalletAttributesResponse` | `cobrandedCards` | `cobranded_cards` |
| `PayPalWalletCustomer` | `emailAddress` | `email_address` |
| `PayPalWalletCustomer` | `merchantCustomerId` | `merchant_customer_id` |
| `PayPalWalletCustomerRequest` | `emailAddress` | `email_address` |
| `PayPalWalletCustomerRequest` | `merchantCustomerId` | `merchant_customer_id` |
| `PayPalWalletExperienceContext` | `brandName` | `brand_name` |
| `PayPalWalletExperienceContext` | `shippingPreference` | `shipping_preference` |
| `PayPalWalletExperienceContext` | `contactPreference` | `contact_preference` |
| `PayPalWalletExperienceContext` | `returnUrl` | `return_url` |
| `PayPalWalletExperienceContext` | `cancelUrl` | `cancel_url` |
| `PayPalWalletExperienceContext` | `appSwitchContext` | `app_switch_context` |
| `PayPalWalletExperienceContext` | `landingPage` | `landing_page` |
| `PayPalWalletExperienceContext` | `userAction` | `user_action` |
| `PayPalWalletExperienceContext` | `paymentMethodPreference` | `payment_method_preference` |
| `PayPalWalletExperienceContext` | `orderUpdateCallbackConfig` | `order_update_callback_config` |
| `PayPalWalletResponse` | `emailAddress` | `email_address` |
| `PayPalWalletResponse` | `accountId` | `account_id` |
| `PayPalWalletResponse` | `accountStatus` | `account_status` |
| `PayPalWalletResponse` | `phoneType` | `phone_type` |
| `PayPalWalletResponse` | `phoneNumber` | `phone_number` |
| `PayPalWalletResponse` | `birthDate` | `birth_date` |
| `PayPalWalletResponse` | `businessName` | `business_name` |
| `PayPalWalletResponse` | `taxInfo` | `tax_info` |
| `PayPalWalletResponse` | `storedCredential` | `stored_credential` |
| `PayPalWalletResponse` | `experienceStatus` | `experience_status` |
| `PayPalWalletStoredCredential` | `paymentInitiator` | `payment_initiator` |
| `PayPalWalletStoredCredential` | `chargePattern` | `charge_pattern` |
| `PayPalWalletStoredCredential` | `usagePattern` | `usage_pattern` |
| `PayPalWalletVaultBase` | `storeInVault` | `store_in_vault` |
| `PayPalWalletVaultBase` | `usagePattern` | `usage_pattern` |
| `PayPalWalletVaultBase` | `usageType` | `usage_type` |
| `PayPalWalletVaultBase` | `customerType` | `customer_type` |
| `PayPalWalletVaultBase` | `permitMultiplePaymentTokens` | `permit_multiple_payment_tokens` |
| `PayPalWalletVaultInstruction` | `storeInVault` | `store_in_vault` |
| `PayPalWalletVaultInstruction` | `usagePattern` | `usage_pattern` |
| `PayPalWalletVaultInstruction` | `usageType` | `usage_type` |
| `PayPalWalletVaultInstruction` | `customerType` | `customer_type` |
| `PayPalWalletVaultInstruction` | `permitMultiplePaymentTokens` | `permit_multiple_payment_tokens` |
| `PayeeBase` | `emailAddress` | `email_address` |
| `PayeeBase` | `merchantId` | `merchant_id` |
| `Payer` | `emailAddress` | `email_address` |
| `Payer` | `payerId` | `payer_id` |
| `Payer` | `birthDate` | `birth_date` |
| `Payer` | `taxInfo` | `tax_info` |
| `PayerBase` | `emailAddress` | `email_address` |
| `PayerBase` | `payerId` | `payer_id` |
| `PayerInformation` | `accountId` | `account_id` |
| `PayerInformation` | `emailAddress` | `email_address` |
| `PayerInformation` | `phoneNumber` | `phone_number` |
| `PayerInformation` | `addressStatus` | `address_status` |
| `PayerInformation` | `payerStatus` | `payer_status` |
| `PayerInformation` | `payerName` | `payer_name` |
| `PayerInformation` | `countryCode` | `country_code` |
| `PayerName` | `givenName` | `given_name` |
| `PayerName` | `middleName` | `middle_name` |
| `PayerName` | `alternateFullName` | `alternate_full_name` |
| `PayerName` | `fullName` | `full_name` |
| `PaymentAuthorization` | `statusDetails` | `status_details` |
| `PaymentAuthorization` | `invoiceId` | `invoice_id` |
| `PaymentAuthorization` | `customId` | `custom_id` |
| `PaymentAuthorization` | `networkTransactionReference` | `network_transaction_reference` |
| `PaymentAuthorization` | `sellerProtection` | `seller_protection` |
| `PaymentAuthorization` | `expirationTime` | `expiration_time` |
| `PaymentAuthorization` | `createTime` | `create_time` |
| `PaymentAuthorization` | `updateTime` | `update_time` |
| `PaymentAuthorization` | `supplementaryData` | `supplementary_data` |
| `PaymentInstruction` | `platformFees` | `platform_fees` |
| `PaymentInstruction` | `disbursementMode` | `disbursement_mode` |
| `PaymentInstruction` | `payeePricingTierId` | `payee_pricing_tier_id` |
| `PaymentInstruction` | `payeeReceivableFxRateId` | `payee_receivable_fx_rate_id` |
| `PaymentMethod` | `payeePreferred` | `payee_preferred` |
| `PaymentMethodPreference` | `payeePreferred` | `payee_preferred` |
| `PaymentMethodPreference` | `standardEntryClassCode` | `standard_entry_class_code` |
| `PaymentPreferences` | `autoBillOutstanding` | `auto_bill_outstanding` |
| `PaymentPreferences` | `setupFee` | `setup_fee` |
| `PaymentPreferences` | `setupFeeFailureAction` | `setup_fee_failure_action` |
| `PaymentPreferences` | `paymentFailureThreshold` | `payment_failure_threshold` |
| `PaymentPreferencesOverride` | `autoBillOutstanding` | `auto_bill_outstanding` |
| `PaymentPreferencesOverride` | `setupFee` | `setup_fee` |
| `PaymentPreferencesOverride` | `setupFeeFailureAction` | `setup_fee_failure_action` |
| `PaymentPreferencesOverride` | `paymentFailureThreshold` | `payment_failure_threshold` |
| `PaymentSource` | `applePay` | `apple_pay` |
| `PaymentSource` | `googlePay` | `google_pay` |
| `PaymentSourceResponse` | `applePay` | `apple_pay` |
| `PaymentSourceResponse` | `googlePay` | `google_pay` |
| `PaymentSupplementaryData` | `relatedIds` | `related_ids` |
| `PaymentTokenRequest` | `paymentSource` | `payment_source` |
| `PaymentTokenRequestCard` | `securityCode` | `security_code` |
| `PaymentTokenRequestCard` | `billingAddress` | `billing_address` |
| `PaymentTokenResponse` | `paymentSource` | `payment_source` |
| `PaymentTokenResponsePaymentSource` | `applePay` | `apple_pay` |
| `PaymentsCapture` | `statusDetails` | `status_details` |
| `PaymentsCapture` | `invoiceId` | `invoice_id` |
| `PaymentsCapture` | `customId` | `custom_id` |
| `PaymentsCapture` | `networkTransactionReference` | `network_transaction_reference` |
| `PaymentsCapture` | `sellerProtection` | `seller_protection` |
| `PaymentsCapture` | `finalCapture` | `final_capture` |
| `PaymentsCapture` | `sellerReceivableBreakdown` | `seller_receivable_breakdown` |
| `PaymentsCapture` | `disbursementMode` | `disbursement_mode` |
| `PaymentsCapture` | `processorResponse` | `processor_response` |
| `PaymentsCapture` | `createTime` | `create_time` |
| `PaymentsCapture` | `updateTime` | `update_time` |
| `Phone` | `countryCode` | `country_code` |
| `Phone` | `nationalNumber` | `national_number` |
| `Phone` | `extensionNumber` | `extension_number` |
| `PhoneNumber` | `nationalNumber` | `national_number` |
| `PhoneNumberWithCountryCode` | `countryCode` | `country_code` |
| `PhoneNumberWithCountryCode` | `nationalNumber` | `national_number` |
| `PhoneNumberWithOptionalCountryCode` | `countryCode` | `country_code` |
| `PhoneNumberWithOptionalCountryCode` | `nationalNumber` | `national_number` |
| `PhoneWithType` | `phoneType` | `phone_type` |
| `PhoneWithType` | `phoneNumber` | `phone_number` |
| `Plan` | `billingCycles` | `billing_cycles` |
| `Plan` | `oneTimeCharges` | `one_time_charges` |
| `PlanCollection` | `totalItems` | `total_items` |
| `PlanCollection` | `totalPages` | `total_pages` |
| `PlanDetails` | `productId` | `product_id` |
| `PlanDetails` | `billingCycles` | `billing_cycles` |
| `PlanDetails` | `paymentPreferences` | `payment_preferences` |
| `PlanDetails` | `merchantPreferences` | `merchant_preferences` |
| `PlanDetails` | `quantitySupported` | `quantity_supported` |
| `PlanOverride` | `billingCycles` | `billing_cycles` |
| `PlanOverride` | `paymentPreferences` | `payment_preferences` |
| `PlanRequest` | `productId` | `product_id` |
| `PlanRequest` | `billingCycles` | `billing_cycles` |
| `PlanRequest` | `paymentPreferences` | `payment_preferences` |
| `PlanRequest` | `merchantPreferences` | `merchant_preferences` |
| `PlanRequest` | `quantitySupported` | `quantity_supported` |
| `PricingScheme` | `pricingModel` | `pricing_model` |
| `PricingScheme` | `reloadThresholdAmount` | `reload_threshold_amount` |
| `PricingTier` | `startingQuantity` | `starting_quantity` |
| `PricingTier` | `endingQuantity` | `ending_quantity` |
| `ProcessorResponse` | `avsCode` | `avs_code` |
| `ProcessorResponse` | `cvvCode` | `cvv_code` |
| `ProcessorResponse` | `responseCode` | `response_code` |
| `ProcessorResponse` | `paymentAdviceCode` | `payment_advice_code` |
| `PurchaseUnit` | `referenceId` | `reference_id` |
| `PurchaseUnit` | `paymentInstruction` | `payment_instruction` |
| `PurchaseUnit` | `customId` | `custom_id` |
| `PurchaseUnit` | `invoiceId` | `invoice_id` |
| `PurchaseUnit` | `softDescriptor` | `soft_descriptor` |
| `PurchaseUnit` | `supplementaryData` | `supplementary_data` |
| `PurchaseUnit` | `mostRecentErrors` | `most_recent_errors` |
| `PurchaseUnitRequest` | `referenceId` | `reference_id` |
| `PurchaseUnitRequest` | `paymentInstruction` | `payment_instruction` |
| `PurchaseUnitRequest` | `customId` | `custom_id` |
| `PurchaseUnitRequest` | `invoiceId` | `invoice_id` |
| `PurchaseUnitRequest` | `softDescriptor` | `soft_descriptor` |
| `PurchaseUnitRequest` | `supplementaryData` | `supplementary_data` |
| `Refund` | `statusDetails` | `status_details` |
| `Refund` | `invoiceId` | `invoice_id` |
| `Refund` | `customId` | `custom_id` |
| `Refund` | `acquirerReferenceNumber` | `acquirer_reference_number` |
| `Refund` | `noteToPayer` | `note_to_payer` |
| `Refund` | `sellerPayableBreakdown` | `seller_payable_breakdown` |
| `Refund` | `createTime` | `create_time` |
| `Refund` | `updateTime` | `update_time` |
| `RefundPaymentInstruction` | `platformFees` | `platform_fees` |
| `RefundRequest` | `customId` | `custom_id` |
| `RefundRequest` | `invoiceId` | `invoice_id` |
| `RefundRequest` | `noteToPayer` | `note_to_payer` |
| `RefundRequest` | `paymentInstruction` | `payment_instruction` |
| `RefundStatusWithDetails` | `statusDetails` | `status_details` |
| `RelatedIdentifiers` | `orderId` | `order_id` |
| `RelatedIdentifiers` | `authorizationId` | `authorization_id` |
| `RelatedIdentifiers` | `captureId` | `capture_id` |
| `SepaDebitExperienceContext` | `returnUrl` | `return_url` |
| `SepaDebitExperienceContext` | `cancelUrl` | `cancel_url` |
| `SepaDebitRequest` | `experienceContext` | `experience_context` |
| `SearchError` | `debugId` | `debug_id` |
| `SearchError` | `informationLink` | `information_link` |
| `SearchError` | `totalItems` | `total_items` |
| `SearchError` | `maximumItems` | `maximum_items` |
| `SearchErrorError` | `debugId` | `debug_id` |
| `SearchErrorError` | `informationLink` | `information_link` |
| `SearchErrorError` | `totalItems` | `total_items` |
| `SearchErrorError` | `maximumItems` | `maximum_items` |
| `SearchResponse` | `transactionDetails` | `transaction_details` |
| `SearchResponse` | `accountNumber` | `account_number` |
| `SearchResponse` | `startDate` | `start_date` |
| `SearchResponse` | `endDate` | `end_date` |
| `SearchResponse` | `lastRefreshedDatetime` | `last_refreshed_datetime` |
| `SearchResponse` | `totalItems` | `total_items` |
| `SearchResponse` | `totalPages` | `total_pages` |
| `SellerPayableBreakdown` | `grossAmount` | `gross_amount` |
| `SellerPayableBreakdown` | `paypalFee` | `paypal_fee` |
| `SellerPayableBreakdown` | `paypalFeeInReceivableCurrency` | `paypal_fee_in_receivable_currency` |
| `SellerPayableBreakdown` | `netAmount` | `net_amount` |
| `SellerPayableBreakdown` | `netAmountInReceivableCurrency` | `net_amount_in_receivable_currency` |
| `SellerPayableBreakdown` | `platformFees` | `platform_fees` |
| `SellerPayableBreakdown` | `netAmountBreakdown` | `net_amount_breakdown` |
| `SellerPayableBreakdown` | `totalRefundedAmount` | `total_refunded_amount` |
| `SellerProtection` | `disputeCategories` | `dispute_categories` |
| `SellerReceivableBreakdown` | `grossAmount` | `gross_amount` |
| `SellerReceivableBreakdown` | `paypalFee` | `paypal_fee` |
| `SellerReceivableBreakdown` | `paypalFeeInReceivableCurrency` | `paypal_fee_in_receivable_currency` |
| `SellerReceivableBreakdown` | `netAmount` | `net_amount` |
| `SellerReceivableBreakdown` | `receivableAmount` | `receivable_amount` |
| `SellerReceivableBreakdown` | `exchangeRate` | `exchange_rate` |
| `SellerReceivableBreakdown` | `platformFees` | `platform_fees` |
| `SetupTokenRequest` | `paymentSource` | `payment_source` |
| `SetupTokenRequestCard` | `securityCode` | `security_code` |
| `SetupTokenRequestCard` | `billingAddress` | `billing_address` |
| `SetupTokenRequestCard` | `verificationMethod` | `verification_method` |
| `SetupTokenRequestCard` | `experienceContext` | `experience_context` |
| `SetupTokenRequestPaymentSource` | `applePay` | `apple_pay` |
| `SetupTokenResponse` | `paymentSource` | `payment_source` |
| `SetupTokenResponseCard` | `lastDigits` | `last_digits` |
| `SetupTokenResponseCard` | `billingAddress` | `billing_address` |
| `SetupTokenResponseCard` | `verificationStatus` | `verification_status` |
| `SetupTokenResponseCard` | `networkTransactionReference` | `network_transaction_reference` |
| `SetupTokenResponseCard` | `authenticationResult` | `authentication_result` |
| `SetupTokenResponseCard` | `binDetails` | `bin_details` |
| `ShippingDetails` | `emailAddress` | `email_address` |
| `ShippingDetails` | `phoneNumber` | `phone_number` |
| `ShippingInformation` | `secondaryShippingAddress` | `secondary_shipping_address` |
| `ShippingName` | `fullName` | `full_name` |
| `ShippingWithTrackingDetails` | `emailAddress` | `email_address` |
| `ShippingWithTrackingDetails` | `phoneNumber` | `phone_number` |
| `SimplePostalAddressCoarseGrained` | `countryCode` | `country_code` |
| `SimplePostalAddressCoarseGrained` | `postalCode` | `postal_code` |
| `SofortPaymentObject` | `countryCode` | `country_code` |
| `SofortPaymentObject` | `ibanLastChars` | `iban_last_chars` |
| `SofortPaymentRequest` | `countryCode` | `country_code` |
| `SofortPaymentRequest` | `experienceContext` | `experience_context` |
| `StoreInformation` | `storeId` | `store_id` |
| `StoreInformation` | `terminalId` | `terminal_id` |
| `StoredPaymentSource` | `paymentInitiator` | `payment_initiator` |
| `StoredPaymentSource` | `paymentType` | `payment_type` |
| `StoredPaymentSource` | `previousNetworkTransactionReference` | `previous_network_transaction_reference` |
| `Subscriber` | `emailAddress` | `email_address` |
| `Subscriber` | `payerId` | `payer_id` |
| `Subscriber` | `shippingAddress` | `shipping_address` |
| `Subscriber` | `paymentSource` | `payment_source` |
| `SubscriberRequest` | `emailAddress` | `email_address` |
| `SubscriberRequest` | `payerId` | `payer_id` |
| `SubscriberRequest` | `shippingAddress` | `shipping_address` |
| `SubscriberRequest` | `paymentSource` | `payment_source` |
| `Subscription` | `planId` | `plan_id` |
| `Subscription` | `startTime` | `start_time` |
| `Subscription` | `shippingAmount` | `shipping_amount` |
| `Subscription` | `billingInfo` | `billing_info` |
| `Subscription` | `createTime` | `create_time` |
| `Subscription` | `updateTime` | `update_time` |
| `Subscription` | `customId` | `custom_id` |
| `Subscription` | `planOverridden` | `plan_overridden` |
| `SubscriptionAmountWithBreakdown` | `grossAmount` | `gross_amount` |
| `SubscriptionAmountWithBreakdown` | `totalItemAmount` | `total_item_amount` |
| `SubscriptionAmountWithBreakdown` | `feeAmount` | `fee_amount` |
| `SubscriptionAmountWithBreakdown` | `shippingAmount` | `shipping_amount` |
| `SubscriptionAmountWithBreakdown` | `taxAmount` | `tax_amount` |
| `SubscriptionAmountWithBreakdown` | `netAmount` | `net_amount` |
| `SubscriptionApplicationContext` | `brandName` | `brand_name` |
| `SubscriptionApplicationContext` | `shippingPreference` | `shipping_preference` |
| `SubscriptionApplicationContext` | `userAction` | `user_action` |
| `SubscriptionApplicationContext` | `paymentMethod` | `payment_method` |
| `SubscriptionApplicationContext` | `returnUrl` | `return_url` |
| `SubscriptionApplicationContext` | `cancelUrl` | `cancel_url` |
| `SubscriptionBillingCycle` | `pricingScheme` | `pricing_scheme` |
| `SubscriptionBillingCycle` | `tenureType` | `tenure_type` |
| `SubscriptionBillingCycle` | `totalCycles` | `total_cycles` |
| `SubscriptionBillingInformation` | `outstandingBalance` | `outstanding_balance` |
| `SubscriptionBillingInformation` | `cycleExecutions` | `cycle_executions` |
| `SubscriptionBillingInformation` | `lastPayment` | `last_payment` |
| `SubscriptionBillingInformation` | `nextBillingTime` | `next_billing_time` |
| `SubscriptionBillingInformation` | `finalPaymentTime` | `final_payment_time` |
| `SubscriptionBillingInformation` | `failedPaymentsCount` | `failed_payments_count` |
| `SubscriptionBillingInformation` | `lastFailedPayment` | `last_failed_payment` |
| `SubscriptionCardRequest` | `securityCode` | `security_code` |
| `SubscriptionCardRequest` | `billingAddress` | `billing_address` |
| `SubscriptionCustomerInformation` | `emailAddress` | `email_address` |
| `SubscriptionError` | `debugId` | `debug_id` |
| `SubscriptionError` | `informationLink` | `information_link` |
| `SubscriptionErrorError` | `debugId` | `debug_id` |
| `SubscriptionErrorError` | `informationLink` | `information_link` |
| `SubscriptionPatchApplicationContext` | `brandName` | `brand_name` |
| `SubscriptionPatchApplicationContext` | `shippingPreference` | `shipping_preference` |
| `SubscriptionPatchApplicationContext` | `paymentMethod` | `payment_method` |
| `SubscriptionPatchApplicationContext` | `returnUrl` | `return_url` |
| `SubscriptionPatchApplicationContext` | `cancelUrl` | `cancel_url` |
| `SubscriptionPayer` | `emailAddress` | `email_address` |
| `SubscriptionPayer` | `payerId` | `payer_id` |
| `SubscriptionPayerName` | `givenName` | `given_name` |
| `SubscriptionPayerName` | `middleName` | `middle_name` |
| `SubscriptionPayerName` | `fullName` | `full_name` |
| `SubscriptionPricingScheme` | `fixedPrice` | `fixed_price` |
| `SubscriptionPricingScheme` | `pricingModel` | `pricing_model` |
| `SubscriptionPricingScheme` | `createTime` | `create_time` |
| `SubscriptionPricingScheme` | `updateTime` | `update_time` |
| `SubscriptionTransactionDetails` | `amountWithBreakdown` | `amount_with_breakdown` |
| `SubscriptionTransactionDetails` | `payerName` | `payer_name` |
| `SubscriptionTransactionDetails` | `payerEmail` | `payer_email` |
| `TaxAmount` | `taxAmount` | `tax_amount` |
| `TaxInfo` | `taxId` | `tax_id` |
| `TaxInfo` | `taxIdType` | `tax_id_type` |
| `ThreeDSecureAuthenticationResponse` | `authenticationStatus` | `authentication_status` |
| `ThreeDSecureAuthenticationResponse` | `enrollmentStatus` | `enrollment_status` |
| `ThreeDSecureCardAuthenticationResponse` | `authenticationStatus` | `authentication_status` |
| `ThreeDSecureCardAuthenticationResponse` | `enrollmentStatus` | `enrollment_status` |
| `ThreeDSecureCardAuthenticationResponse` | `authenticationId` | `authentication_id` |
| `TransactionDetails` | `transactionInfo` | `transaction_info` |
| `TransactionDetails` | `payerInfo` | `payer_info` |
| `TransactionDetails` | `shippingInfo` | `shipping_info` |
| `TransactionDetails` | `cartInfo` | `cart_info` |
| `TransactionDetails` | `storeInfo` | `store_info` |
| `TransactionDetails` | `auctionInfo` | `auction_info` |
| `TransactionDetails` | `incentiveInfo` | `incentive_info` |
| `TransactionInformation` | `paypalAccountId` | `paypal_account_id` |
| `TransactionInformation` | `transactionId` | `transaction_id` |
| `TransactionInformation` | `paypalReferenceId` | `paypal_reference_id` |
| `TransactionInformation` | `paypalReferenceIdType` | `paypal_reference_id_type` |
| `TransactionInformation` | `transactionEventCode` | `transaction_event_code` |
| `TransactionInformation` | `transactionInitiationDate` | `transaction_initiation_date` |
| `TransactionInformation` | `transactionUpdatedDate` | `transaction_updated_date` |
| `TransactionInformation` | `transactionAmount` | `transaction_amount` |
| `TransactionInformation` | `feeAmount` | `fee_amount` |
| `TransactionInformation` | `discountAmount` | `discount_amount` |
| `TransactionInformation` | `insuranceAmount` | `insurance_amount` |
| `TransactionInformation` | `salesTaxAmount` | `sales_tax_amount` |
| `TransactionInformation` | `shippingAmount` | `shipping_amount` |
| `TransactionInformation` | `shippingDiscountAmount` | `shipping_discount_amount` |
| `TransactionInformation` | `shippingTaxAmount` | `shipping_tax_amount` |
| `TransactionInformation` | `otherAmount` | `other_amount` |
| `TransactionInformation` | `tipAmount` | `tip_amount` |
| `TransactionInformation` | `transactionStatus` | `transaction_status` |
| `TransactionInformation` | `transactionSubject` | `transaction_subject` |
| `TransactionInformation` | `transactionNote` | `transaction_note` |
| `TransactionInformation` | `paymentTrackingId` | `payment_tracking_id` |
| `TransactionInformation` | `bankReferenceId` | `bank_reference_id` |
| `TransactionInformation` | `endingBalance` | `ending_balance` |
| `TransactionInformation` | `availableBalance` | `available_balance` |
| `TransactionInformation` | `invoiceId` | `invoice_id` |
| `TransactionInformation` | `customField` | `custom_field` |
| `TransactionInformation` | `protectionEligibility` | `protection_eligibility` |
| `TransactionInformation` | `creditTerm` | `credit_term` |
| `TransactionInformation` | `creditTransactionalFee` | `credit_transactional_fee` |
| `TransactionInformation` | `creditPromotionalFee` | `credit_promotional_fee` |
| `TransactionInformation` | `annualPercentageRate` | `annual_percentage_rate` |
| `TransactionInformation` | `paymentMethodType` | `payment_method_type` |
| `TransactionInformation` | `instrumentType` | `instrument_type` |
| `TransactionInformation` | `instrumentSubType` | `instrument_sub_type` |
| `TransactionsList` | `totalItems` | `total_items` |
| `TransactionsList` | `totalPages` | `total_pages` |
| `TrustlyPaymentObject` | `countryCode` | `country_code` |
| `TrustlyPaymentObject` | `ibanLastChars` | `iban_last_chars` |
| `TrustlyPaymentRequest` | `countryCode` | `country_code` |
| `TrustlyPaymentRequest` | `experienceContext` | `experience_context` |
| `UpdatePricingScheme` | `billingCycleSequence` | `billing_cycle_sequence` |
| `UpdatePricingScheme` | `pricingScheme` | `pricing_scheme` |
| `UpdatePricingSchemesRequest` | `pricingSchemes` | `pricing_schemes` |
| `VaultCardExperienceContext` | `brandName` | `brand_name` |
| `VaultCardExperienceContext` | `returnUrl` | `return_url` |
| `VaultCardExperienceContext` | `cancelUrl` | `cancel_url` |
| `VaultCardExperienceContext` | `vaultInstruction` | `vault_instruction` |
| `VaultCardExperienceContext` | `userAction` | `user_action` |
| `VaultExperienceContext` | `brandName` | `brand_name` |
| `VaultExperienceContext` | `returnUrl` | `return_url` |
| `VaultExperienceContext` | `cancelUrl` | `cancel_url` |
| `VaultExperienceContext` | `shippingPreference` | `shipping_preference` |
| `VaultExperienceContext` | `vaultInstruction` | `vault_instruction` |
| `VaultExperienceContext` | `appSwitchContext` | `app_switch_context` |
| `VaultExperienceContext` | `userAction` | `user_action` |
| `VaultInstruction` | `storeInVault` | `store_in_vault` |
| `VaultInstructionBase` | `storeInVault` | `store_in_vault` |
| `VaultPayPalWalletRequest` | `usagePattern` | `usage_pattern` |
| `VaultPayPalWalletRequest` | `permitMultiplePaymentTokens` | `permit_multiple_payment_tokens` |
| `VaultPayPalWalletRequest` | `usageType` | `usage_type` |
| `VaultPayPalWalletRequest` | `customerType` | `customer_type` |
| `VaultPayPalWalletRequest` | `billingPlan` | `billing_plan` |
| `VaultPayPalWalletRequest` | `experienceContext` | `experience_context` |
| `VaultResponseCustomer` | `merchantCustomerId` | `merchant_customer_id` |
| `VaultVenmoRequest` | `usagePattern` | `usage_pattern` |
| `VaultVenmoRequest` | `permitMultiplePaymentTokens` | `permit_multiple_payment_tokens` |
| `VaultVenmoRequest` | `usageType` | `usage_type` |
| `VaultVenmoRequest` | `customerType` | `customer_type` |
| `VaultVenmoRequest` | `experienceContext` | `experience_context` |
| `VaultedDigitalWallet` | `usagePattern` | `usage_pattern` |
| `VaultedDigitalWallet` | `permitMultiplePaymentTokens` | `permit_multiple_payment_tokens` |
| `VaultedDigitalWallet` | `usageType` | `usage_type` |
| `VaultedDigitalWallet` | `customerType` | `customer_type` |
| `VaultedDigitalWalletShippingDetails` | `emailAddress` | `email_address` |
| `VaultedDigitalWalletShippingDetails` | `phoneNumber` | `phone_number` |
| `VenmoExperienceContext` | `brandName` | `brand_name` |
| `VenmoExperienceContext` | `shippingPreference` | `shipping_preference` |
| `VenmoExperienceContext` | `vaultInstruction` | `vault_instruction` |
| `VenmoExperienceContext` | `userAction` | `user_action` |
| `VenmoPaymentToken` | `usagePattern` | `usage_pattern` |
| `VenmoPaymentToken` | `permitMultiplePaymentTokens` | `permit_multiple_payment_tokens` |
| `VenmoPaymentToken` | `usageType` | `usage_type` |
| `VenmoPaymentToken` | `customerType` | `customer_type` |
| `VenmoPaymentToken` | `emailAddress` | `email_address` |
| `VenmoPaymentToken` | `payerId` | `payer_id` |
| `VenmoPaymentToken` | `userName` | `user_name` |
| `VenmoWalletCustomerInformation` | `emailAddress` | `email_address` |
| `VenmoWalletExperienceContext` | `brandName` | `brand_name` |
| `VenmoWalletExperienceContext` | `shippingPreference` | `shipping_preference` |
| `VenmoWalletExperienceContext` | `orderUpdateCallbackConfig` | `order_update_callback_config` |
| `VenmoWalletExperienceContext` | `userAction` | `user_action` |
| `VenmoWalletRequest` | `vaultId` | `vault_id` |
| `VenmoWalletRequest` | `emailAddress` | `email_address` |
| `VenmoWalletRequest` | `experienceContext` | `experience_context` |
| `VenmoWalletResponse` | `emailAddress` | `email_address` |
| `VenmoWalletResponse` | `accountId` | `account_id` |
| `VenmoWalletResponse` | `userName` | `user_name` |
| `VenmoWalletResponse` | `phoneNumber` | `phone_number` |
| `VenmoWalletResponse` | `returnFlow` | `return_flow` |
| `VenmoWalletVaultAttributes` | `storeInVault` | `store_in_vault` |
| `VenmoWalletVaultAttributes` | `usagePattern` | `usage_pattern` |
| `VenmoWalletVaultAttributes` | `usageType` | `usage_type` |
| `VenmoWalletVaultAttributes` | `customerType` | `customer_type` |
| `VenmoWalletVaultAttributes` | `permitMultiplePaymentTokens` | `permit_multiple_payment_tokens` |
| `IDealPaymentObject` | `countryCode` | `country_code` |
| `IDealPaymentObject` | `ibanLastChars` | `iban_last_chars` |
| `IDealPaymentRequest` | `countryCode` | `country_code` |
| `IDealPaymentRequest` | `experienceContext` | `experience_context` |

---

## Servers & auth

**Authentication is per operation.** Every operation declares the requirement it enforces and the SDK sends exactly that: **40 of the 40 operations** require a credential and **0** are public. Each block on a page above carries an **Auth** bullet naming its requirement, `none` included. There is no client-global switch and no per-call override.

| Scheme (as an **Auth** bullet names it) | Configured with | What the SDK sends |
| --- | --- | --- |
| `oauth2` | `oauth2: { clientId, clientSecret, scope? }` | `Authorization: Bearer <access token>` |

A scheme **contributes** headers, query parameters and cookies rather than mutating the request, so a credential is encoded by exactly the code that encodes an operation's own parameters. The auth layer goes on **last**, which means a scheme's `Authorization` wins over one the operation declared.

**Composition is emitted, not configured.** Where the spec puts two schemes in one requirement the SDK sends **both**; where it lists alternatives the SDK sends the **first configured** one, in the order the **Auth** bullet prints them. The combinators that express this (`allAuth`, `anyAuth`, `noneAuth`) live in the generated resource modules and are **not exported**.

**A credential may be a function.** Every field typed `TokenProvider` is re-read on **every** request with no caching, so a key can rotate without rebuilding the client. An empty string counts as absent, and a function is treated as present without being invoked.

**An unconfigured scheme does not throw.** The request goes out without that credential and the server decides. So a 401 on a call you believed was authenticated is usually an unset credential field rather than an SDK failure — check the operation's **Auth** bullet against what the client was given.

**OAuth2 fetches and caches its own token.** The token request goes through the same client as every other call — same timeout, same `fetch` — sends a form-urlencoded body, and **decodes** the response against a schema rather than casting it. An access token is cached until shortly before it expires; a response carrying no `expires_in` is treated as never expiring (RFC 6749 §5.1); concurrent callers share one in-flight fetch. A refused token endpoint rejects with `AuthError` wrapping the underlying `ResponseError` as `cause`, so it never looks like the business call failing.

| Flow | Token endpoint | Client credentials travel |
| --- | --- | --- |
| `oauth2` | `default` + `/v1/oauth2/token` | as `Authorization: Basic` |

**Replacing a grant.** Each OAuth2 scheme's token request is a strategy you can substitute — `oauth2Strategy` on `ClientOptions`. A strategy is one method, `getToken(credentials, signal)`, plus `tryRefreshToken(...)` for the refreshable one. Supply it and the built-in token request is not used, while the caching, the expiry buffer and the single-flight behaviour above still apply.

**The auth types you can name.** Every row below is exported from the package root. `Source` is where to read the declaration, never what to import — the credential shapes themselves are already spelled in the scheme table above.

| Type | Source |
| --- | --- |
| `OAuthToken` | `src/core/auth/oauth2-strategies.ts` |
| `OAuth2CredentialPlacement` | `src/core/auth/oauth2-strategies.ts` |

**A 401 invalidates, it does not retry.** On a **401** — 401 only, not 403 — the SDK clears whatever that operation's scheme had cached, so the *next* call re-acquires. The current request still rejects with the operation's `ResponseError`. There is no retry loop on this SDK, and the credential fields are on `ClientOptions`.

**Environments.** `ClientOptions.serverEnvironment` selects one for the whole client (source: `src/servers.ts`). `ServerEnvironment` is a `const` object with a derived union type, not a TypeScript `enum` — and unlike the model enums it is **closed**, so only the values below are assignable.

| `ServerEnvironment` member | Value |
| --- | --- |
| `ServerEnvironment.Sandbox` *(default)* | `sandbox` |

**Server groups.** 1 logical server; each operation is bound to one at generation time, and a block carries a **Server** bullet only when its group is not `default`.

| Group | Options type |
| --- | --- |
| `default` | `DefaultServerOptions` |

**Base URLs and overrides.** One row per group-and-environment pair, so the table stays four columns wide however many environments a spec declares. Every cell is overridden at `serverOptions.<group>.<environment>.<name>`, where `<name>` is `baseUrl` for the whole template or the variable name for one substitution. An override merges with the built-in defaults **per pair, key by key**.

| Group | Environment | Base URL template | Template variables (default) |
| --- | --- | --- | --- |
| `default` | `sandbox` | `https://api-m.sandbox.paypal.com` | — |

A `baseUrl` override replaces the template verbatim; variable values are percent-encoded into it, and templates are expanded per request rather than once at construction. An environment value the SDK does not know throws `SdkError` when a server is resolved — at the first call, not at construction. It is the one failure on this surface that throws **synchronously** out of the operation method, so a `try`/`await` catches it but `.asApiResult()` and `.catch()` never see it.

---

## Runtime & packaging

The facts that change what you type, and the floors that decide whether the package loads at all. This section is the home for all of them.

|  |  |
| --- | --- |
| One entry, two dialects | `import` resolves `dist/esm`, `require` resolves `dist/commonjs`, both through the single `.` export. In a TypeScript CommonJS file the typed spelling is `import sdk = require("paypal")`; a plain `require` destructure works at run time but yields no types. `instanceof` is reliable **within** one dialect — if your app loads both, the two copies declare separate error classes |
| Consumer compiler settings | Under `exactOptionalPropertyTypes`, **omit or spread** an absent optional rather than assigning `undefined` to it. Under `verbatimModuleSyntax`, names that carry no runtime value (the options types, every model type) must be imported with `import type` |
| Required globals, and only these | Always: `fetch` (or a replacement passed as the `fetch` option), `AbortController`, `Headers`, `URL`, `setTimeout` and `clearTimeout`, `JSON`, `BigInt`. Auth adds more, each reached only once the credential needing it is configured. `TextEncoder` and `btoa` build every `Authorization: Basic` value, sent on every OAuth2 token request, whose client credentials travel as Basic by default. |
| Values that cross the boundary | `Date` for `date-time`, `string` for `date`, `ArrayBuffer` for an undeclared error body, `Headers` on a result and on a thrown `ResponseError`. The engine also carries a `bigint` int64 path and a base64 `bytes()` codec, reached only where a model uses them |
| Browser distribution | The package ships `dist/esm` and `dist/commonjs` and nothing else — **no bundle, no UMD file, no CDN artifact**. Use it through a bundler, which resolves `zod/v4-mini`, deduplicates it against your own copy and tree-shakes the rest |
| Other runtimes | Deno, Bun, Cloudflare Workers and Vercel Edge are all likely to work — the SDK needs only the globals above and imports no Node built-in — but **none of them is tested for this package**, so nothing here claims support for them |

The browser floor comes from the emitted output rather than the sources: `tshy` builds at `target: ES2022`, so native `#private` fields and methods survive into `dist/`.

| Browser | Minimum | Set by |
| --- | --- | --- |
| Chrome / Edge | **85** | `String.prototype.replaceAll`, logical assignment (`??=`) |
| Firefox | **90** | private class fields and methods |
| Safari / iOS Safari | **15** | private class **methods** |

That table is the **module-load** floor: below it the SDK fails while the module is evaluating, not at the first call. Two things degrade quietly above it. `{ cause }` on the `Error` constructor needs Chrome 93, Firefox 91 or Safari 15, so below that `err.cause` is `undefined`. More consequentially, **cancellation needs `AbortController.abort(reason)` and `AbortSignal.reason`**, which arrived in Chrome 98, Firefox 97 and Safari 15.4 — between the module-load floor and those versions the engine still aborts the request but produces no typed error at all.

