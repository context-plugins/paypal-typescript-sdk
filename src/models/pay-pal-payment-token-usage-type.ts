import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * The usage type associated with the PayPal payment token., The usage type associated with a
 * digital wallet payment token.
 */
export const PayPalPaymentTokenUsageType = {
  /** The PayPal Payment Token will be used for future transaction directly with a merchant. */
  Merchant: "MERCHANT",
  /**
   * The PayPal Payment Token will be used for future transaction on a platform. A platform is
   * typically a marketplace or a channel that a payer can purchase goods and services from multiple
   * merchants.
   */
  Platform: "PLATFORM",
} as const;
export type PayPalPaymentTokenUsageType =
  | (typeof PayPalPaymentTokenUsageType)[keyof typeof PayPalPaymentTokenUsageType]
  | (string & {});

export const payPalPaymentTokenUsageTypeSchema: EnumSchema<PayPalPaymentTokenUsageType> =
  s.enumOf<PayPalPaymentTokenUsageType>(PayPalPaymentTokenUsageType);
