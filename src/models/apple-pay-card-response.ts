import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { authenticationResponseSchema, type AuthenticationResponse } from "./authentication-response.js";
import { binDetailsSchema, type BinDetails } from "./bin-details.js";
import { cardAttributesResponseSchema, type CardAttributesResponse } from "./card-attributes-response.js";
import { cardBrandSchema, type CardBrand } from "./card-brand.js";
import { cardFromRequestSchema, type CardFromRequest } from "./card-from-request.js";
import { cardStoredCredentialSchema, type CardStoredCredential } from "./card-stored-credential.js";
import { cardTypeSchema, type CardType } from "./card-type.js";

export type ApplePayCardResponse = {
  name?: string;
  lastDigits?: string;
  brand?: CardBrand;
  availableNetworks?: CardBrand[];
  type?: CardType;
  authenticationResult?: AuthenticationResponse;
  attributes?: CardAttributesResponse;
  fromRequest?: CardFromRequest;
  expiry?: string;
  binDetails?: BinDetails;
  storedCredential?: CardStoredCredential;
  billingAddress?: Address;
  countryCode?: string;
};

export const applePayCardResponseSchema: Schema<ApplePayCardResponse> = s.object<ApplePayCardResponse>({
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
  billingAddress: s.optional(s.lazy(() => addressSchema)),
  countryCode: s.optional(s.string()),
  _keysMap: {
    lastDigits: "last_digits",
    availableNetworks: "available_networks",
    authenticationResult: "authentication_result",
    fromRequest: "from_request",
    binDetails: "bin_details",
    storedCredential: "stored_credential",
    billingAddress: "billing_address",
    countryCode: "country_code",
  },
});
