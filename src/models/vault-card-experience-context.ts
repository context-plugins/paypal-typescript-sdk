import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { vaultInstructionActionSchema, type VaultInstructionAction } from "./vault-instruction-action.js";
import { vaultUserActionSchema, type VaultUserAction } from "./vault-user-action.js";

export type VaultCardExperienceContext = {
  brandName?: string;
  locale?: string;
  returnUrl?: string;
  cancelUrl?: string;
  vaultInstruction?: VaultInstructionAction;
  userAction?: VaultUserAction;
};

export const vaultCardExperienceContextSchema: Schema<VaultCardExperienceContext> =
  s.object<VaultCardExperienceContext>({
    brandName: s.optional(s.string()),
    locale: s.optional(s.string()),
    returnUrl: s.optional(s.string()),
    cancelUrl: s.optional(s.string()),
    vaultInstruction: s.optional(s.lazy(() => vaultInstructionActionSchema)),
    userAction: s.optional(s.lazy(() => vaultUserActionSchema)),
    _keysMap: {
      brandName: "brand_name",
      returnUrl: "return_url",
      cancelUrl: "cancel_url",
      vaultInstruction: "vault_instruction",
      userAction: "user_action",
    },
  });
