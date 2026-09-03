import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { appSwitchContextSchema, type AppSwitchContext } from "./app-switch-context.js";
import {
  experienceContextShippingPreferenceSchema,
  type ExperienceContextShippingPreference,
} from "./experience-context-shipping-preference.js";
import { vaultInstructionActionSchema, type VaultInstructionAction } from "./vault-instruction-action.js";
import { vaultUserActionSchema, type VaultUserAction } from "./vault-user-action.js";

export type VaultExperienceContext = {
  brandName?: string;
  locale?: string;
  returnUrl?: string;
  cancelUrl?: string;
  shippingPreference?: ExperienceContextShippingPreference;
  vaultInstruction?: VaultInstructionAction;
  appSwitchContext?: AppSwitchContext;
  userAction?: VaultUserAction;
};

export const vaultExperienceContextSchema: Schema<VaultExperienceContext> = s.object<VaultExperienceContext>({
  brandName: s.optional(s.string()),
  locale: s.optional(s.string()),
  returnUrl: s.optional(s.string()),
  cancelUrl: s.optional(s.string()),
  shippingPreference: s.optional(s.lazy(() => experienceContextShippingPreferenceSchema)),
  vaultInstruction: s.optional(s.lazy(() => vaultInstructionActionSchema)),
  appSwitchContext: s.optional(s.lazy(() => appSwitchContextSchema)),
  userAction: s.optional(s.lazy(() => vaultUserActionSchema)),
  _keysMap: {
    brandName: "brand_name",
    returnUrl: "return_url",
    cancelUrl: "cancel_url",
    shippingPreference: "shipping_preference",
    vaultInstruction: "vault_instruction",
    appSwitchContext: "app_switch_context",
    userAction: "user_action",
  },
});
