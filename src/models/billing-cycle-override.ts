import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  subscriptionPricingSchemeSchema,
  type SubscriptionPricingScheme,
} from "./subscription-pricing-scheme.js";

export type BillingCycleOverride = {
  pricingScheme?: SubscriptionPricingScheme;
  sequence: number;
  totalCycles?: number;
};

export const billingCycleOverrideSchema: Schema<BillingCycleOverride> = s.object<BillingCycleOverride>({
  pricingScheme: s.optional(s.lazy(() => subscriptionPricingSchemeSchema)),
  sequence: s.number(),
  totalCycles: s.optional(s.number()),
  _keysMap: {
    pricingScheme: "pricing_scheme",
    totalCycles: "total_cycles",
  },
});
