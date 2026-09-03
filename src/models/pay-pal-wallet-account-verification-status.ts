import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const PayPalWalletAccountVerificationStatus = {
  Verified: "VERIFIED",
  Unverified: "UNVERIFIED",
} as const;
export type PayPalWalletAccountVerificationStatus =
  | (typeof PayPalWalletAccountVerificationStatus)[keyof typeof PayPalWalletAccountVerificationStatus]
  | (string & {});

export const payPalWalletAccountVerificationStatusSchema: EnumSchema<PayPalWalletAccountVerificationStatus> =
  s.enumOf<PayPalWalletAccountVerificationStatus>(PayPalWalletAccountVerificationStatus);
