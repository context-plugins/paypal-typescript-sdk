import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type MyBankPaymentObject = {
  name?: string;
  countryCode?: string;
  bic?: string;
  ibanLastChars?: string;
};

export const myBankPaymentObjectSchema: Schema<MyBankPaymentObject> = s.object<MyBankPaymentObject>({
  name: s.optional(s.string()),
  countryCode: s.optional(s.string()),
  bic: s.optional(s.string()),
  ibanLastChars: s.optional(s.string()),
  _keysMap: {
    countryCode: "country_code",
    ibanLastChars: "iban_last_chars",
  },
});
