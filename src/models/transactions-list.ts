import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import {
  subscriptionTransactionDetailsSchema,
  type SubscriptionTransactionDetails,
} from "./subscription-transaction-details.js";

export type TransactionsList = {
  transactions?: SubscriptionTransactionDetails[];
  totalItems?: number;
  totalPages?: number;
  links?: LinkDescription[];
};

export const transactionsListSchema: Schema<TransactionsList> = s.object<TransactionsList>({
  transactions: s.optional(s.array(s.lazy(() => subscriptionTransactionDetailsSchema))),
  totalItems: s.optional(s.number()),
  totalPages: s.optional(s.number()),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  _keysMap: {
    totalItems: "total_items",
    totalPages: "total_pages",
  },
});
