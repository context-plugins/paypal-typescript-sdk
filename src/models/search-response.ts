import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { transactionDetailsSchema, type TransactionDetails } from "./transaction-details.js";

export type SearchResponse = {
  transactionDetails?: TransactionDetails[];
  accountNumber?: string;
  startDate?: string;
  endDate?: string;
  lastRefreshedDatetime?: string;
  page?: number;
  totalItems?: number;
  totalPages?: number;
  links?: LinkDescription[];
};

export const searchResponseSchema: Schema<SearchResponse> = s.object<SearchResponse>({
  transactionDetails: s.optional(s.array(s.lazy(() => transactionDetailsSchema))),
  accountNumber: s.optional(s.string()),
  startDate: s.optional(s.string()),
  endDate: s.optional(s.string()),
  lastRefreshedDatetime: s.optional(s.string()),
  page: s.optional(s.number()),
  totalItems: s.optional(s.number()),
  totalPages: s.optional(s.number()),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  _keysMap: {
    transactionDetails: "transaction_details",
    accountNumber: "account_number",
    startDate: "start_date",
    endDate: "end_date",
    lastRefreshedDatetime: "last_refreshed_datetime",
    totalItems: "total_items",
    totalPages: "total_pages",
  },
});
