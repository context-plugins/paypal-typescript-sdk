import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { appSwitchContextSchema, type AppSwitchContext } from "./app-switch-context.js";
import {
  ExperienceContextShippingPreference,
  experienceContextShippingPreferenceSchema,
} from "./experience-context-shipping-preference.js";
import { vaultInstructionActionSchema, type VaultInstructionAction } from "./vault-instruction-action.js";
import { VaultUserAction, vaultUserActionSchema } from "./vault-user-action.js";

/** Customizes the Vault creation flow experience for your customers. */
export type VaultExperienceContext = {
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
   * Merchant provided details of the native app or mobile web browser to facilitate buyer's app
   * switch to the PayPal consumer app.
   */
  appSwitchContext?: AppSwitchContext;
  /**
   * User Action on action to be performed after a successful payer approval.
   *
   * @default VaultUserAction.Continue
   */
  userAction?: VaultUserAction;
};

export const vaultExperienceContextSchema: Schema<VaultExperienceContext> = s.object<VaultExperienceContext>({
  brandName: s.optional(s.string()),
  locale: s.optional(s.string()),
  returnUrl: s.optional(s.string()),
  cancelUrl: s.optional(s.string()),
  shippingPreference: s.defaulted(
    experienceContextShippingPreferenceSchema,
    ExperienceContextShippingPreference.GetFromFile,
  ),
  vaultInstruction: s.optional(s.lazy(() => vaultInstructionActionSchema)),
  appSwitchContext: s.optional(s.lazy(() => appSwitchContextSchema)),
  userAction: s.defaulted(vaultUserActionSchema, VaultUserAction.Continue),
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
