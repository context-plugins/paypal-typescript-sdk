import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { cardAttributesSchema, type CardAttributes } from "./card-attributes.js";
import { cardExperienceContextSchema, type CardExperienceContext } from "./card-experience-context.js";
import { cardStoredCredentialSchema, type CardStoredCredential } from "./card-stored-credential.js";
import { networkTokenSchema, type NetworkToken } from "./network-token.js";

export type CardRequest = {
  name?: string;
  number?: string;
  expiry?: string;
  securityCode?: string;
  billingAddress?: Address;
  attributes?: CardAttributes;
  vaultId?: string;
  singleUseToken?: string;
  storedCredential?: CardStoredCredential;
  networkToken?: NetworkToken;
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
