import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { billingCycleSchema, type BillingCycle } from "./billing-cycle.js";
import { moneySchema, type Money } from "./money.js";

export type OrderBillingPlan = {
  billingCycles: BillingCycle[];
  setupFee?: Money;
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
