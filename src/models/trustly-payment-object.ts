import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type TrustlyPaymentObject = {
  name?: string;
  countryCode?: string;
  email?: string;
  bic?: string;
  ibanLastChars?: string;
};

export const trustlyPaymentObjectSchema: Schema<TrustlyPaymentObject> = s.object<TrustlyPaymentObject>({
  name: s.optional(s.string()),
  countryCode: s.optional(s.string()),
  email: s.optional(s.string()),
  bic: s.optional(s.string()),
  ibanLastChars: s.optional(s.string()),
  _keysMap: {
    countryCode: "country_code",
    ibanLastChars: "iban_last_chars",
  },
});
