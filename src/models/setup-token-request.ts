import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { customerSchema, type Customer } from "./customer.js";
import {
  setupTokenRequestPaymentSourceSchema,
  type SetupTokenRequestPaymentSource,
} from "./setup-token-request-payment-source.js";

export type SetupTokenRequest = {
  customer?: Customer;
  paymentSource: SetupTokenRequestPaymentSource;
};

export const setupTokenRequestSchema: Schema<SetupTokenRequest> = s.object<SetupTokenRequest>({
  customer: s.optional(s.lazy(() => customerSchema)),
  paymentSource: setupTokenRequestPaymentSourceSchema,
  _keysMap: {
    paymentSource: "payment_source",
  },
});
