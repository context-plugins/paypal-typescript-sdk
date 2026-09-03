import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { customerSchema, type Customer } from "./customer.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { paymentTokenStatusSchema, type PaymentTokenStatus } from "./payment-token-status.js";
import {
  setupTokenResponsePaymentSourceSchema,
  type SetupTokenResponsePaymentSource,
} from "./setup-token-response-payment-source.js";

export type SetupTokenResponse = {
  id?: string;
  customer?: Customer;
  status?: PaymentTokenStatus;
  paymentSource?: SetupTokenResponsePaymentSource;
  links?: LinkDescription[];
};

export const setupTokenResponseSchema: Schema<SetupTokenResponse> = s.object<SetupTokenResponse>({
  id: s.optional(s.string()),
  customer: s.optional(s.lazy(() => customerSchema)),
  status: s.optional(s.lazy(() => paymentTokenStatusSchema)),
  paymentSource: s.optional(s.lazy(() => setupTokenResponsePaymentSourceSchema)),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  _keysMap: {
    paymentSource: "payment_source",
  },
});
