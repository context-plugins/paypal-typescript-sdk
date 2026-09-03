import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { cardBrandSchema, type CardBrand } from "./card-brand.js";
import {
  vaultCardExperienceContextSchema,
  type VaultCardExperienceContext,
} from "./vault-card-experience-context.js";
import {
  vaultCardVerificationMethodSchema,
  type VaultCardVerificationMethod,
} from "./vault-card-verification-method.js";

export type SetupTokenRequestCard = {
  name?: string;
  number?: string;
  expiry?: string;
  securityCode?: string;
  brand?: CardBrand;
  billingAddress?: Address;
  verificationMethod?: VaultCardVerificationMethod;
  experienceContext?: VaultCardExperienceContext;
};

export const setupTokenRequestCardSchema: Schema<SetupTokenRequestCard> = s.object<SetupTokenRequestCard>({
  name: s.optional(s.string()),
  number: s.optional(s.string()),
  expiry: s.optional(s.string()),
  securityCode: s.optional(s.string()),
  brand: s.optional(s.lazy(() => cardBrandSchema)),
  billingAddress: s.optional(s.lazy(() => addressSchema)),
  verificationMethod: s.optional(s.lazy(() => vaultCardVerificationMethodSchema)),
  experienceContext: s.optional(s.lazy(() => vaultCardExperienceContextSchema)),
  _keysMap: {
    securityCode: "security_code",
    billingAddress: "billing_address",
    verificationMethod: "verification_method",
    experienceContext: "experience_context",
  },
});
