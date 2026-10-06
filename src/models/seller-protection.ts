import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { disputeCategorySchema, type DisputeCategory } from "./dispute-category.js";
import { sellerProtectionStatusSchema, type SellerProtectionStatus } from "./seller-protection-status.js";

/**
 * The level of protection offered as defined by [PayPal Seller Protection for
 * Merchants](https://www.paypal.com/us/webapps/mpp/security/seller-protection).
 */
export type SellerProtection = {
  /**
   * Indicates whether the transaction is eligible for seller protection. For information, see
   * [PayPal Seller Protection for
   * Merchants](https://www.paypal.com/us/webapps/mpp/security/seller-protection).
   */
  status?: SellerProtectionStatus;
  /** An array of conditions that are covered for the transaction. */
  disputeCategories?: DisputeCategory[];
};

export const sellerProtectionSchema: Schema<SellerProtection> = s.object<SellerProtection>({
  status: s.optional(s.lazy(() => sellerProtectionStatusSchema)),
  disputeCategories: s.optional(s.array(s.lazy(() => disputeCategorySchema))),
  _keysMap: {
    disputeCategories: "dispute_categories",
  },
});
