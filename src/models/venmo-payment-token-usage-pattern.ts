import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Expected business/pricing model for the billing agreement. */
export const VenmoPaymentTokenUsagePattern = {
  /** On-demand instant payments – non-recurring, pre-paid, variable amount, variable frequency. */
  Immediate: "IMMEDIATE",
  /** Pay after use, non-recurring post-paid, variable amount, irregular frequency. */
  Deferred: "DEFERRED",
  /** Pay upfront fixed or variable amount on a fixed date before the goods/service is delivered. */
  RecurringPrepaid: "RECURRING_PREPAID",
  /** Pay on a fixed date based on usage or consumption after the goods/service is delivered. */
  RecurringPostpaid: "RECURRING_POSTPAID",
  /**
   * Charge payer when the set amount is reached or monthly billing cycle, whichever comes first,
   * before the goods/service is delivered.
   */
  ThresholdPrepaid: "THRESHOLD_PREPAID",
  /**
   * Charge payer when the set amount is reached or monthly billing cycle, whichever comes first,
   * after the goods/service is delivered.
   */
  ThresholdPostpaid: "THRESHOLD_POSTPAID",
} as const;
export type VenmoPaymentTokenUsagePattern =
  | (typeof VenmoPaymentTokenUsagePattern)[keyof typeof VenmoPaymentTokenUsagePattern]
  | (string & {});

export const venmoPaymentTokenUsagePatternSchema: EnumSchema<VenmoPaymentTokenUsagePattern> =
  s.enumOf<VenmoPaymentTokenUsagePattern>(VenmoPaymentTokenUsagePattern);
