import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/**
 * A simple postal address with coarse-grained fields. Do not use for an international address. Use
 * for backward compatibility only. Does not contain phone.
 */
export type SimplePostalAddressCoarseGrained = {
  /** The first line of the address. For example, number or street. */
  line1: string;
  /** The second line of the address. For example, suite or apartment number. */
  line2?: string;
  /** The city name. */
  city: string;
  /**
   * The [code](/docs/api/reference/state-codes/) for a US state or the equivalent for other
   * countries. Required for transactions if the address is in one of these countries:
   * [Argentina](/docs/api/reference/state-codes/#argentina),
   * [Brazil](/docs/api/reference/state-codes/#brazil),
   * [Canada](/docs/api/reference/state-codes/#canada),
   * [China](/docs/api/reference/state-codes/#china),
   * [India](/docs/api/reference/state-codes/#india),
   * [Italy](/docs/api/reference/state-codes/#italy),
   * [Japan](/docs/api/reference/state-codes/#japan),
   * [Mexico](/docs/api/reference/state-codes/#mexico),
   * [Thailand](/docs/api/reference/state-codes/#thailand), or [United
   * States](/docs/api/reference/state-codes/#usa). Maximum length is 40 single-byte characters.
   */
  state?: string;
  /**
   * The [two-character ISO 3166-1 code](/docs/integration/direct/rest/country-codes/) that
   * identifies the country or region. Note: The country code for Great Britain is GB and not UK as
   * used in the top-level domain names for that country. Use the `C2` country code for China
   * worldwide for comparable uncontrolled price (CUP) method, bank card, and cross-border
   * transactions.
   */
  countryCode: string;
  /**
   * The postal code, which is the zip code or equivalent. Typically required for countries with a
   * postal code or an equivalent. See [postal code](https://en.wikipedia.org/wiki/Postal_code).
   */
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
