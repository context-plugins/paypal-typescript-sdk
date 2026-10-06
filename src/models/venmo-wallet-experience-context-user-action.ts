import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Configures a Continue or Pay Now checkout flow. */
export const VenmoWalletExperienceContextUserAction = {
  /**
   * After you redirect the customer to the Venmo payment page, a Continue button appears. Use this
   * option when the final amount is not known when the checkout flow is initiated and you want to
   * redirect the customer to the merchant page without processing the payment.
   */
  Continue: "CONTINUE",
  /**
   * After you redirect the customer to the Venmo payment page, a Pay Now button appears. Use this
   * option when the final amount is known when the checkout is initiated and you want to process
   * the payment immediately when the customer clicks Pay Now.
   */
  PayNow: "PAY_NOW",
} as const;
export type VenmoWalletExperienceContextUserAction =
  | (typeof VenmoWalletExperienceContextUserAction)[keyof typeof VenmoWalletExperienceContextUserAction]
  | (string & {});

export const venmoWalletExperienceContextUserActionSchema: EnumSchema<VenmoWalletExperienceContextUserAction> =
  s.enumOf<VenmoWalletExperienceContextUserAction>(VenmoWalletExperienceContextUserAction);
