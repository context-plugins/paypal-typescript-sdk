import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const PayPalPaymentTokenCustomerType = {
  Consumer: "CONSUMER",
  Business: "BUSINESS",
} as const;
export type PayPalPaymentTokenCustomerType =
  | (typeof PayPalPaymentTokenCustomerType)[keyof typeof PayPalPaymentTokenCustomerType]
  | (string & {});

export const payPalPaymentTokenCustomerTypeSchema: EnumSchema<PayPalPaymentTokenCustomerType> =
  s.enumOf<PayPalPaymentTokenCustomerType>(PayPalPaymentTokenCustomerType);
