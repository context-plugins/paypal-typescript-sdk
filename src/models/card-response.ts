import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { authenticationResponseSchema, type AuthenticationResponse } from "./authentication-response.js";
import { binDetailsSchema, type BinDetails } from "./bin-details.js";
import { cardAttributesResponseSchema, type CardAttributesResponse } from "./card-attributes-response.js";
import { cardBrandSchema, type CardBrand } from "./card-brand.js";
import { cardFromRequestSchema, type CardFromRequest } from "./card-from-request.js";
import { cardStoredCredentialSchema, type CardStoredCredential } from "./card-stored-credential.js";
import { cardTypeSchema, type CardType } from "./card-type.js";

export type CardResponse = {
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
