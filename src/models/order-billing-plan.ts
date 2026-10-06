import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { billingCycleSchema, type BillingCycle } from "./billing-cycle.js";
import { moneySchema, type Money } from "./money.js";

/**
 * Metadata for merchant-managed recurring billing plans. Valid only during the saved payment method
 * token or billing agreement creation.
 */
export type OrderBillingPlan = {
  /**
   * An array of billing cycles for trial billing and regular billing. A plan can have at most two
   * trial cycles and only one regular cycle.
   */
  billingCycles: BillingCycle[];
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  setupFee?: Money;
  /** Name of the recurring plan. */
  name?: string;
};

export const orderBillingPlanSchema: Schema<OrderBillingPlan> = s.object<OrderBillingPlan>({
  billingCycles: s.array(s.lazy(() => billingCycleSchema)),
  setupFee: s.optional(s.lazy(() => moneySchema)),
  name: s.optional(s.string()),
  _keysMap: {
    billingCycles: "billing_cycles",
    setupFee: "setup_fee",
  },
});
