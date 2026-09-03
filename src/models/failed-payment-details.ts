import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { reasonCodeSchema, type ReasonCode } from "./reason-code.js";

export type FailedPaymentDetails = {
  amount: Money;
  time: string;
  reasonCode?: ReasonCode;
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
