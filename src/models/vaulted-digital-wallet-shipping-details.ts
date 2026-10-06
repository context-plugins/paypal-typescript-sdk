import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { fulfillmentTypeSchema, type FulfillmentType } from "./fulfillment-type.js";
import {
  phoneNumberWithCountryCodeSchema,
  type PhoneNumberWithCountryCode,
} from "./phone-number-with-country-code.js";
import { shippingNameSchema, type ShippingName } from "./shipping-name.js";

/** The shipping details. */
export type VaultedDigitalWalletShippingDetails = {
  /** The name of the party. */
  name?: ShippingName;
  /**
   * The internationalized email address. Note: Up to 64 characters are allowed before and 255
   * characters are allowed after the \@ sign. However, the generally accepted maximum length for an
   * email address is 254 characters. The pattern verifies that an unquoted \@ sign exists.
   */
  emailAddress?: string;
  /**
   * The phone number, in its canonical international [E.164 numbering plan
   * format](https://www.itu.int/rec/T-REC-E.164/en).
   */
  phoneNumber?: PhoneNumberWithCountryCode;
  /**
   * A classification for the method of purchase fulfillment (e.g shipping, in-store pickup, etc).
   * Either `type` or `options` may be present, but not both.
   */
  type?: FulfillmentType;
  /**
   * The portable international postal address. Maps to
   * [AddressValidationMetadata](https://github.com/googlei18n/libaddressinput/wiki/AddressValidationMetadata)
   * and HTML 5.1 [Autofilling form controls: the autocomplete
   * attribute](https://www.w3.org/TR/html51/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute).
   */
  address?: Address;
};

export const vaultedDigitalWalletShippingDetailsSchema: Schema<VaultedDigitalWalletShippingDetails> =
  s.object<VaultedDigitalWalletShippingDetails>({
    name: s.optional(s.lazy(() => shippingNameSchema)),
    emailAddress: s.optional(s.string()),
    phoneNumber: s.optional(s.lazy(() => phoneNumberWithCountryCodeSchema)),
    type: s.optional(s.lazy(() => fulfillmentTypeSchema)),
    address: s.optional(s.lazy(() => addressSchema)),
    _keysMap: {
      emailAddress: "email_address",
      phoneNumber: "phone_number",
    },
  });
