import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const StoredPaymentSourceUsageType = {
  First: "FIRST",
  Subsequent: "SUBSEQUENT",
  Derived: "DERIVED",
} as const;
export type StoredPaymentSourceUsageType =
  | (typeof StoredPaymentSourceUsageType)[keyof typeof StoredPaymentSourceUsageType]
  | (string & {});

export const storedPaymentSourceUsageTypeSchema: EnumSchema<StoredPaymentSourceUsageType> =
  s.enumOf<StoredPaymentSourceUsageType>(StoredPaymentSourceUsageType);
