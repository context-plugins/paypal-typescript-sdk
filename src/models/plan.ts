import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { billingCycleSchema, type BillingCycle } from "./billing-cycle.js";
import { oneTimeChargeSchema, type OneTimeCharge } from "./one-time-charge.js";

/** The merchant level Recurring Billing plan metadata for the Billing Agreement. */
export type Plan = {
  /**
   * An array of billing cycles for trial billing and regular billing. A plan can have at most two
   * trial cycles and only one regular cycle.
   */
  billingCycles: BillingCycle[];
  /** The one-time charge info at the time of checkout. */
  oneTimeCharges: OneTimeCharge;
  /** Name of the recurring plan. */
  name?: string;
};

export const planSchema: Schema<Plan> = s.object<Plan>({
  billingCycles: s.array(s.lazy(() => billingCycleSchema)),
  oneTimeCharges: oneTimeChargeSchema,
  name: s.optional(s.string()),
  _keysMap: {
    billingCycles: "billing_cycles",
    oneTimeCharges: "one_time_charges",
  },
});
