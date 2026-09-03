import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const VenmoPaymentTokenUsageType = {
  Merchant: "MERCHANT",
  Platform: "PLATFORM",
} as const;
export type VenmoPaymentTokenUsageType =
  | (typeof VenmoPaymentTokenUsageType)[keyof typeof VenmoPaymentTokenUsageType]
  | (string & {});

export const venmoPaymentTokenUsageTypeSchema: EnumSchema<VenmoPaymentTokenUsageType> =
  s.enumOf<VenmoPaymentTokenUsageType>(VenmoPaymentTokenUsageType);
