import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { cycleExecutionSchema, type CycleExecution } from "./cycle-execution.js";
import { failedPaymentDetailsSchema, type FailedPaymentDetails } from "./failed-payment-details.js";
import { lastPaymentDetailsSchema, type LastPaymentDetails } from "./last-payment-details.js";
import { moneySchema, type Money } from "./money.js";

export type SubscriptionBillingInformation = {
  outstandingBalance: Money;
  cycleExecutions?: CycleExecution[];
  lastPayment?: LastPaymentDetails;
  nextBillingTime?: string;
  finalPaymentTime?: string;
  failedPaymentsCount: number;
  lastFailedPayment?: FailedPaymentDetails;
};

export const subscriptionBillingInformationSchema: Schema<SubscriptionBillingInformation> =
  s.object<SubscriptionBillingInformation>({
    outstandingBalance: moneySchema,
    cycleExecutions: s.optional(s.array(s.lazy(() => cycleExecutionSchema))),
    lastPayment: s.optional(s.lazy(() => lastPaymentDetailsSchema)),
    nextBillingTime: s.optional(s.string()),
    finalPaymentTime: s.optional(s.string()),
    failedPaymentsCount: s.number(),
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
