import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Bank Identification Number (BIN) details used to fund a payment. */
export type BinDetails = {
  /**
   * The Bank Identification Number (BIN) signifies the number that is being used to identify the
   * granular level details (except the PII information) of the card.
   */
  bin?: string;
  /** The issuer of the card instrument. */
  issuingBank?: string;
  /**
   * The [two-character ISO 3166-1 code](/api/rest/reference/country-codes/) that identifies the
   * country or region. Note: The country code for Great Britain is GB and not UK as used in the
   * top-level domain names for that country. Use the `C2` country code for China worldwide for
   * comparable uncontrolled price (CUP) method, bank card, and cross-border transactions.
   */
  binCountryCode?: string;
  /**
   * The type of card product assigned to the BIN by the issuer. These values are defined by the
   * issuer and may change over time. Some examples include: PREPAID_GIFT, CONSUMER, CORPORATE.
   */
  products?: string[];
};

export const binDetailsSchema: Schema<BinDetails> = s.object<BinDetails>({
  bin: s.optional(s.string()),
  issuingBank: s.optional(s.string()),
  binCountryCode: s.optional(s.string()),
  products: s.optional(s.array(s.string())),
  _keysMap: {
    issuingBank: "issuing_bank",
    binCountryCode: "bin_country_code",
  },
});
