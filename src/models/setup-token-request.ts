import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { customerSchema, type Customer } from "./customer.js";
import {
  setupTokenRequestPaymentSourceSchema,
  type SetupTokenRequestPaymentSource,
} from "./setup-token-request-payment-source.js";

/** Setup Token Request where the `source` defines the type of instrument to be stored. */
export type SetupTokenRequest = {
  /**
   * This object defines a customer in your system. Use it to manage customer profiles, save payment
   * methods and contact details.
   */
  customer?: Customer;
  /** The payment method to vault with the instrument details. */
  paymentSource: SetupTokenRequestPaymentSource;
};

export const setupTokenRequestSchema: Schema<SetupTokenRequest> = s.object<SetupTokenRequest>({
  customer: s.optional(s.lazy(() => customerSchema)),
  paymentSource: setupTokenRequestPaymentSourceSchema,
  _keysMap: {
    paymentSource: "payment_source",
  },
});
