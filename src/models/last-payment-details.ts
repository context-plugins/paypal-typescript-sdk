import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";

export type LastPaymentDetails = {
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  amount?: Money;
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  time?: string;
};

export const lastPaymentDetailsSchema: Schema<LastPaymentDetails> = s.object<LastPaymentDetails>({
  amount: s.optional(s.lazy(() => moneySchema)),
  time: s.optional(s.string()),
});
