import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  applePayAttributesResponseSchema,
  type ApplePayAttributesResponse,
} from "./apple-pay-attributes-response.js";
import { applePayCardResponseSchema, type ApplePayCardResponse } from "./apple-pay-card-response.js";
import { cardStoredCredentialSchema, type CardStoredCredential } from "./card-stored-credential.js";
import { phoneNumberSchema, type PhoneNumber } from "./phone-number.js";

export type ApplePayPaymentObject = {
  id?: string;
  token?: string;
  name?: string;
  emailAddress?: string;
  phoneNumber?: PhoneNumber;
  card?: ApplePayCardResponse;
  attributes?: ApplePayAttributesResponse;
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
