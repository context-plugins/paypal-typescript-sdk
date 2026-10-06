<!-- Generated file — do not edit; regenerated with the SDK. -->

# TransactionSearch — operations

Accessor: `client.transactionSearch` · Source: `src/resources/transaction-search.ts` · 2 operations · Request and error types: namespace `TransactionSearch`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `paypal`; the `Source` path is where to **read** the shape, never what to import. `ApiError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### searchBalances

- **Signature**: `searchBalances(request: TransactionSearch.SearchBalancesRequest, options?: RequestOptions): ApiPromise<BalancesResponse, TransactionSearch.SearchBalancesError>`
- **Wire**: `GET /v1/reporting/balances`
- **Auth**: `oauth2`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `BalancesResponse`
- **Error**: `PaypalError` with `kind: "api"`, an instance of `TransactionSearch.SearchBalancesError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"defaultError"` [400] `DefaultError` · `"defaultError2"` [403] `DefaultError` · `"defaultError3"` [500] `DefaultError` · `"defaultError4"` [default — any status no arm above covers] `DefaultError` · `"undeclared"` [a `default`-matched body that did not fit `DefaultError`] `rawBody: ArrayBuffer`

**Fields** — `TransactionSearch.SearchBalancesRequest` (2):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `asOfTime` | `query` | `as_of_time` | `string` | no |
| `currencyCode` | `query` | `currency_code` | `string` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `BalancesResponse` | `balancesResponseSchema` | `src/models/balances-response.ts` |
| `DefaultError` | `defaultErrorSchema` | `src/models/default-error.ts` |

### searchTransactions

- **Signature**: `searchTransactions(request: TransactionSearch.SearchTransactionsRequest, options?: RequestOptions): ApiPromise<SearchResponse, TransactionSearch.SearchTransactionsError>`
- **Wire**: `GET /v1/reporting/transactions`
- **Auth**: `oauth2`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `SearchResponse`
- **Error**: `PaypalError` with `kind: "api"`, an instance of `TransactionSearch.SearchTransactionsError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"searchError"` [default — any status no arm above covers] `SearchError` · `"undeclared"` [a `default`-matched body that did not fit `SearchError`] `rawBody: ArrayBuffer`

**Fields** — `TransactionSearch.SearchTransactionsRequest` (14):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `startDate` | `query` | `start_date` | `string` | yes | — |
| `endDate` | `query` | `end_date` | `string` | yes | — |
| `transactionId` | `query` | `transaction_id` | `string` | no | — |
| `transactionType` | `query` | `transaction_type` | `string` | no | — |
| `transactionStatus` | `query` | `transaction_status` | `string` | no | — |
| `transactionAmount` | `query` | `transaction_amount` | `string` | no | — |
| `transactionCurrency` | `query` | `transaction_currency` | `string` | no | — |
| `paymentInstrumentType` | `query` | `payment_instrument_type` | `string` | no | — |
| `storeId` | `query` | `store_id` | `string` | no | — |
| `terminalId` | `query` | `terminal_id` | `string` | no | — |
| `fields` | `query` | — | `string` | no | `"transaction_info"` |
| `balanceAffectingRecordsOnly` | `query` | `balance_affecting_records_only` | `string` | no | `"Y"` |
| `pageSize` | `query` | `page_size` | `number` | no | `100` |
| `page` | `query` | — | `number` | no | `1` |

| Type | Schema value | Source |
| --- | --- | --- |
| `SearchResponse` | `searchResponseSchema` | `src/models/search-response.ts` |
| `SearchError` | `searchErrorSchema` | `src/models/search-error.ts` |

