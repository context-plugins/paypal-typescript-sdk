import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { billingCycleOverrideSchema, type BillingCycleOverride } from "./billing-cycle-override.js";
import {
  paymentPreferencesOverrideSchema,
  type PaymentPreferencesOverride,
} from "./payment-preferences-override.js";
import { taxesOverrideSchema, type TaxesOverride } from "./taxes-override.js";

/**
 * An inline plan object to customise the subscription. You can override plan level default
 * attributes by providing customised values for the subscription in this object.
 */
export type PlanOverride = {
  /**
   * An array of billing cycles for trial billing and regular billing. The subscription billing
   * cycle definition has to adhere to the plan billing cycle definition.
   */
  billingCycles?: BillingCycleOverride[];
  /** The payment preferences to override at subscription level. */
  paymentPreferences?: PaymentPreferencesOverride;
  /** The tax details. */
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
