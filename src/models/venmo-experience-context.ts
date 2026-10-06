import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  ExperienceContextShippingPreference,
  experienceContextShippingPreferenceSchema,
} from "./experience-context-shipping-preference.js";
import { vaultInstructionActionSchema, type VaultInstructionAction } from "./vault-instruction-action.js";
import { VaultUserAction, vaultUserActionSchema } from "./vault-user-action.js";

/** A resource representing an experience context of vault a venmo account. */
export type VenmoExperienceContext = {
  /**
   * The label that overrides the business name in the PayPal account on the PayPal site. The
   * pattern is defined by an external party and supports Unicode.
   */
  brandName?: string;
  /**
   * The shipping preference. This only applies to PayPal payment source.
   *
   * @default ExperienceContextShippingPreference.GetFromFile
   */
  shippingPreference?: ExperienceContextShippingPreference;
  /**
   * DEPRECATED. Vault Instruction on action to be performed after a successful payer approval.
   *
   * @deprecated
   */
  vaultInstruction?: VaultInstructionAction;
  /**
   * User Action on action to be performed after a successful payer approval.
   *
   * @default VaultUserAction.Continue
   */
  userAction?: VaultUserAction;
};

export const venmoExperienceContextSchema: Schema<VenmoExperienceContext> = s.object<VenmoExperienceContext>({
  brandName: s.optional(s.string()),
  shippingPreference: s.defaulted(
    experienceContextShippingPreferenceSchema,
    ExperienceContextShippingPreference.GetFromFile,
  ),
  vaultInstruction: s.optional(s.lazy(() => vaultInstructionActionSchema)),
  userAction: s.defaulted(vaultUserActionSchema, VaultUserAction.Continue),
  _keysMap: {
    brandName: "brand_name",
    shippingPreference: "shipping_preference",
    vaultInstruction: "vault_instruction",
    userAction: "user_action",
  },
});
