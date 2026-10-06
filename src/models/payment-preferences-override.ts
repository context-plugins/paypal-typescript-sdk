import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { setupFeeFailureActionSchema, type SetupFeeFailureAction } from "./setup-fee-failure-action.js";

/** The payment preferences to override at subscription level. */
export type PaymentPreferencesOverride = {
  /** Indicates whether to automatically bill the outstanding amount in the next billing cycle. */
  autoBillOutstanding?: boolean;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  setupFee?: Money;
  /** The action to take on the subscription if the initial payment for the setup fails. */
  setupFeeFailureAction?: SetupFeeFailureAction;
  /**
   * The maximum number of payment failures before a subscription is suspended. For example, if
   * `payment_failure_threshold` is `2`, the subscription automatically updates to the `SUSPEND`
   * state if two consecutive payments fail.
   */
  paymentFailureThreshold?: number;
};

export const paymentPreferencesOverrideSchema: Schema<PaymentPreferencesOverride> =
  s.object<PaymentPreferencesOverride>({
    autoBillOutstanding: s.optional(s.boolean()),
    setupFee: s.optional(s.lazy(() => moneySchema)),
    setupFeeFailureAction: s.optional(s.lazy(() => setupFeeFailureActionSchema)),
    paymentFailureThreshold: s.optional(s.int()),
    _keysMap: {
      autoBillOutstanding: "auto_bill_outstanding",
      setupFee: "setup_fee",
      setupFeeFailureAction: "setup_fee_failure_action",
      paymentFailureThreshold: "payment_failure_threshold",
    },
  });
