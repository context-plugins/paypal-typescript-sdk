import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const ExperienceContextShippingPreference = {
  GetFromFile: "GET_FROM_FILE",
  NoShipping: "NO_SHIPPING",
  SetProvidedAddress: "SET_PROVIDED_ADDRESS",
} as const;
export type ExperienceContextShippingPreference =
  | (typeof ExperienceContextShippingPreference)[keyof typeof ExperienceContextShippingPreference]
  | (string & {});

export const experienceContextShippingPreferenceSchema: EnumSchema<ExperienceContextShippingPreference> =
  s.enumOf<ExperienceContextShippingPreference>(ExperienceContextShippingPreference);
