import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Information used to pay Bancontact. */
export type BancontactPaymentObject = {
  /** The full name representation like Mr J Smith. */
  name?: string;
  /**
   * The [two-character ISO 3166-1 code](/api/rest/reference/country-codes/) that identifies the
   * country or region. Note: The country code for Great Britain is GB and not UK as used in the
   * top-level domain names for that country. Use the `C2` country code for China worldwide for
   * comparable uncontrolled price (CUP) method, bank card, and cross-border transactions.
   */
  countryCode?: string;
  /**
   * The business identification code (BIC). In payments systems, a BIC is used to identify a
   * specific business, most commonly a bank.
   */
  bic?: string;
  /** The last characters of the IBAN used to pay. */
  ibanLastChars?: string;
  /** The last digits of the card used to fund the Bancontact payment. */
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
