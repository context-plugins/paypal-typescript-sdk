import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import {
  transactionSearchErrorDetailsSchema,
  type TransactionSearchErrorDetails,
} from "./transaction-search-error-details.js";

export type DefaultError = {
  name: string;
  message: string;
  debugId: string;
  informationLink?: string;
  details?: TransactionSearchErrorDetails[];
  links?: LinkDescription[];
};

export const defaultErrorSchema: Schema<DefaultError> = s.object<DefaultError>({
  name: s.string(),
  message: s.string(),
  debugId: s.string(),
  informationLink: s.optional(s.string()),
  details: s.optional(s.array(s.lazy(() => transactionSearchErrorDetailsSchema))),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  _keysMap: {
    debugId: "debug_id",
    informationLink: "information_link",
  },
});
