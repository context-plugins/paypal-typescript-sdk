import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { billingCycleSchema, type BillingCycle } from "./billing-cycle.js";
import { oneTimeChargeSchema, type OneTimeCharge } from "./one-time-charge.js";

export type Plan = {
  billingCycles: BillingCycle[];
  oneTimeCharges: OneTimeCharge;
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
