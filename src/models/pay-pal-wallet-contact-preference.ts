import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const PayPalWalletContactPreference = {
  NoContactInfo: "NO_CONTACT_INFO",
  UpdateContactInfo: "UPDATE_CONTACT_INFO",
  RetainContactInfo: "RETAIN_CONTACT_INFO",
} as const;
export type PayPalWalletContactPreference =
  | (typeof PayPalWalletContactPreference)[keyof typeof PayPalWalletContactPreference]
  | (string & {});

export const payPalWalletContactPreferenceSchema: EnumSchema<PayPalWalletContactPreference> =
  s.enumOf<PayPalWalletContactPreference>(PayPalWalletContactPreference);
