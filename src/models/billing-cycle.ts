import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { pricingSchemeSchema, type PricingScheme } from "./pricing-scheme.js";
import { tenureTypeSchema, type TenureType } from "./tenure-type.js";

/**
 * The billing cycle providing details of the billing frequency, amount, duration and if the billing
 * cycle is a free, discounted or regular billing cycle. The sequence of the billing cycle will be
 * in the following order - free trial billing cycle(s), discounted trial billing cycle(s), regular
 * billing cycle(s).
 */
export type BillingCycle = {
  /**
   * The tenure type of the billing cycle identifies if the billing cycle is a trial(free or
   * discounted) or regular billing cycle.
   */
  tenureType: TenureType;
  /** The pricing scheme details. */
  pricingScheme?: PricingScheme;
  /**
   * The number of times this billing cycle gets executed. Trial billing cycles can only be executed
   * a finite number of times (value between 1 and 999 for total_cycles). Regular billing cycles can
   * be executed infinite times (value of 0 for total_cycles) or a finite number of times (value
   * between 1 and 999 for total_cycles).
   *
   * @default 1
   */
  totalCycles?: number;
  /**
   * The order in which this cycle is to run among other billing cycles. For example, a trial
   * billing cycle has a `sequence` of `1` while a regular billing cycle has a `sequence` of `2`, so
   * that trial cycle runs before the regular cycle.
   *
   * @default 1
   */
  sequence?: number;
  /**
   * The stand-alone date, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). To represent special legal values,
   * such as a date of birth, you should use dates with no associated time or time-zone data.
   * Whenever possible, use the standard `date_time` type. This regular expression does not validate
   * all dates. For example, February 31 is valid and nothing is known about leap years.
   */
  startDate?: string;
};

export const billingCycleSchema: Schema<BillingCycle> = s.object<BillingCycle>({
  tenureType: tenureTypeSchema,
  pricingScheme: s.optional(s.lazy(() => pricingSchemeSchema)),
  totalCycles: s.defaulted(s.int(), 1),
  sequence: s.defaulted(s.int(), 1),
  startDate: s.optional(s.string()),
  _keysMap: {
    tenureType: "tenure_type",
    pricingScheme: "pricing_scheme",
    totalCycles: "total_cycles",
    startDate: "start_date",
  },
});
