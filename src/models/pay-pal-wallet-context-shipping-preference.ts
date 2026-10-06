import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The location from which the shipping address is derived. */
export const PayPalWalletContextShippingPreference = {
  /** Get the customer-provided shipping address on the PayPal site. */
  GetFromFile: "GET_FROM_FILE",
  /**
   * Removes the shipping address information from the API response and the Paypal site. However,
   * the shipping.phone_number and shipping.email_address fields will still be returned to allow for
   * digital goods delivery.
   */
  NoShipping: "NO_SHIPPING",
  /**
   * Get the merchant-provided address. The customer cannot change this address on the PayPal site.
   * If merchant does not pass an address, customer can choose the address on PayPal pages.
   */
  SetProvidedAddress: "SET_PROVIDED_ADDRESS",
} as const;
export type PayPalWalletContextShippingPreference =
  | (typeof PayPalWalletContextShippingPreference)[keyof typeof PayPalWalletContextShippingPreference]
  | (string & {});

export const payPalWalletContextShippingPreferenceSchema: EnumSchema<PayPalWalletContextShippingPreference> =
  s.enumOf<PayPalWalletContextShippingPreference>(PayPalWalletContextShippingPreference);
