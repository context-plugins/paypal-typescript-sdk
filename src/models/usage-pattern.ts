import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const UsagePattern = {
  Immediate: "IMMEDIATE",
  Deferred: "DEFERRED",
  RecurringPrepaid: "RECURRING_PREPAID",
  RecurringPostpaid: "RECURRING_POSTPAID",
  ThresholdPrepaid: "THRESHOLD_PREPAID",
  ThresholdPostpaid: "THRESHOLD_POSTPAID",
  SubscriptionPrepaid: "SUBSCRIPTION_PREPAID",
  SubscriptionPostpaid: "SUBSCRIPTION_POSTPAID",
  UnscheduledPrepaid: "UNSCHEDULED_PREPAID",
  UnscheduledPostpaid: "UNSCHEDULED_POSTPAID",
  InstallmentPrepaid: "INSTALLMENT_PREPAID",
  InstallmentPostpaid: "INSTALLMENT_POSTPAID",
} as const;
export type UsagePattern = (typeof UsagePattern)[keyof typeof UsagePattern] | (string & {});

export const usagePatternSchema: EnumSchema<UsagePattern> = s.enumOf<UsagePattern>(UsagePattern);
