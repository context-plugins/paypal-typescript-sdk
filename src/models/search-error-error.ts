import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import {
  transactionSearchErrorDetailsSchema,
  type TransactionSearchErrorDetails,
} from "./transaction-search-error-details.js";

/** The error details. */
export type SearchErrorError = {
  /** The human-readable, unique name of the error. */
  name: string;
  /** The message that describes the error. */
  message: string;
  /** The PayPal internal ID. Used for correlation purposes. */
  debugId: string;
  /**
   * The information link, or URI, that shows detailed information about this error for the
   * developer.
   */
  informationLink?: string;
  /** An array of additional details about the error. */
  details?: TransactionSearchErrorDetails[];
  /**
   * An array of request-related [HATEOAS links](/docs/api/reference/api-responses/#hateoas-links).
   */
  links?: LinkDescription[];
  /** The total number of transactions. Valid only for `RESULTSET_TOO_LARGE`. */
  totalItems?: number;
  /** The maximum number of transactions. Valid only for `RESULTSET_TOO_LARGE`. */
  maximumItems?: number;
};

export const searchErrorErrorSchema: Schema<SearchErrorError> = s.object<SearchErrorError>({
  name: s.string(),
  message: s.string(),
  debugId: s.string(),
  informationLink: s.optional(s.string()),
  details: s.optional(s.array(s.lazy(() => transactionSearchErrorDetailsSchema))),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  totalItems: s.optional(s.int()),
  maximumItems: s.optional(s.int()),
  _keysMap: {
    debugId: "debug_id",
    informationLink: "information_link",
    totalItems: "total_items",
    maximumItems: "maximum_items",
  },
});
