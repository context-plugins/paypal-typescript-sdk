import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The usage type associated with the Venmo payment token. */
export const VenmoPaymentTokenUsageType = {
  /** The Venmo Payment Token will be used for future transaction directly with a merchant. */
  Merchant: "MERCHANT",
  /**
   * The Venmo Payment Token will be used for future transaction on a platform. A platform is
   * typically a marketplace or a channel that a payer can purchase goods and services from multiple
   * merchants.
   */
  Platform: "PLATFORM",
} as const;
export type VenmoPaymentTokenUsageType =
  | (typeof VenmoPaymentTokenUsageType)[keyof typeof VenmoPaymentTokenUsageType]
  | (string & {});

export const venmoPaymentTokenUsageTypeSchema: EnumSchema<VenmoPaymentTokenUsageType> =
  s.enumOf<VenmoPaymentTokenUsageType>(VenmoPaymentTokenUsageType);
