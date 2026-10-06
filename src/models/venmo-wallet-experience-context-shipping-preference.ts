import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The location from which the shipping address is derived. */
export const VenmoWalletExperienceContextShippingPreference = {
  /** Get the customer-provided shipping address on the PayPal site. */
  GetFromFile: "GET_FROM_FILE",
  /** Redacts the shipping address from the PayPal site. Recommended for digital goods. */
  NoShipping: "NO_SHIPPING",
  /**
   * Get the merchant-provided address. The customer cannot change this address on the PayPal site.
   * If merchant does not pass an address, customer can choose the address on PayPal pages.
   */
  SetProvidedAddress: "SET_PROVIDED_ADDRESS",
} as const;
export type VenmoWalletExperienceContextShippingPreference =
  | (typeof VenmoWalletExperienceContextShippingPreference)[keyof typeof VenmoWalletExperienceContextShippingPreference]
  | (string & {});

export const venmoWalletExperienceContextShippingPreferenceSchema: EnumSchema<VenmoWalletExperienceContextShippingPreference> =
  s.enumOf<VenmoWalletExperienceContextShippingPreference>(VenmoWalletExperienceContextShippingPreference);
