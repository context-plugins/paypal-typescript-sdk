import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Address request details. */
export type CardResponseAddress = {
  /**
   * The first line of the address, such as number and street, for example, `173 Drury Lane`. Needed
   * for data entry, and Compliance and Risk checks. This field needs to pass the full address.
   */
  addressLine1?: string;
  /** The second line of the address, for example, a suite or apartment number. */
  addressLine2?: string;
  /** A city, town, or village. Smaller than `admin_area_level_1`. */
  adminArea2?: string;
  /**
   * The highest-level sub-division in a country, which is usually a province, state, or ISO-3166-2
   * subdivision. This data is formatted for postal delivery, for example, `CA` and not
   * `California`. Value, by country, is: UK. A county. US. A state. Canada. A province. Japan. A
   * prefecture. Switzerland. A *kanton*.
   */
  adminArea1?: string;
  /**
   * The postal code, which is the ZIP code or equivalent. Typically required for countries with a
   * postal code or an equivalent. See [postal code](https://en.wikipedia.org/wiki/Postal_code).
   */
  postalCode?: string;
  /**
   * The [2-character ISO 3166-1 code](/api/rest/reference/country-codes/) that identifies the
   * country or region. Note: The country code for Great Britain is GB and not UK as used in the
   * top-level domain names for that country. Use the `C2` country code for China worldwide for
   * comparable uncontrolled price (CUP) method, bank card, and cross-border transactions.
   */
  countryCode: string;
  /** The resource ID of the address. */
  id?: string;
};

export const cardResponseAddressSchema: Schema<CardResponseAddress> = s.object<CardResponseAddress>({
  addressLine1: s.optional(s.string()),
  addressLine2: s.optional(s.string()),
  adminArea2: s.optional(s.string()),
  adminArea1: s.optional(s.string()),
  postalCode: s.optional(s.string()),
  countryCode: s.string(),
  id: s.optional(s.string()),
  _keysMap: {
    addressLine1: "address_line_1",
    addressLine2: "address_line_2",
    adminArea2: "admin_area_2",
    adminArea1: "admin_area_1",
    postalCode: "postal_code",
    countryCode: "country_code",
  },
});
