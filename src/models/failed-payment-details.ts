import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { reasonCodeSchema, type ReasonCode } from "./reason-code.js";

/** The details for the failed payment of the subscription. */
export type FailedPaymentDetails = {
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  amount: Money;
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  time: string;
  /** The reason code for the payment failure. */
  reasonCode?: ReasonCode;
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  nextPaymentRetryTime?: string;
};

export const failedPaymentDetailsSchema: Schema<FailedPaymentDetails> = s.object<FailedPaymentDetails>({
  amount: moneySchema,
  time: s.string(),
  reasonCode: s.optional(s.lazy(() => reasonCodeSchema)),
  nextPaymentRetryTime: s.optional(s.string()),
  _keysMap: {
    reasonCode: "reason_code",
    nextPaymentRetryTime: "next_payment_retry_time",
  },
});
