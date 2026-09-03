import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const StoredPaymentSourcePaymentType = {
  OneTime: "ONE_TIME",
  Recurring: "RECURRING",
  Unscheduled: "UNSCHEDULED",
} as const;
export type StoredPaymentSourcePaymentType =
  | (typeof StoredPaymentSourcePaymentType)[keyof typeof StoredPaymentSourcePaymentType]
  | (string & {});

export const storedPaymentSourcePaymentTypeSchema: EnumSchema<StoredPaymentSourcePaymentType> =
  s.enumOf<StoredPaymentSourcePaymentType>(StoredPaymentSourcePaymentType);
