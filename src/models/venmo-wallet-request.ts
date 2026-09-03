import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  venmoWalletAdditionalAttributesSchema,
  type VenmoWalletAdditionalAttributes,
} from "./venmo-wallet-additional-attributes.js";
import {
  venmoWalletExperienceContextSchema,
  type VenmoWalletExperienceContext,
} from "./venmo-wallet-experience-context.js";

export type VenmoWalletRequest = {
  vaultId?: string;
  emailAddress?: string;
  experienceContext?: VenmoWalletExperienceContext;
  attributes?: VenmoWalletAdditionalAttributes;
};

export const venmoWalletRequestSchema: Schema<VenmoWalletRequest> = s.object<VenmoWalletRequest>({
  vaultId: s.optional(s.string()),
  emailAddress: s.optional(s.string()),
  experienceContext: s.optional(s.lazy(() => venmoWalletExperienceContextSchema)),
  attributes: s.optional(s.lazy(() => venmoWalletAdditionalAttributesSchema)),
  _keysMap: {
    vaultId: "vault_id",
    emailAddress: "email_address",
    experienceContext: "experience_context",
  },
});
