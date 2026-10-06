import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * The customer type associated with the PayPal payment token. This is to indicate whether the
 * customer acting on the merchant / platform is either a business or a consumer., The customer type
 * associated with a digital wallet payment token. This is to indicate whether the customer acting
 * on the merchant / platform is either a business or a consumer.
 */
export const PayPalPaymentTokenCustomerType = {
  /** The customer vaulting the PayPal payment token is a consumer on the merchant / platform. */
  Consumer: "CONSUMER",
  /** The customer vaulting the PayPal payment token is a business on merchant / platform. */
  Business: "BUSINESS",
} as const;
export type PayPalPaymentTokenCustomerType =
  | (typeof PayPalPaymentTokenCustomerType)[keyof typeof PayPalPaymentTokenCustomerType]
  | (string & {});

export const payPalPaymentTokenCustomerTypeSchema: EnumSchema<PayPalPaymentTokenCustomerType> =
  s.enumOf<PayPalPaymentTokenCustomerType>(PayPalPaymentTokenCustomerType);
