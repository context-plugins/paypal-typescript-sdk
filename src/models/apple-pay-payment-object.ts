import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  applePayAttributesResponseSchema,
  type ApplePayAttributesResponse,
} from "./apple-pay-attributes-response.js";
import { applePayCardResponseSchema, type ApplePayCardResponse } from "./apple-pay-card-response.js";
import { cardStoredCredentialSchema, type CardStoredCredential } from "./card-stored-credential.js";
import { phoneNumberSchema, type PhoneNumber } from "./phone-number.js";

/** Information needed to pay using ApplePay. */
export type ApplePayPaymentObject = {
  /**
   * ApplePay transaction identifier, this will be the unique identifier for this transaction
   * provided by Apple. The pattern is defined by an external party and supports Unicode.
   */
  id?: string;
  /**
   * Encrypted ApplePay token, containing card information. This token would be base64encoded. The
   * pattern is defined by an external party and supports Unicode.
   */
  token?: string;
  /** The full name representation like Mr J Smith. */
  name?: string;
  /**
   * The internationalized email address. Note: Up to 64 characters are allowed before and 255
   * characters are allowed after the \@ sign. However, the generally accepted maximum length for an
   * email address is 254 characters. The pattern verifies that an unquoted \@ sign exists.
   */
  emailAddress?: string;
  /**
   * The phone number in its canonical international [E.164 numbering plan
   * format](https://www.itu.int/rec/T-REC-E.164/en).
   */
  phoneNumber?: PhoneNumber;
  /** The Card from Apple Pay Wallet used to fund the payment. */
  card?: ApplePayCardResponse;
  /** Additional attributes associated with the use of Apple Pay. */
  attributes?: ApplePayAttributesResponse;
  /**
   * Provides additional details to process a payment using a `card` that has been stored or is
   * intended to be stored (also referred to as stored_credential or card-on-file). Parameter
   * compatibility: `payment_type=ONE_TIME` is compatible only with `payment_initiator=CUSTOMER`.
   * `usage=FIRST` is compatible only with `payment_initiator=CUSTOMER`.
   * `previous_transaction_reference` or `previous_network_transaction_reference` is compatible only
   * with `payment_initiator=MERCHANT`. Only one of the parameters -
   * `previous_transaction_reference` and `previous_network_transaction_reference` - can be present
   * in the request.
   */
  storedCredential?: CardStoredCredential;
};

export const applePayPaymentObjectSchema: Schema<ApplePayPaymentObject> = s.object<ApplePayPaymentObject>({
  id: s.optional(s.string()),
  token: s.optional(s.string()),
  name: s.optional(s.string()),
  emailAddress: s.optional(s.string()),
  phoneNumber: s.optional(s.lazy(() => phoneNumberSchema)),
  card: s.optional(s.lazy(() => applePayCardResponseSchema)),
  attributes: s.optional(s.lazy(() => applePayAttributesResponseSchema)),
  storedCredential: s.optional(s.lazy(() => cardStoredCredentialSchema)),
  _keysMap: {
    emailAddress: "email_address",
    phoneNumber: "phone_number",
    storedCredential: "stored_credential",
  },
});
