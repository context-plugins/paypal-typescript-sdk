import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * DEPRECATED. Configures a Continue or Pay Now checkout flow. The fields in `application_context`
 * are now available in the `experience_context` object under the `payment_source` which supports
 * them (eg. `payment_source.paypal.experience_context.user_action`). Please specify this field in
 * the `experience_context` object instead of the `application_context` object.
 */
export const OrderApplicationContextUserAction = {
  /**
   * After you redirect the customer to the PayPal payment page, a Continue button appears. Use this
   * option when the final amount is not known when the checkout flow is initiated and you want to
   * redirect the customer to the merchant page without processing the payment.
   */
  Continue: "CONTINUE",
  /**
   * After you redirect the customer to the PayPal payment page, a Pay Now button appears. Use this
   * option when the final amount is known when the checkout is initiated and you want to process
   * the payment immediately when the customer clicks Pay Now.
   */
  PayNow: "PAY_NOW",
} as const;
export type OrderApplicationContextUserAction =
  | (typeof OrderApplicationContextUserAction)[keyof typeof OrderApplicationContextUserAction]
  | (string & {});

export const orderApplicationContextUserActionSchema: EnumSchema<OrderApplicationContextUserAction> =
  s.enumOf<OrderApplicationContextUserAction>(OrderApplicationContextUserAction);
