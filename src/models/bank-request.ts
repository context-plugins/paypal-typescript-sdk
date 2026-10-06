import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { sepaDebitRequestSchema, type SepaDebitRequest } from "./sepa-debit-request.js";

/** A Resource representing a request to vault a Bank used for ACH Debit. */
export type BankRequest = {
  /** A Resource representing a request to vault a ACH Debit. */
  achDebit?: Record<string, unknown>;
  /** An API resource denoting a request to securely store a SEPA Debit. */
  sepaDebit?: SepaDebitRequest;
};

export const bankRequestSchema: Schema<BankRequest> = s.object<BankRequest>({
  achDebit: s.optional(s.record(s.string(), s.unknown())),
  sepaDebit: s.optional(s.lazy(() => sepaDebitRequestSchema)),
  _keysMap: {
    achDebit: "ach_debit",
    sepaDebit: "sepa_debit",
  },
});
