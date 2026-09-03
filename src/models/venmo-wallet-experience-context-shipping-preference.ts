import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const VenmoWalletExperienceContextShippingPreference = {
  GetFromFile: "GET_FROM_FILE",
  NoShipping: "NO_SHIPPING",
  SetProvidedAddress: "SET_PROVIDED_ADDRESS",
} as const;
export type VenmoWalletExperienceContextShippingPreference =
  | (typeof VenmoWalletExperienceContextShippingPreference)[keyof typeof VenmoWalletExperienceContextShippingPreference]
  | (string & {});

export const venmoWalletExperienceContextShippingPreferenceSchema: EnumSchema<VenmoWalletExperienceContextShippingPreference> =
  s.enumOf<VenmoWalletExperienceContextShippingPreference>(VenmoWalletExperienceContextShippingPreference);
