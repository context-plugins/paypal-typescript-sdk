import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import {
  transactionSearchErrorDetailsSchema,
  type TransactionSearchErrorDetails,
} from "./transaction-search-error-details.js";

export type SearchError = {
  name: string;
  message: string;
  debugId: string;
  informationLink?: string;
  details?: TransactionSearchErrorDetails[];
  links?: LinkDescription[];
  totalItems?: number;
  maximumItems?: number;
};

export const searchErrorSchema: Schema<SearchError> = s.object<SearchError>({
  name: s.string(),
  message: s.string(),
  debugId: s.string(),
  informationLink: s.optional(s.string()),
  details: s.optional(s.array(s.lazy(() => transactionSearchErrorDetailsSchema))),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  totalItems: s.optional(s.number()),
  maximumItems: s.optional(s.number()),
  _keysMap: {
    debugId: "debug_id",
    informationLink: "information_link",
    totalItems: "total_items",
    maximumItems: "maximum_items",
  },
});
