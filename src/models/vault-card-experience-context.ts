import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { vaultInstructionActionSchema, type VaultInstructionAction } from "./vault-instruction-action.js";
import { VaultUserAction, vaultUserActionSchema } from "./vault-user-action.js";

/** A resource representing an experience context of vault a card. */
export type VaultCardExperienceContext = {
  /**
   * The label that overrides the business name in the PayPal account on the PayPal site. The
   * pattern is defined by an external party and supports Unicode.
   */
  brandName?: string;
  /**
   * The [language tag](https://tools.ietf.org/html/bcp47#section-2) for the language in which to
   * localize the error-related strings, such as messages, issues, and suggested actions. The tag is
   * made up of the [ISO 639-2 language
   * code](https://www.loc.gov/standards/iso639-2/php/code_list.php), the optional [ISO-15924 script
   * tag](https://www.unicode.org/iso15924/codelists.html), and the [ISO-3166 alpha-2 country
   * code](/api/rest/reference/country-codes/) or [M49 region
   * code](https://unstats.un.org/unsd/methodology/m49/).
   */
  locale?: string;
  /**
   * The URL where the customer is redirected after customer approves leaves the flow. It is a
   * required field for contingency flows like PayPal wallet, 3DS.
   */
  returnUrl?: string;
  /**
   * The URL where the customer is redirected after customer cancels or leaves the flow. It is a
   * required field for contingency flows like PayPal wallet, 3DS.
   */
  cancelUrl?: string;
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

export const vaultCardExperienceContextSchema: Schema<VaultCardExperienceContext> =
  s.object<VaultCardExperienceContext>({
    brandName: s.optional(s.string()),
    locale: s.optional(s.string()),
    returnUrl: s.optional(s.string()),
    cancelUrl: s.optional(s.string()),
    vaultInstruction: s.optional(s.lazy(() => vaultInstructionActionSchema)),
    userAction: s.defaulted(vaultUserActionSchema, VaultUserAction.Continue),
    _keysMap: {
      brandName: "brand_name",
      returnUrl: "return_url",
      cancelUrl: "cancel_url",
      vaultInstruction: "vault_instruction",
      userAction: "user_action",
    },
  });
