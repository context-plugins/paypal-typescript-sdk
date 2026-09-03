import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { sepaDebitRequestSchema, type SepaDebitRequest } from "./sepa-debit-request.js";

export type BankRequest = {
  achDebit?: Record<string, unknown>;
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
