import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { authenticationResponseSchema, type AuthenticationResponse } from "./authentication-response.js";
import { cardBrandSchema, type CardBrand } from "./card-brand.js";
import { cardTypeSchema, type CardType } from "./card-type.js";

export type GooglePayCardResponse = {
  name?: string;
  lastDigits?: string;
  type?: CardType;
  brand?: CardBrand;
  billingAddress?: Address;
  authenticationResult?: AuthenticationResponse;
};

export const googlePayCardResponseSchema: Schema<GooglePayCardResponse> = s.object<GooglePayCardResponse>({
  name: s.optional(s.string()),
  lastDigits: s.optional(s.string()),
  type: s.optional(s.lazy(() => cardTypeSchema)),
  brand: s.optional(s.lazy(() => cardBrandSchema)),
  billingAddress: s.optional(s.lazy(() => addressSchema)),
  authenticationResult: s.optional(s.lazy(() => authenticationResponseSchema)),
  _keysMap: {
    lastDigits: "last_digits",
    billingAddress: "billing_address",
    authenticationResult: "authentication_result",
  },
});
