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

export type CardPaymentTokenEntity = {
  name?: string;
  lastDigits?: string;
  brand?: CardBrand;
  expiry?: string;
  billingAddress?: CardResponseAddress;
  verificationStatus?: CardVerificationStatus;
  verification?: CardVerificationDetails;
  networkTransactionReference?: NetworkTransactionReferenceEntity;
  authenticationResult?: CardAuthenticationResponse;
  binDetails?: BinDetails;
  type?: CardType;
};

export const cardPaymentTokenEntitySchema: Schema<CardPaymentTokenEntity> = s.object<CardPaymentTokenEntity>({
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
