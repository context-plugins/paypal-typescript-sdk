import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { frequencySchema, type Frequency } from "./frequency.js";
import {
  subscriptionPricingSchemeSchema,
  type SubscriptionPricingScheme,
} from "./subscription-pricing-scheme.js";
import { tenureTypeSchema, type TenureType } from "./tenure-type.js";

/** The billing cycle details. */
export type SubscriptionBillingCycle = {
  /** The pricing scheme details. */
  pricingScheme?: SubscriptionPricingScheme;
  /** The frequency of the billing cycle. */
  frequency: Frequency;
  /**
   * The tenure type of the billing cycle. In case of a plan having trial cycle, only 2 trial cycles
   * are allowed per plan.
   */
  tenureType: TenureType;
  /**
   * The order in which this cycle is to run among other billing cycles. For example, a trial
   * billing cycle has a `sequence` of `1` while a regular billing cycle has a `sequence` of `2`, so
   * that trial cycle runs before the regular cycle.
   */
  sequence: number;
  /**
   * The number of times this billing cycle gets executed. Trial billing cycles can only be executed
   * a finite number of times (value between 1 and 999 for total_cycles). Regular billing cycles can
   * be executed infinite times (value of 0 for total_cycles) or a finite number of times (value
   * between 1 and 999 for total_cycles).
   *
   * @default 1
   */
  totalCycles?: number;
};

export const subscriptionBillingCycleSchema: Schema<SubscriptionBillingCycle> =
  s.object<SubscriptionBillingCycle>({
    pricingScheme: s.optional(s.lazy(() => subscriptionPricingSchemeSchema)),
    frequency: frequencySchema,
    tenureType: tenureTypeSchema,
    sequence: s.int(),
    totalCycles: s.defaulted(s.int(), 1),
    _keysMap: {
      pricingScheme: "pricing_scheme",
      tenureType: "tenure_type",
      totalCycles: "total_cycles",
    },
  });
