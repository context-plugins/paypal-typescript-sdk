import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import {
  subscriptionTransactionDetailsSchema,
  type SubscriptionTransactionDetails,
} from "./subscription-transaction-details.js";

/** The list transactions for a subscription request details. */
export type TransactionsList = {
  /** An array of transactions. */
  transactions?: SubscriptionTransactionDetails[];
  /** The total number of items. */
  totalItems?: number;
  /** The total number of pages. */
  totalPages?: number;
  /**
   * An array of request-related [HATEOAS links](/docs/api/reference/api-responses/#hateoas-links).
   */
  links?: LinkDescription[];
};

export const transactionsListSchema: Schema<TransactionsList> = s.object<TransactionsList>({
  transactions: s.optional(s.array(s.lazy(() => subscriptionTransactionDetailsSchema))),
  totalItems: s.optional(s.int()),
  totalPages: s.optional(s.int()),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  _keysMap: {
    totalItems: "total_items",
    totalPages: "total_pages",
  },
});
