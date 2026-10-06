import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** User Action on action to be performed after a successful payer approval. */
export const VaultUserAction = {
  /**
   * After you redirect the customer to the PayPal payment page, a Setup Now button appears. Use
   * this option when no additional inputs are needed from merchant site and to create the billing
   * agreement immediately when the customer clicks Setup Now.
   */
  SetupNow: "SETUP_NOW",
  /**
   * After you redirect the customer to the PayPal payment page, a Continue button appears. Use this
   * option when you want to redirect the customer from the completed payment page to the merchant
   * site for additional inputs without immediately creating the billing agreement.
   */
  Continue: "CONTINUE",
} as const;
export type VaultUserAction = (typeof VaultUserAction)[keyof typeof VaultUserAction] | (string & {});

export const vaultUserActionSchema: EnumSchema<VaultUserAction> = s.enumOf<VaultUserAction>(VaultUserAction);
