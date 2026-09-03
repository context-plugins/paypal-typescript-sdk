import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type IDealPaymentObject = {
  name?: string;
  countryCode?: string;
  bic?: string;
  ibanLastChars?: string;
};

export const iDealPaymentObjectSchema: Schema<IDealPaymentObject> = s.object<IDealPaymentObject>({
  name: s.optional(s.string()),
  countryCode: s.optional(s.string()),
  bic: s.optional(s.string()),
  ibanLastChars: s.optional(s.string()),
  _keysMap: {
    countryCode: "country_code",
    ibanLastChars: "iban_last_chars",
  },
});
