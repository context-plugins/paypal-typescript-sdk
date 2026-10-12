import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The usage type associated with the PayPal payment token. */
export const UsageType = {
  /** The PayPal Payment Token will be used for future transaction directly with a merchant. */
  Merchant: "MERCHANT",
  /**
   * The PayPal Payment Token will be used for future transaction on a platform. A platform is
   * typically a marketplace or a channel that a payer can purchase goods and services from multiple
   * merchants.
   */
  Platform: "PLATFORM",
} as const;
export type UsageType = (typeof UsageType)[keyof typeof UsageType] | (string & {});

export const usageTypeSchema: EnumSchema<UsageType> = s.enumOf<UsageType>(UsageType);
