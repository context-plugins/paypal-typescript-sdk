import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type PhoneNumberWithOptionalCountryCode = {
  countryCode?: string;
  nationalNumber: string;
};

export const phoneNumberWithOptionalCountryCodeSchema: Schema<PhoneNumberWithOptionalCountryCode> =
  s.object<PhoneNumberWithOptionalCountryCode>({
    countryCode: s.optional(s.string()),
    nationalNumber: s.string(),
    _keysMap: {
      countryCode: "country_code",
      nationalNumber: "national_number",
    },
  });
