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

export type ApplePayRequest = {
  id?: string;
  name?: string;
  emailAddress?: string;
  phoneNumber?: PhoneNumber;
  decryptedToken?: ApplePayDecryptedTokenData;
  storedCredential?: CardStoredCredential;
  vaultId?: string;
  attributes?: ApplePayAttributes;
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
