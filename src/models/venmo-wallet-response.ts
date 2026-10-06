import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { nameSchema, type Name } from "./name.js";
import { phoneNumberSchema, type PhoneNumber } from "./phone-number.js";
import { ReturnFlow, returnFlowSchema } from "./return-flow.js";
import {
  venmoWalletAttributesResponseSchema,
  type VenmoWalletAttributesResponse,
} from "./venmo-wallet-attributes-response.js";

/** Venmo wallet response. */
export type VenmoWalletResponse = {
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
  /** The Venmo user name chosen by the user, also know as a Venmo handle. */
  userName?: string;
  /** The name of the party. */
  name?: Name;
  /**
   * The phone number in its canonical international [E.164 numbering plan
   * format](https://www.itu.int/rec/T-REC-E.164/en).
   */
  phoneNumber?: PhoneNumber;
  /**
   * The portable international postal address. Maps to
   * [AddressValidationMetadata](https://github.com/googlei18n/libaddressinput/wiki/AddressValidationMetadata)
   * and HTML 5.1 [Autofilling form controls: the autocomplete
   * attribute](https://www.w3.org/TR/html51/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute).
   */
  address?: Address;
  /**
   * Merchant preference on how the buyer can navigate back to merchant website post approving the
   * transaction on the Venmo App.
   *
   * @default ReturnFlow.Auto
   */
  returnFlow?: ReturnFlow;
  /** Additional attributes associated with the use of a Venmo Wallet. */
  attributes?: VenmoWalletAttributesResponse;
};

export const venmoWalletResponseSchema: Schema<VenmoWalletResponse> = s.object<VenmoWalletResponse>({
  emailAddress: s.optional(s.string()),
  accountId: s.optional(s.string()),
  userName: s.optional(s.string()),
  name: s.optional(s.lazy(() => nameSchema)),
  phoneNumber: s.optional(s.lazy(() => phoneNumberSchema)),
  address: s.optional(s.lazy(() => addressSchema)),
  returnFlow: s.defaulted(returnFlowSchema, ReturnFlow.Auto),
  attributes: s.optional(s.lazy(() => venmoWalletAttributesResponseSchema)),
  _keysMap: {
    emailAddress: "email_address",
    accountId: "account_id",
    userName: "user_name",
    phoneNumber: "phone_number",
    returnFlow: "return_flow",
  },
});
