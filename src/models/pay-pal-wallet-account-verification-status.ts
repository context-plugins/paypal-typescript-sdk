import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * The account status indicates whether the buyer has verified the financial details associated with
 * their PayPal account.
 */
export const PayPalWalletAccountVerificationStatus = {
  /**
   * The buyer has completed the verification of the financial details associated with this PayPal
   * account. For example: confirming their bank account.
   */
  Verified: "VERIFIED",
  /**
   * The buyer has not completed the verification of the financial details associated with this
   * PayPal account. For example: confirming their bank account.
   */
  Unverified: "UNVERIFIED",
} as const;
export type PayPalWalletAccountVerificationStatus =
  | (typeof PayPalWalletAccountVerificationStatus)[keyof typeof PayPalWalletAccountVerificationStatus]
  | (string & {});

export const payPalWalletAccountVerificationStatusSchema: EnumSchema<PayPalWalletAccountVerificationStatus> =
  s.enumOf<PayPalWalletAccountVerificationStatus>(PayPalWalletAccountVerificationStatus);
