import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  subscriptionPricingSchemeSchema,
  type SubscriptionPricingScheme,
} from "./subscription-pricing-scheme.js";

export type UpdatePricingScheme = {
  billingCycleSequence: number;
  pricingScheme: SubscriptionPricingScheme;
};

export const updatePricingSchemeSchema: Schema<UpdatePricingScheme> = s.object<UpdatePricingScheme>({
  billingCycleSequence: s.number(),
  pricingScheme: subscriptionPricingSchemeSchema,
  _keysMap: {
    billingCycleSequence: "billing_cycle_sequence",
    pricingScheme: "pricing_scheme",
  },
});
