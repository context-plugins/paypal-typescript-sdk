import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";

export type TaxAmount = {
  taxAmount?: Money;
};

export const taxAmountSchema: Schema<TaxAmount> = s.object<TaxAmount>({
  taxAmount: s.optional(s.lazy(() => moneySchema)),
  _keysMap: {
    taxAmount: "tax_amount",
  },
});
