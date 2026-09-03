<!-- Generated file — do not edit; regenerated with the SDK. -->

# Vault — operations

Accessor: `client.vault` · Source: `src/resources/vault.ts` · 6 operations · Request and error types: namespace `Vault`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `pay-pal-server-sdk`; the `Source` path is where to **read** the shape, never what to import. `ResponseError` and the runtime error family are excluded — see sdk-map.md.

### createPaymentToken

- **Signature**: `createPaymentToken(request: Vault.CreatePaymentTokenRequest, options?: RequestOptions): ApiPromise<PaymentTokenResponse, Vault.CreatePaymentTokenError>`
- **Wire**: `POST /v3/vault/payment-tokens`
- **Auth**: `oauth2`
- **Request body**: `application/json` — the `body` field
- **Returns**: `PaymentTokenResponse`
- **Error**: `Vault.CreatePaymentTokenError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [400] `Error` · `"error2"` [403] `Error` · `"error3"` [404] `Error` · `"error4"` [422] `Error` · `"error5"` [500] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Vault.CreatePaymentTokenRequest` (2):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `payPalRequestId` | `header` | `PayPal-Request-Id` | `string` | no |
| `body` | `body` | — | `PaymentTokenRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `PaymentTokenRequest` | `paymentTokenRequestSchema` | `src/models/payment-token-request.ts` |
| `PaymentTokenResponse` | `paymentTokenResponseSchema` | `src/models/payment-token-response.ts` |
| `Error` | `errorSchema` | `src/models/error.ts` |

### createSetupToken

- **Signature**: `createSetupToken(request: Vault.CreateSetupTokenRequest, options?: RequestOptions): ApiPromise<SetupTokenResponse, Vault.CreateSetupTokenError>`
- **Wire**: `POST /v3/vault/setup-tokens`
- **Auth**: `oauth2`
- **Request body**: `application/json` — the `body` field
- **Returns**: `SetupTokenResponse`
- **Error**: `Vault.CreateSetupTokenError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [400] `Error` · `"error2"` [403] `Error` · `"error3"` [422] `Error` · `"error4"` [500] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Vault.CreateSetupTokenRequest` (2):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `payPalRequestId` | `header` | `PayPal-Request-Id` | `string` | no |
| `body` | `body` | — | `SetupTokenRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `SetupTokenRequest` | `setupTokenRequestSchema` | `src/models/setup-token-request.ts` |
| `SetupTokenResponse` | `setupTokenResponseSchema` | `src/models/setup-token-response.ts` |
| `Error` | `errorSchema` | `src/models/error.ts` |

### deletePaymentToken

- **Signature**: `deletePaymentToken(request: Vault.DeletePaymentTokenRequest, options?: RequestOptions): ApiPromise<undefined, Vault.DeletePaymentTokenError>`
- **Wire**: `DELETE /v3/vault/payment-tokens/{id}`
- **Auth**: `oauth2`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `undefined` — the operation resolves to nothing
- **Error**: `Vault.DeletePaymentTokenError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [400] `Error` · `"error2"` [403] `Error` · `"error3"` [500] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Vault.DeletePaymentTokenRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `Error` | `errorSchema` | `src/models/error.ts` |

### getPaymentToken

- **Signature**: `getPaymentToken(request: Vault.GetPaymentTokenRequest, options?: RequestOptions): ApiPromise<PaymentTokenResponse, Vault.GetPaymentTokenError>`
- **Wire**: `GET /v3/vault/payment-tokens/{id}`
- **Auth**: `oauth2`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `PaymentTokenResponse`
- **Error**: `Vault.GetPaymentTokenError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [403] `Error` · `"error2"` [404] `Error` · `"error3"` [422] `Error` · `"error4"` [500] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Vault.GetPaymentTokenRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `PaymentTokenResponse` | `paymentTokenResponseSchema` | `src/models/payment-token-response.ts` |
| `Error` | `errorSchema` | `src/models/error.ts` |

### getSetupToken

- **Signature**: `getSetupToken(request: Vault.GetSetupTokenRequest, options?: RequestOptions): ApiPromise<SetupTokenResponse, Vault.GetSetupTokenError>`
- **Wire**: `GET /v3/vault/setup-tokens/{id}`
- **Auth**: `oauth2`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `SetupTokenResponse`
- **Error**: `Vault.GetSetupTokenError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [403] `Error` · `"error2"` [404] `Error` · `"error3"` [422] `Error` · `"error4"` [500] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Vault.GetSetupTokenRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `SetupTokenResponse` | `setupTokenResponseSchema` | `src/models/setup-token-response.ts` |
| `Error` | `errorSchema` | `src/models/error.ts` |

### listCustomerPaymentTokens

- **Signature**: `listCustomerPaymentTokens(request: Vault.ListCustomerPaymentTokensRequest, options?: RequestOptions): ApiPromise<CustomerVaultPaymentTokensResponse, Vault.ListCustomerPaymentTokensError>`
- **Wire**: `GET /v3/vault/payment-tokens`
- **Auth**: `oauth2`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `CustomerVaultPaymentTokensResponse`
- **Error**: `Vault.ListCustomerPaymentTokensError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [400] `Error` · `"error2"` [403] `Error` · `"error3"` [500] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Vault.ListCustomerPaymentTokensRequest` (4):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `customerId` | `query` | `customer_id` | `string` | yes | — |
| `pageSize` | `query` | `page_size` | `number` | no | `5` |
| `page` | `query` | — | `number` | no | `1` |
| `totalRequired` | `query` | `total_required` | `boolean` | no | `false` |

| Type | Schema value | Source |
| --- | --- | --- |
| `CustomerVaultPaymentTokensResponse` | `customerVaultPaymentTokensResponseSchema` | `src/models/customer-vault-payment-tokens-response.ts` |
| `Error` | `errorSchema` | `src/models/error.ts` |

