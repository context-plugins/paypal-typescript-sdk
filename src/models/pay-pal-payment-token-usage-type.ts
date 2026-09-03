import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const PayPalPaymentTokenUsageType = {
  Merchant: "MERCHANT",
  Platform: "PLATFORM",
} as const;
export type PayPalPaymentTokenUsageType =
  | (typeof PayPalPaymentTokenUsageType)[keyof typeof PayPalPaymentTokenUsageType]
  | (string & {});

export const payPalPaymentTokenUsageTypeSchema: EnumSchema<PayPalPaymentTokenUsageType> =
  s.enumOf<PayPalPaymentTokenUsageType>(PayPalPaymentTokenUsageType);
