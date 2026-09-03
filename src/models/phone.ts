import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type Phone = {
  countryCode: string;
  nationalNumber: string;
  extensionNumber?: string;
};

export const phoneSchema: Schema<Phone> = s.object<Phone>({
  countryCode: s.string(),
  nationalNumber: s.string(),
  extensionNumber: s.optional(s.string()),
  _keysMap: {
    countryCode: "country_code",
    nationalNumber: "national_number",
    extensionNumber: "extension_number",
  },
});
