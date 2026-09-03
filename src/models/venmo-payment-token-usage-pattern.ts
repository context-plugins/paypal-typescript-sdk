import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const VenmoPaymentTokenUsagePattern = {
  Immediate: "IMMEDIATE",
  Deferred: "DEFERRED",
  RecurringPrepaid: "RECURRING_PREPAID",
  RecurringPostpaid: "RECURRING_POSTPAID",
  ThresholdPrepaid: "THRESHOLD_PREPAID",
  ThresholdPostpaid: "THRESHOLD_POSTPAID",
} as const;
export type VenmoPaymentTokenUsagePattern =
  | (typeof VenmoPaymentTokenUsagePattern)[keyof typeof VenmoPaymentTokenUsagePattern]
  | (string & {});

export const venmoPaymentTokenUsagePatternSchema: EnumSchema<VenmoPaymentTokenUsagePattern> =
  s.enumOf<VenmoPaymentTokenUsagePattern>(VenmoPaymentTokenUsagePattern);
