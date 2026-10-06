import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { customerSchema, type Customer } from "./customer.js";
import {
  paymentTokenRequestPaymentSourceSchema,
  type PaymentTokenRequestPaymentSource,
} from "./payment-token-request-payment-source.js";

/** Payment Token Request where the `source` defines the type of instrument to be stored. */
export type PaymentTokenRequest = {
  /**
   * This object defines a customer in your system. Use it to manage customer profiles, save payment
   * methods and contact details.
   */
  customer?: Customer;
  /** The payment method to vault with the instrument details. */
  paymentSource: PaymentTokenRequestPaymentSource;
};

export const paymentTokenRequestSchema: Schema<PaymentTokenRequest> = s.object<PaymentTokenRequest>({
  customer: s.optional(s.lazy(() => customerSchema)),
  paymentSource: paymentTokenRequestPaymentSourceSchema,
  _keysMap: {
    paymentSource: "payment_source",
  },
});
