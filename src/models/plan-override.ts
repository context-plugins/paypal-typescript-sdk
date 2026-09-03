import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { billingCycleOverrideSchema, type BillingCycleOverride } from "./billing-cycle-override.js";
import {
  paymentPreferencesOverrideSchema,
  type PaymentPreferencesOverride,
} from "./payment-preferences-override.js";
import { taxesOverrideSchema, type TaxesOverride } from "./taxes-override.js";

export type PlanOverride = {
  billingCycles?: BillingCycleOverride[];
  paymentPreferences?: PaymentPreferencesOverride;
  taxes?: TaxesOverride;
};

export const planOverrideSchema: Schema<PlanOverride> = s.object<PlanOverride>({
  billingCycles: s.optional(s.array(s.lazy(() => billingCycleOverrideSchema))),
  paymentPreferences: s.optional(s.lazy(() => paymentPreferencesOverrideSchema)),
  taxes: s.optional(s.lazy(() => taxesOverrideSchema)),
  _keysMap: {
    billingCycles: "billing_cycles",
    paymentPreferences: "payment_preferences",
  },
});
