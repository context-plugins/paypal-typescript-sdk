import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { frequencySchema, type Frequency } from "./frequency.js";
import {
  subscriptionPricingSchemeSchema,
  type SubscriptionPricingScheme,
} from "./subscription-pricing-scheme.js";
import { tenureTypeSchema, type TenureType } from "./tenure-type.js";

export type SubscriptionBillingCycle = {
  pricingScheme?: SubscriptionPricingScheme;
  frequency: Frequency;
  tenureType: TenureType;
  sequence: number;
  totalCycles?: number;
};

export const subscriptionBillingCycleSchema: Schema<SubscriptionBillingCycle> =
  s.object<SubscriptionBillingCycle>({
    pricingScheme: s.optional(s.lazy(() => subscriptionPricingSchemeSchema)),
    frequency: frequencySchema,
    tenureType: tenureTypeSchema,
    sequence: s.number(),
    totalCycles: s.optional(s.number()),
    _keysMap: {
      pricingScheme: "pricing_scheme",
      tenureType: "tenure_type",
      totalCycles: "total_cycles",
    },
  });
