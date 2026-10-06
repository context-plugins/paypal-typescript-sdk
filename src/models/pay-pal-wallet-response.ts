import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { experienceStatusSchema, type ExperienceStatus } from "./experience-status.js";
import { nameSchema, type Name } from "./name.js";
import {
  payPalWalletAccountVerificationStatusSchema,
  type PayPalWalletAccountVerificationStatus,
} from "./pay-pal-wallet-account-verification-status.js";
import {
  payPalWalletAttributesResponseSchema,
  type PayPalWalletAttributesResponse,
} from "./pay-pal-wallet-attributes-response.js";
import {
  payPalWalletStoredCredentialSchema,
  type PayPalWalletStoredCredential,
} from "./pay-pal-wallet-stored-credential.js";
import { phoneNumberSchema, type PhoneNumber } from "./phone-number.js";
import { phoneTypeSchema, type PhoneType } from "./phone-type.js";
import { taxInfoSchema, type TaxInfo } from "./tax-info.js";

/** The PayPal Wallet response. */
export type PayPalWalletResponse = {
  /**
   * The internationalized email address. Note: Up to 64 characters are allowed before and 255
   * characters are allowed after the \@ sign. However, the generally accepted maximum length for an
   * email address is 254 characters. The pattern verifies that an unquoted \@ sign exists.
   */
  emailAddress?: string;
  /**
   * The PayPal payer ID, which is a masked version of the PayPal account number intended for use
   * with third parties. The account number is reversibly encrypted and a proprietary variant of
   * Base32 is used to encode the result.
   */
  accountId?: string;
  /**
   * The account status indicates whether the buyer has verified the financial details associated
   * with their PayPal account.
   */
  accountStatus?: PayPalWalletAccountVerificationStatus;
  /** The name of the party. */
  name?: Name;
  /** The phone type. */
  phoneType?: PhoneType;
  /**
   * The phone number in its canonical international [E.164 numbering plan
   * format](https://www.itu.int/rec/T-REC-E.164/en).
   */
  phoneNumber?: PhoneNumber;
  /**
   * The stand-alone date, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). To represent special legal values,
   * such as a date of birth, you should use dates with no associated time or time-zone data.
   * Whenever possible, use the standard `date_time` type. This regular expression does not validate
   * all dates. For example, February 31 is valid and nothing is known about leap years.
   */
  birthDate?: string;
  /** The business name of the PayPal account holder (populated for business accounts only) */
  businessName?: string;
  /**
   * The tax ID of the customer. The customer is also known as the payer. Both `tax_id` and
   * `tax_id_type` are required.
   */
  taxInfo?: TaxInfo;
  /**
   * The portable international postal address. Maps to
   * [AddressValidationMetadata](https://github.com/googlei18n/libaddressinput/wiki/AddressValidationMetadata)
   * and HTML 5.1 [Autofilling form controls: the autocomplete
   * attribute](https://www.w3.org/TR/html51/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute).
   */
  address?: Address;
  /** Additional attributes associated with the use of a PayPal Wallet. */
  attributes?: PayPalWalletAttributesResponse;
  /**
   * Provides additional details to process a payment using the PayPal wallet billing agreement or a
   * vaulted payment method that has been stored or is intended to be stored.
   */
  storedCredential?: PayPalWalletStoredCredential;
  /**
   * This field indicates the status of PayPal's Checkout experience throughout the order lifecycle.
   * The values reflect the current stage of the checkout process.
   */
  experienceStatus?: ExperienceStatus;
};

export const payPalWalletResponseSchema: Schema<PayPalWalletResponse> = s.object<PayPalWalletResponse>({
  emailAddress: s.optional(s.string()),
  accountId: s.optional(s.string()),
  accountStatus: s.optional(s.lazy(() => payPalWalletAccountVerificationStatusSchema)),
  name: s.optional(s.lazy(() => nameSchema)),
  phoneType: s.optional(s.lazy(() => phoneTypeSchema)),
  phoneNumber: s.optional(s.lazy(() => phoneNumberSchema)),
  birthDate: s.optional(s.string()),
  businessName: s.optional(s.string()),
  taxInfo: s.optional(s.lazy(() => taxInfoSchema)),
  address: s.optional(s.lazy(() => addressSchema)),
  attributes: s.optional(s.lazy(() => payPalWalletAttributesResponseSchema)),
  storedCredential: s.optional(s.lazy(() => payPalWalletStoredCredentialSchema)),
  experienceStatus: s.optional(s.lazy(() => experienceStatusSchema)),
  _keysMap: {
    emailAddress: "email_address",
    accountId: "account_id",
    accountStatus: "account_status",
    phoneType: "phone_type",
    phoneNumber: "phone_number",
    birthDate: "birth_date",
    businessName: "business_name",
    taxInfo: "tax_info",
    storedCredential: "stored_credential",
    experienceStatus: "experience_status",
  },
});
