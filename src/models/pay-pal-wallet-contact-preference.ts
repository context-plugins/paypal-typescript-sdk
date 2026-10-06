import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * The preference to display the contact information (buyer’s shipping email & phone number) on
 * PayPal's checkout for easy merchant-buyer communication.
 */
export const PayPalWalletContactPreference = {
  /** The merchant can opt out of showing buyer's contact information on PayPal checkout. */
  NoContactInfo: "NO_CONTACT_INFO",
  /**
   * The merchant allows buyer to add or update shipping contact information on the PayPal checkout.
   * Please ensure to use this updated information returned in shipping.email_address and
   * shipping.phone_number to contact your buyers.
   */
  UpdateContactInfo: "UPDATE_CONTACT_INFO",
  /**
   * The buyer can only see but can not override merchant passed contact information
   * (shipping.email_address and shipping.phone_number) on PayPal checkout. NOTE: If you don't pass
   * the contact information, the behavior is the same as NO_CONTACT_INFO preference.
   */
  RetainContactInfo: "RETAIN_CONTACT_INFO",
} as const;
export type PayPalWalletContactPreference =
  | (typeof PayPalWalletContactPreference)[keyof typeof PayPalWalletContactPreference]
  | (string & {});

export const payPalWalletContactPreferenceSchema: EnumSchema<PayPalWalletContactPreference> =
  s.enumOf<PayPalWalletContactPreference>(PayPalWalletContactPreference);
