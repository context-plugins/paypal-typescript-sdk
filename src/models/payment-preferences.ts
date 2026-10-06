import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { SetupFeeFailureAction, setupFeeFailureActionSchema } from "./setup-fee-failure-action.js";

/** The payment preferences for a subscription. */
export type PaymentPreferences = {
  /**
   * Indicates whether to automatically bill the outstanding amount in the next billing cycle.
   *
   * @default true
   */
  autoBillOutstanding?: boolean;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  setupFee?: Money;
  /**
   * The action to take on the subscription if the initial payment for the setup fails.
   *
   * @default SetupFeeFailureAction.Cancel
   */
  setupFeeFailureAction?: SetupFeeFailureAction;
  /**
   * The maximum number of payment failures before a subscription is suspended. For example, if
   * `payment_failure_threshold` is `2`, the subscription automatically updates to the `SUSPEND`
   * state if two consecutive payments fail.
   *
   * @default 0
   */
  paymentFailureThreshold?: number;
};

export const paymentPreferencesSchema: Schema<PaymentPreferences> = s.object<PaymentPreferences>({
  autoBillOutstanding: s.defaulted(s.boolean(), true),
  setupFee: s.optional(s.lazy(() => moneySchema)),
  setupFeeFailureAction: s.defaulted(setupFeeFailureActionSchema, SetupFeeFailureAction.Cancel),
  paymentFailureThreshold: s.defaulted(s.int(), 0),
  _keysMap: {
    autoBillOutstanding: "auto_bill_outstanding",
    setupFee: "setup_fee",
    setupFeeFailureAction: "setup_fee_failure_action",
    paymentFailureThreshold: "payment_failure_threshold",
  },
});
