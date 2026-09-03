import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  experienceContextShippingPreferenceSchema,
  type ExperienceContextShippingPreference,
} from "./experience-context-shipping-preference.js";
import { vaultInstructionActionSchema, type VaultInstructionAction } from "./vault-instruction-action.js";
import { vaultUserActionSchema, type VaultUserAction } from "./vault-user-action.js";

export type VenmoExperienceContext = {
  brandName?: string;
  shippingPreference?: ExperienceContextShippingPreference;
  vaultInstruction?: VaultInstructionAction;
  userAction?: VaultUserAction;
};

export const venmoExperienceContextSchema: Schema<VenmoExperienceContext> = s.object<VenmoExperienceContext>({
  brandName: s.optional(s.string()),
  shippingPreference: s.optional(s.lazy(() => experienceContextShippingPreferenceSchema)),
  vaultInstruction: s.optional(s.lazy(() => vaultInstructionActionSchema)),
  userAction: s.optional(s.lazy(() => vaultUserActionSchema)),
  _keysMap: {
    brandName: "brand_name",
    shippingPreference: "shipping_preference",
    vaultInstruction: "vault_instruction",
    userAction: "user_action",
  },
});
