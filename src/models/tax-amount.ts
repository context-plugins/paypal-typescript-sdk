import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";

/** The tax levied by a government on the purchase of goods or services. */
export type TaxAmount = {
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  taxAmount?: Money;
};

export const taxAmountSchema: Schema<TaxAmount> = s.object<TaxAmount>({
  taxAmount: s.optional(s.lazy(() => moneySchema)),
  _keysMap: {
    taxAmount: "tax_amount",
  },
});
