import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Configures the label name to `Continue` or `Subscribe Now` for subscription consent experience.
 */
export const ApplicationContextUserAction = {
  /**
   * After you redirect the customer to the PayPal subscription consent page, a Continue button
   * appears. Use this option when you want to control the activation of the subscription and do not
   * want PayPal to activate the subscription.
   */
  Continue: "CONTINUE",
  /**
   * After you redirect the customer to the PayPal subscription consent page, a Subscribe Now button
   * appears. Use this option when you want PayPal to activate the subscription.
   */
  SubscribeNow: "SUBSCRIBE_NOW",
} as const;
export type ApplicationContextUserAction =
  | (typeof ApplicationContextUserAction)[keyof typeof ApplicationContextUserAction]
  | (string & {});

export const applicationContextUserActionSchema: EnumSchema<ApplicationContextUserAction> =
  s.enumOf<ApplicationContextUserAction>(ApplicationContextUserAction);
