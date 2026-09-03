import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { captureStatusSchema, type CaptureStatus } from "./capture-status.js";
import {
  subscriptionAmountWithBreakdownSchema,
  type SubscriptionAmountWithBreakdown,
} from "./subscription-amount-with-breakdown.js";
import { subscriptionPayerNameSchema, type SubscriptionPayerName } from "./subscription-payer-name.js";

export type SubscriptionTransactionDetails = {
  status?: CaptureStatus;
  id: string;
  amountWithBreakdown: SubscriptionAmountWithBreakdown;
  payerName?: SubscriptionPayerName;
  payerEmail?: string;
  time: string;
};

export const subscriptionTransactionDetailsSchema: Schema<SubscriptionTransactionDetails> =
  s.object<SubscriptionTransactionDetails>({
    status: s.optional(s.lazy(() => captureStatusSchema)),
    id: s.string(),
    amountWithBreakdown: subscriptionAmountWithBreakdownSchema,
    payerName: s.optional(s.lazy(() => subscriptionPayerNameSchema)),
    payerEmail: s.optional(s.string()),
    time: s.string(),
    _keysMap: {
      amountWithBreakdown: "amount_with_breakdown",
      payerName: "payer_name",
      payerEmail: "payer_email",
    },
  });
