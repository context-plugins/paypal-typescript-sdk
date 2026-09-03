import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { disputeCategorySchema, type DisputeCategory } from "./dispute-category.js";
import { sellerProtectionStatusSchema, type SellerProtectionStatus } from "./seller-protection-status.js";

export type SellerProtection = {
  status?: SellerProtectionStatus;
  disputeCategories?: DisputeCategory[];
};

export const sellerProtectionSchema: Schema<SellerProtection> = s.object<SellerProtection>({
  status: s.optional(s.lazy(() => sellerProtectionStatusSchema)),
  disputeCategories: s.optional(s.array(s.lazy(() => disputeCategorySchema))),
  _keysMap: {
    disputeCategories: "dispute_categories",
  },
});
