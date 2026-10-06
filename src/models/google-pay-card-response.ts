import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { authenticationResponseSchema, type AuthenticationResponse } from "./authentication-response.js";
import { cardBrandSchema, type CardBrand } from "./card-brand.js";
import { cardTypeSchema, type CardType } from "./card-type.js";

/** The payment card to use to fund a Google Pay payment response. Can be a credit or debit card. */
export type GooglePayCardResponse = {
  /** The card holder's name as it appears on the card. */
  name?: string;
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
  /** Results of Authentication such as 3D Secure. */
  authenticationResult?: AuthenticationResponse;
};

export const googlePayCardResponseSchema: Schema<GooglePayCardResponse> = s.object<GooglePayCardResponse>({
  name: s.optional(s.string()),
  lastDigits: s.optional(s.string()),
  type: s.optional(s.lazy(() => cardTypeSchema)),
  brand: s.optional(s.lazy(() => cardBrandSchema)),
  billingAddress: s.optional(s.lazy(() => addressSchema)),
  authenticationResult: s.optional(s.lazy(() => authenticationResponseSchema)),
  _keysMap: {
    lastDigits: "last_digits",
    billingAddress: "billing_address",
    authenticationResult: "authentication_result",
  },
});
