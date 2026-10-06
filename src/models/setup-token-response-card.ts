import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { binDetailsSchema, type BinDetails } from "./bin-details.js";
import {
  cardAuthenticationResponseSchema,
  type CardAuthenticationResponse,
} from "./card-authentication-response.js";
import { cardBrandSchema, type CardBrand } from "./card-brand.js";
import { cardResponseAddressSchema, type CardResponseAddress } from "./card-response-address.js";
import { cardTypeSchema, type CardType } from "./card-type.js";
import { cardVerificationDetailsSchema, type CardVerificationDetails } from "./card-verification-details.js";
import { cardVerificationStatusSchema, type CardVerificationStatus } from "./card-verification-status.js";
import {
  networkTransactionReferenceEntitySchema,
  type NetworkTransactionReferenceEntity,
} from "./network-transaction-reference-entity.js";

export type SetupTokenResponseCard = {
  /** The card holder's name as it appears on the card. */
  name?: string;
  /** The last digits of the payment card. */
  lastDigits?: string;
  /** The card network or brand. Applies to credit, debit, gift, and payment cards. */
  brand?: CardBrand;
  /**
   * The year and month, in ISO-8601 `YYYY-MM` date format. See [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6).
   */
  expiry?: string;
  /** Address request details. */
  billingAddress?: CardResponseAddress;
  /** Verification status of Card. */
  verificationStatus?: CardVerificationStatus;
  /** Card Verification details including the authorization details and 3D SECURE details. */
  verification?: CardVerificationDetails;
  /** Previous network transaction reference including id in response. */
  networkTransactionReference?: NetworkTransactionReferenceEntity;
  /** Results of Authentication such as 3D Secure. */
  authenticationResult?: CardAuthenticationResponse;
  /** Bank Identification Number (BIN) details used to fund a payment. */
  binDetails?: BinDetails;
  /** Type of card. i.e Credit, Debit and so on. */
  type?: CardType;
};

export const setupTokenResponseCardSchema: Schema<SetupTokenResponseCard> = s.object<SetupTokenResponseCard>({
  name: s.optional(s.string()),
  lastDigits: s.optional(s.string()),
  brand: s.optional(s.lazy(() => cardBrandSchema)),
  expiry: s.optional(s.string()),
  billingAddress: s.optional(s.lazy(() => cardResponseAddressSchema)),
  verificationStatus: s.optional(s.lazy(() => cardVerificationStatusSchema)),
  verification: s.optional(s.lazy(() => cardVerificationDetailsSchema)),
  networkTransactionReference: s.optional(s.lazy(() => networkTransactionReferenceEntitySchema)),
  authenticationResult: s.optional(s.lazy(() => cardAuthenticationResponseSchema)),
  binDetails: s.optional(s.lazy(() => binDetailsSchema)),
  type: s.optional(s.lazy(() => cardTypeSchema)),
  _keysMap: {
    lastDigits: "last_digits",
    billingAddress: "billing_address",
    verificationStatus: "verification_status",
    networkTransactionReference: "network_transaction_reference",
    authenticationResult: "authentication_result",
    binDetails: "bin_details",
  },
});
