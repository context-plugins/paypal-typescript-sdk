import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type SimplePostalAddressCoarseGrained = {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  countryCode: string;
  postalCode?: string;
};

export const simplePostalAddressCoarseGrainedSchema: Schema<SimplePostalAddressCoarseGrained> =
  s.object<SimplePostalAddressCoarseGrained>({
    line1: s.string(),
    line2: s.optional(s.string()),
    city: s.string(),
    state: s.optional(s.string()),
    countryCode: s.string(),
    postalCode: s.optional(s.string()),
    _keysMap: {
      countryCode: "country_code",
      postalCode: "postal_code",
    },
  });
