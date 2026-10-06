import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";

/** The payment card used to fund the payment. Card can be a credit or debit card. */
export type CardResponseWithBillingAddress = {
  /** The card holder's name as it appears on the card. */
  name?: string;
  /**
   * The portable international postal address. Maps to
   * [AddressValidationMetadata](https://github.com/googlei18n/libaddressinput/wiki/AddressValidationMetadata)
   * and HTML 5.1 [Autofilling form controls: the autocomplete
   * attribute](https://www.w3.org/TR/html51/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute).
   */
  billingAddress?: Address;
  /**
   * The year and month, in ISO-8601 `YYYY-MM` date format. See [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6).
   */
  expiry?: string;
  /**
   * The [three-character ISO-4217 currency code](/api/rest/reference/currency-codes/) that
   * identifies the currency.
   */
  currencyCode?: string;
};

export const cardResponseWithBillingAddressSchema: Schema<CardResponseWithBillingAddress> =
  s.object<CardResponseWithBillingAddress>({
    name: s.optional(s.string()),
    billingAddress: s.optional(s.lazy(() => addressSchema)),
    expiry: s.optional(s.string()),
    currencyCode: s.optional(s.string()),
    _keysMap: {
      billingAddress: "billing_address",
      currencyCode: "currency_code",
    },
  });
