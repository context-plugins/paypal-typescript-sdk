import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Merchant preference on how the buyer can navigate back to merchant website post approving the
 * transaction on the Venmo App.
 */
export const ReturnFlow = {
  /**
   * After payment approval in the PayPal App, buyer will automatically be redirected to the
   * merchant website.
   */
  Auto: "AUTO",
  /**
   * After payment approval in the PayPal App, buyer will be asked to manually navigate back to the
   * merchant website where they started the transaction from. The buyer is shown a message like
   * 'Return to Merchant' to return to the source where the transaction actually started.
   */
  Manual: "MANUAL",
} as const;
export type ReturnFlow = (typeof ReturnFlow)[keyof typeof ReturnFlow] | (string & {});

export const returnFlowSchema: EnumSchema<ReturnFlow> = s.enumOf<ReturnFlow>(ReturnFlow);
