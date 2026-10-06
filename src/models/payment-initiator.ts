import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The person or party who initiated or triggered the payment. */
export const PaymentInitiator = {
  /**
   * Payment is initiated with the active engagement of the customer. e.g. a customer checking out
   * on a merchant website.
   */
  Customer: "CUSTOMER",
  /**
   * Payment is initiated by merchant on behalf of the customer without the active engagement of
   * customer. e.g. a merchant charging the monthly payment of a subscription to the customer.
   */
  Merchant: "MERCHANT",
} as const;
export type PaymentInitiator = (typeof PaymentInitiator)[keyof typeof PaymentInitiator] | (string & {});

export const paymentInitiatorSchema: EnumSchema<PaymentInitiator> =
  s.enumOf<PaymentInitiator>(PaymentInitiator);
