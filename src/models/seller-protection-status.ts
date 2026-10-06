import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Indicates whether the transaction is eligible for seller protection. For information, see [PayPal
 * Seller Protection for
 * Merchants](https://www.paypal.com/us/webapps/mpp/security/seller-protection).
 */
export const SellerProtectionStatus = {
  /**
   * Your PayPal balance remains intact if the customer claims that they did not receive an item or
   * the account holder claims that they did not authorize the payment.
   */
  Eligible: "ELIGIBLE",
  /**
   * Your PayPal balance remains intact if the customer claims that they did not receive an item.
   */
  PartiallyEligible: "PARTIALLY_ELIGIBLE",
  /** This transaction is not eligible for seller protection. */
  NotEligible: "NOT_ELIGIBLE",
} as const;
export type SellerProtectionStatus =
  | (typeof SellerProtectionStatus)[keyof typeof SellerProtectionStatus]
  | (string & {});

export const sellerProtectionStatusSchema: EnumSchema<SellerProtectionStatus> =
  s.enumOf<SellerProtectionStatus>(SellerProtectionStatus);
