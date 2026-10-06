import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { customerSchema, type Customer } from "./customer.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { PaymentTokenStatus, paymentTokenStatusSchema } from "./payment-token-status.js";
import {
  setupTokenResponsePaymentSourceSchema,
  type SetupTokenResponsePaymentSource,
} from "./setup-token-response-payment-source.js";

/** Minimal representation of a cached setup token. */
export type SetupTokenResponse = {
  /**
   * The PayPal-generated ID for the vaulted payment source. This ID should be stored on the
   * merchant's server so the saved payment source can be used for future transactions.
   */
  id?: string;
  /**
   * This object defines a customer in your system. Use it to manage customer profiles, save payment
   * methods and contact details.
   */
  customer?: Customer;
  /** The status of the payment token. @default PaymentTokenStatus.Created */
  status?: PaymentTokenStatus;
  /** The setup payment method details. */
  paymentSource?: SetupTokenResponsePaymentSource;
  /** An array of related [HATEOAS links](/api/rest/responses/#hateoas). */
  links?: LinkDescription[];
};

export const setupTokenResponseSchema: Schema<SetupTokenResponse> = s.object<SetupTokenResponse>({
  id: s.optional(s.string()),
  customer: s.optional(s.lazy(() => customerSchema)),
  status: s.defaulted(paymentTokenStatusSchema, PaymentTokenStatus.Created),
  paymentSource: s.optional(s.lazy(() => setupTokenResponsePaymentSourceSchema)),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  _keysMap: {
    paymentSource: "payment_source",
  },
});
