import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type PhoneNumberWithCountryCode = {
  countryCode: string;
  nationalNumber: string;
};

export const phoneNumberWithCountryCodeSchema: Schema<PhoneNumberWithCountryCode> =
  s.object<PhoneNumberWithCountryCode>({
    countryCode: s.string(),
    nationalNumber: s.string(),
    _keysMap: {
      countryCode: "country_code",
      nationalNumber: "national_number",
    },
  });
