import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { applePayAttributesSchema, type ApplePayAttributes } from "./apple-pay-attributes.js";
import {
  applePayDecryptedTokenDataSchema,
  type ApplePayDecryptedTokenData,
} from "./apple-pay-decrypted-token-data.js";
import {
  applePayExperienceContextSchema,
  type ApplePayExperienceContext,
} from "./apple-pay-experience-context.js";
import { cardStoredCredentialSchema, type CardStoredCredential } from "./card-stored-credential.js";
import { phoneNumberSchema, type PhoneNumber } from "./phone-number.js";

/** Information needed to pay using ApplePay. */
export type ApplePayRequest = {
  /**
   * ApplePay transaction identifier, this will be the unique identifier for this transaction
   * provided by Apple. The pattern is defined by an external party and supports Unicode.
   */
  id?: string;
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
  /** Information about the Payment data obtained by decrypting Apple Pay token. */
  decryptedToken?: ApplePayDecryptedTokenData;
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
  /**
   * The PayPal-generated ID for the vaulted payment source. This ID should be stored on the
   * merchant's server so the saved payment source can be used for future transactions.
   */
  vaultId?: string;
  /** Additional attributes associated with apple pay. */
  attributes?: ApplePayAttributes;
  /** Customizes the payer experience during the approval process for the payment. */
  experienceContext?: ApplePayExperienceContext;
};

export const applePayRequestSchema: Schema<ApplePayRequest> = s.object<ApplePayRequest>({
  id: s.optional(s.string()),
  name: s.optional(s.string()),
  emailAddress: s.optional(s.string()),
  phoneNumber: s.optional(s.lazy(() => phoneNumberSchema)),
  decryptedToken: s.optional(s.lazy(() => applePayDecryptedTokenDataSchema)),
  storedCredential: s.optional(s.lazy(() => cardStoredCredentialSchema)),
  vaultId: s.optional(s.string()),
  attributes: s.optional(s.lazy(() => applePayAttributesSchema)),
  experienceContext: s.optional(s.lazy(() => applePayExperienceContextSchema)),
  _keysMap: {
    emailAddress: "email_address",
    phoneNumber: "phone_number",
    decryptedToken: "decrypted_token",
    storedCredential: "stored_credential",
    vaultId: "vault_id",
    experienceContext: "experience_context",
  },
});
