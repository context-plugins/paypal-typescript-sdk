import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { authenticationResponseSchema, type AuthenticationResponse } from "./authentication-response.js";
import { binDetailsSchema, type BinDetails } from "./bin-details.js";
import { cardAttributesResponseSchema, type CardAttributesResponse } from "./card-attributes-response.js";
import { cardBrandSchema, type CardBrand } from "./card-brand.js";
import { cardFromRequestSchema, type CardFromRequest } from "./card-from-request.js";
import { cardStoredCredentialSchema, type CardStoredCredential } from "./card-stored-credential.js";
import { cardTypeSchema, type CardType } from "./card-type.js";

/** The payment card to use to fund a payment. Card can be a credit or debit card. */
export type CardResponse = {
  /** The card holder's name as it appears on the card. */
  name?: string;
  /** The last digits of the payment card. */
  lastDigits?: string;
  /** The card network or brand. Applies to credit, debit, gift, and payment cards. */
  brand?: CardBrand;
  /** Array of brands or networks associated with the card. */
  availableNetworks?: CardBrand[];
  /** Type of card. i.e Credit, Debit and so on. */
  type?: CardType;
  /** Results of Authentication such as 3D Secure. */
  authenticationResult?: AuthenticationResponse;
  /** Additional attributes associated with the use of this card. */
  attributes?: CardAttributesResponse;
  /** Representation of card details as received in the request. */
  fromRequest?: CardFromRequest;
  /**
   * The year and month, in ISO-8601 `YYYY-MM` date format. See [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6).
   */
  expiry?: string;
  /** Bank Identification Number (BIN) details used to fund a payment. */
  binDetails?: BinDetails;
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

export const cardResponseSchema: Schema<CardResponse> = s.object<CardResponse>({
  name: s.optional(s.string()),
  lastDigits: s.optional(s.string()),
  brand: s.optional(s.lazy(() => cardBrandSchema)),
  availableNetworks: s.optional(s.array(s.lazy(() => cardBrandSchema))),
  type: s.optional(s.lazy(() => cardTypeSchema)),
  authenticationResult: s.optional(s.lazy(() => authenticationResponseSchema)),
  attributes: s.optional(s.lazy(() => cardAttributesResponseSchema)),
  fromRequest: s.optional(s.lazy(() => cardFromRequestSchema)),
  expiry: s.optional(s.string()),
  binDetails: s.optional(s.lazy(() => binDetailsSchema)),
  storedCredential: s.optional(s.lazy(() => cardStoredCredentialSchema)),
  _keysMap: {
    lastDigits: "last_digits",
    availableNetworks: "available_networks",
    authenticationResult: "authentication_result",
    fromRequest: "from_request",
    binDetails: "bin_details",
    storedCredential: "stored_credential",
  },
});
