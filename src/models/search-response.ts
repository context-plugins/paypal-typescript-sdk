import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { transactionDetailsSchema, type TransactionDetails } from "./transaction-details.js";

/** The search response information. */
export type SearchResponse = {
  /** An array of transaction detail objects. */
  transactionDetails?: TransactionDetails[];
  /** The merchant account number. */
  accountNumber?: string;
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  startDate?: string;
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  endDate?: string;
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  lastRefreshedDatetime?: string;
  /** A zero-relative index of transactions. */
  page?: number;
  /**
   * The total number of transactions as an integer beginning with the specified `page` in the full
   * result and not just in this response.
   */
  totalItems?: number;
  /**
   * The total number of pages, as an `integer`, when the `total_items` is divided into pages of the
   * specified `page_size`.
   */
  totalPages?: number;
  /** An array of request-related [HATEOAS links](/api/rest/responses/#hateoas-links). */
  links?: LinkDescription[];
};

export const searchResponseSchema: Schema<SearchResponse> = s.object<SearchResponse>({
  transactionDetails: s.optional(s.array(s.lazy(() => transactionDetailsSchema))),
  accountNumber: s.optional(s.string()),
  startDate: s.optional(s.string()),
  endDate: s.optional(s.string()),
  lastRefreshedDatetime: s.optional(s.string()),
  page: s.optional(s.int()),
  totalItems: s.optional(s.int()),
  totalPages: s.optional(s.int()),
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
