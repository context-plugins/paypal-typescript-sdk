import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type BancontactPaymentObject = {
  name?: string;
  countryCode?: string;
  bic?: string;
  ibanLastChars?: string;
  cardLastDigits?: string;
};

export const bancontactPaymentObjectSchema: Schema<BancontactPaymentObject> =
  s.object<BancontactPaymentObject>({
    name: s.optional(s.string()),
    countryCode: s.optional(s.string()),
    bic: s.optional(s.string()),
    ibanLastChars: s.optional(s.string()),
    cardLastDigits: s.optional(s.string()),
    _keysMap: {
      countryCode: "country_code",
      ibanLastChars: "iban_last_chars",
      cardLastDigits: "card_last_digits",
    },
  });
