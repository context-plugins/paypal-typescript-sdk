import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { cardBrandSchema, type CardBrand } from "./card-brand.js";
import { cardTypeSchema, type CardType } from "./card-type.js";

/** The payment card used to fund a Google Pay payment. Can be a credit or debit card. */
export type GooglePayCard = {
  /** The card holder's name as it appears on the card. */
  name?: string;
  /** The primary account number (PAN) for the payment card. */
  number?: string;
  /**
   * The year and month, in ISO-8601 `YYYY-MM` date format. See [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6).
   */
  expiry?: string;
  /** The last digits of the payment card. */
  lastDigits?: string;
  /** Type of card. i.e Credit, Debit and so on. */
  type?: CardType;
  /** The card network or brand. Applies to credit, debit, gift, and payment cards. */
  brand?: CardBrand;
  /**
   * The portable international postal address. Maps to
   * [AddressValidationMetadata](https://github.com/googlei18n/libaddressinput/wiki/AddressValidationMetadata)
   * and HTML 5.1 [Autofilling form controls: the autocomplete
   * attribute](https://www.w3.org/TR/html51/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute).
   */
  billingAddress?: Address;
};

export const googlePayCardSchema: Schema<GooglePayCard> = s.object<GooglePayCard>({
  name: s.optional(s.string()),
  number: s.optional(s.string()),
  expiry: s.optional(s.string()),
  lastDigits: s.optional(s.string()),
  type: s.optional(s.lazy(() => cardTypeSchema)),
  brand: s.optional(s.lazy(() => cardBrandSchema)),
  billingAddress: s.optional(s.lazy(() => addressSchema)),
  _keysMap: {
    lastDigits: "last_digits",
    billingAddress: "billing_address",
  },
});
