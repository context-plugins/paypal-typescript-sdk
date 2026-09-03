import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type TransactionSearchErrorDetails = {
  field?: string;
  value?: string;
  location?: string;
  issue: string;
  description?: string;
};

export const transactionSearchErrorDetailsSchema: Schema<TransactionSearchErrorDetails> =
  s.object<TransactionSearchErrorDetails>({
    field: s.optional(s.string()),
    value: s.optional(s.string()),
    location: s.optional(s.string()),
    issue: s.string(),
    description: s.optional(s.string()),
  });
