import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { cardAttributesSchema, type CardAttributes } from "./card-attributes.js";
import { cardExperienceContextSchema, type CardExperienceContext } from "./card-experience-context.js";
import { cardStoredCredentialSchema, type CardStoredCredential } from "./card-stored-credential.js";
import { networkTokenSchema, type NetworkToken } from "./network-token.js";

/**
 * The payment card to use to fund a payment. Can be a credit or debit card. Note: Passing card
 * number, cvv and expiry directly via the API requires PCI SAQ D compliance. *PayPal offers a
 * mechanism by which you do not have to take on the PCI SAQ D burden by using hosted fields - refer
 * to this Integration Guide*.
 */
export type CardRequest = {
  /** The card holder's name as it appears on the card. */
  name?: string;
  /** The primary account number (PAN) for the payment card. */
  number?: string;
  /**
   * The year and month, in ISO-8601 `YYYY-MM` date format. See [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6).
   */
  expiry?: string;
  /**
   * The three- or four-digit security code of the card. Also known as the CVV, CVC, CVN, CVE, or
   * CID. This parameter cannot be present in the request when `payment_initiator=MERCHANT`.
   */
  securityCode?: string;
  /**
   * The portable international postal address. Maps to
   * [AddressValidationMetadata](https://github.com/googlei18n/libaddressinput/wiki/AddressValidationMetadata)
   * and HTML 5.1 [Autofilling form controls: the autocomplete
   * attribute](https://www.w3.org/TR/html51/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute).
   */
  billingAddress?: Address;
  /** Additional attributes associated with the use of this card. */
  attributes?: CardAttributes;
  /**
   * The PayPal-generated ID for the vaulted payment source. This ID should be stored on the
   * merchant's server so the saved payment source can be used for future transactions.
   */
  vaultId?: string;
  /**
   * The PayPal-generated, short-lived, one-time-use token, used to communicate payment information
   * to PayPal for transaction processing.
   */
  singleUseToken?: string;
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
  /** The Third Party Network token used to fund a payment. */
  networkToken?: NetworkToken;
  /** Customizes the payer experience during the 3DS Approval for payment. */
  experienceContext?: CardExperienceContext;
};

export const cardRequestSchema: Schema<CardRequest> = s.object<CardRequest>({
  name: s.optional(s.string()),
  number: s.optional(s.string()),
  expiry: s.optional(s.string()),
  securityCode: s.optional(s.string()),
  billingAddress: s.optional(s.lazy(() => addressSchema)),
  attributes: s.optional(s.lazy(() => cardAttributesSchema)),
  vaultId: s.optional(s.string()),
  singleUseToken: s.optional(s.string()),
  storedCredential: s.optional(s.lazy(() => cardStoredCredentialSchema)),
  networkToken: s.optional(s.lazy(() => networkTokenSchema)),
  experienceContext: s.optional(s.lazy(() => cardExperienceContextSchema)),
  _keysMap: {
    securityCode: "security_code",
    billingAddress: "billing_address",
    vaultId: "vault_id",
    singleUseToken: "single_use_token",
    storedCredential: "stored_credential",
    networkToken: "network_token",
    experienceContext: "experience_context",
  },
});
