import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  subscriptionPricingSchemeSchema,
  type SubscriptionPricingScheme,
} from "./subscription-pricing-scheme.js";

/** The update pricing scheme request details. */
export type UpdatePricingScheme = {
  /** The billing cycle sequence. */
  billingCycleSequence: number;
  /** The pricing scheme details. */
  pricingScheme: SubscriptionPricingScheme;
};

export const updatePricingSchemeSchema: Schema<UpdatePricingScheme> = s.object<UpdatePricingScheme>({
  billingCycleSequence: s.int(),
  pricingScheme: subscriptionPricingSchemeSchema,
  _keysMap: {
    billingCycleSequence: "billing_cycle_sequence",
    pricingScheme: "pricing_scheme",
  },
});
