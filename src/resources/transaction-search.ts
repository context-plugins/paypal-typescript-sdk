import type { AuthSchemes } from "../auth-schemes.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import { ResponseError, type Declared, type ErrorDecoders } from "../core/response-error.js";
import * as s from "../core/validation/index.js";
import { balancesResponseSchema, type BalancesResponse } from "../models/balances-response.js";
import { defaultErrorSchema, type DefaultError } from "../models/default-error.js";
import { searchErrorSchema, type SearchError } from "../models/search-error.js";
import { searchResponseSchema, type SearchResponse } from "../models/search-response.js";
import type { Servers } from "../servers.js";

export class TransactionSearch {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  searchBalances(
    request: TransactionSearch.SearchBalancesRequest,
    options?: RequestOptions,
  ): ApiPromise<BalancesResponse, TransactionSearch.SearchBalancesError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/v1/reporting/balances"),
        auth: this.#auth.oauth2,
        query: [
          { name: "as_of_time", value: request.asOfTime, schema: s.optional(s.string()) },
          { name: "currency_code", value: request.currencyCode, schema: s.optional(s.string()) },
        ],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: balancesResponseSchema },
        errorFactory: TransactionSearch.SearchBalancesError,
      },
      options,
    );
  }

  searchTransactions(
    request: TransactionSearch.SearchTransactionsRequest,
    options?: RequestOptions,
  ): ApiPromise<SearchResponse, TransactionSearch.SearchTransactionsError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/v1/reporting/transactions"),
        auth: this.#auth.oauth2,
        query: [
          { name: "start_date", value: request.startDate, schema: s.string() },
          { name: "end_date", value: request.endDate, schema: s.string() },
          { name: "transaction_id", value: request.transactionId, schema: s.optional(s.string()) },
          { name: "transaction_type", value: request.transactionType, schema: s.optional(s.string()) },
          { name: "transaction_status", value: request.transactionStatus, schema: s.optional(s.string()) },
          { name: "transaction_amount", value: request.transactionAmount, schema: s.optional(s.string()) },
          {
            name: "transaction_currency",
            value: request.transactionCurrency,
            schema: s.optional(s.string()),
          },
          {
            name: "payment_instrument_type",
            value: request.paymentInstrumentType,
            schema: s.optional(s.string()),
          },
          { name: "store_id", value: request.storeId, schema: s.optional(s.string()) },
          { name: "terminal_id", value: request.terminalId, schema: s.optional(s.string()) },
          { name: "fields", value: request.fields, schema: s.defaulted(s.string(), "transaction_info") },
          {
            name: "balance_affecting_records_only",
            value: request.balanceAffectingRecordsOnly,
            schema: s.defaulted(s.string(), "Y"),
          },
          { name: "page_size", value: request.pageSize, schema: s.defaulted(s.number(), 100) },
          { name: "page", value: request.page, schema: s.defaulted(s.number(), 1) },
        ],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: searchResponseSchema },
        errorFactory: TransactionSearch.SearchTransactionsError,
      },
      options,
    );
  }
}

export namespace TransactionSearch {
  export type SearchBalancesRequest = {
    asOfTime?: string;
    currencyCode?: string;
  };

  export class SearchBalancesError extends ResponseError<
    | Declared<"defaultError", DefaultError>
    | Declared<"defaultError2", DefaultError>
    | Declared<"defaultError3", DefaultError>
    | Declared<"defaultError4", DefaultError>
  > {
    static readonly errors: ErrorDecoders<SearchBalancesError> = [
      { on: 400, kind: "defaultError", decode: { kind: "json", schema: defaultErrorSchema } },
      { on: 403, kind: "defaultError2", decode: { kind: "json", schema: defaultErrorSchema } },
      { on: 500, kind: "defaultError3", decode: { kind: "json", schema: defaultErrorSchema } },
      { on: [400, 599], kind: "defaultError4", decode: { kind: "json", schema: defaultErrorSchema } },
    ];
  }

  export type SearchTransactionsRequest = {
    startDate: string;
    endDate: string;
    transactionId?: string;
    transactionType?: string;
    transactionStatus?: string;
    transactionAmount?: string;
    transactionCurrency?: string;
    paymentInstrumentType?: string;
    storeId?: string;
    terminalId?: string;
    fields?: string;
    balanceAffectingRecordsOnly?: string;
    pageSize?: number;
    page?: number;
  };

  export class SearchTransactionsError extends ResponseError<Declared<"searchError", SearchError>> {
    static readonly errors: ErrorDecoders<SearchTransactionsError> = [
      { on: [400, 599], kind: "searchError", decode: { kind: "json", schema: searchErrorSchema } },
    ];
  }
}
