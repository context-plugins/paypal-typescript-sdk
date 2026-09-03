import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { customerSchema, type Customer } from "./customer.js";
import {
  paymentTokenRequestPaymentSourceSchema,
  type PaymentTokenRequestPaymentSource,
} from "./payment-token-request-payment-source.js";

export type PaymentTokenRequest = {
  customer?: Customer;
  paymentSource: PaymentTokenRequestPaymentSource;
};

export const paymentTokenRequestSchema: Schema<PaymentTokenRequest> = s.object<PaymentTokenRequest>({
  customer: s.optional(s.lazy(() => customerSchema)),
  paymentSource: paymentTokenRequestPaymentSourceSchema,
  _keysMap: {
    paymentSource: "payment_source",
  },
});
