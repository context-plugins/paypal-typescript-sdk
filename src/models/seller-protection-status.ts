import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const SellerProtectionStatus = {
  Eligible: "ELIGIBLE",
  PartiallyEligible: "PARTIALLY_ELIGIBLE",
  NotEligible: "NOT_ELIGIBLE",
} as const;
export type SellerProtectionStatus =
  | (typeof SellerProtectionStatus)[keyof typeof SellerProtectionStatus]
  | (string & {});

export const sellerProtectionStatusSchema: EnumSchema<SellerProtectionStatus> =
  s.enumOf<SellerProtectionStatus>(SellerProtectionStatus);
