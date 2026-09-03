import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const PayPalWalletContextShippingPreference = {
  GetFromFile: "GET_FROM_FILE",
  NoShipping: "NO_SHIPPING",
  SetProvidedAddress: "SET_PROVIDED_ADDRESS",
} as const;
export type PayPalWalletContextShippingPreference =
  | (typeof PayPalWalletContextShippingPreference)[keyof typeof PayPalWalletContextShippingPreference]
  | (string & {});

export const payPalWalletContextShippingPreferenceSchema: EnumSchema<PayPalWalletContextShippingPreference> =
  s.enumOf<PayPalWalletContextShippingPreference>(PayPalWalletContextShippingPreference);
