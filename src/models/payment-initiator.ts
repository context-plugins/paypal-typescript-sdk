import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const PaymentInitiator = {
  Customer: "CUSTOMER",
  Merchant: "MERCHANT",
} as const;
export type PaymentInitiator = (typeof PaymentInitiator)[keyof typeof PaymentInitiator] | (string & {});

export const paymentInitiatorSchema: EnumSchema<PaymentInitiator> =
  s.enumOf<PaymentInitiator>(PaymentInitiator);
