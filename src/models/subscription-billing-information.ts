import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { cycleExecutionSchema, type CycleExecution } from "./cycle-execution.js";
import { failedPaymentDetailsSchema, type FailedPaymentDetails } from "./failed-payment-details.js";
import { lastPaymentDetailsSchema, type LastPaymentDetails } from "./last-payment-details.js";
import { moneySchema, type Money } from "./money.js";

/**
 * The billing details for the subscription. If the subscription was or is active, these fields are
 * populated.
 */
export type SubscriptionBillingInformation = {
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  outstandingBalance: Money;
  /** The trial and regular billing executions. */
  cycleExecutions?: CycleExecution[];
  /** The details for the last payment. */
  lastPayment?: LastPaymentDetails;
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  nextBillingTime?: string;
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  finalPaymentTime?: string;
  /**
   * The number of consecutive payment failures. Resets to `0` after a successful payment. If this
   * reaches the `payment_failure_threshold` value, the subscription updates to the `SUSPENDED`
   * state.
   */
  failedPaymentsCount: number;
  /** The details for the failed payment of the subscription. */
  lastFailedPayment?: FailedPaymentDetails;
};

export const subscriptionBillingInformationSchema: Schema<SubscriptionBillingInformation> =
  s.object<SubscriptionBillingInformation>({
    outstandingBalance: moneySchema,
    cycleExecutions: s.optional(s.array(s.lazy(() => cycleExecutionSchema))),
    lastPayment: s.optional(s.lazy(() => lastPaymentDetailsSchema)),
    nextBillingTime: s.optional(s.string()),
    finalPaymentTime: s.optional(s.string()),
    failedPaymentsCount: s.int(),
    lastFailedPayment: s.optional(s.lazy(() => failedPaymentDetailsSchema)),
    _keysMap: {
      outstandingBalance: "outstanding_balance",
      cycleExecutions: "cycle_executions",
      lastPayment: "last_payment",
      nextBillingTime: "next_billing_time",
      finalPaymentTime: "final_payment_time",
      failedPaymentsCount: "failed_payments_count",
      lastFailedPayment: "last_failed_payment",
    },
  });
