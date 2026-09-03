import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { setupFeeFailureActionSchema, type SetupFeeFailureAction } from "./setup-fee-failure-action.js";

export type PaymentPreferences = {
  autoBillOutstanding?: boolean;
  setupFee?: Money;
  setupFeeFailureAction?: SetupFeeFailureAction;
  paymentFailureThreshold?: number;
};

export const paymentPreferencesSchema: Schema<PaymentPreferences> = s.object<PaymentPreferences>({
  autoBillOutstanding: s.optional(s.boolean()),
  setupFee: s.optional(s.lazy(() => moneySchema)),
  setupFeeFailureAction: s.optional(s.lazy(() => setupFeeFailureActionSchema)),
  paymentFailureThreshold: s.optional(s.number()),
  _keysMap: {
    autoBillOutstanding: "auto_bill_outstanding",
    setupFee: "setup_fee",
    setupFeeFailureAction: "setup_fee_failure_action",
    paymentFailureThreshold: "payment_failure_threshold",
  },
});
