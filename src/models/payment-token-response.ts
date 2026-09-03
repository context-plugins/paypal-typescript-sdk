import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { customerResponseSchema, type CustomerResponse } from "./customer-response.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import {
  paymentTokenResponsePaymentSourceSchema,
  type PaymentTokenResponsePaymentSource,
} from "./payment-token-response-payment-source.js";

export type PaymentTokenResponse = {
  id?: string;
  customer?: CustomerResponse;
  paymentSource?: PaymentTokenResponsePaymentSource;
  links?: LinkDescription[];
};

export const paymentTokenResponseSchema: Schema<PaymentTokenResponse> = s.object<PaymentTokenResponse>({
  id: s.optional(s.string()),
  customer: s.optional(s.lazy(() => customerResponseSchema)),
  paymentSource: s.optional(s.lazy(() => paymentTokenResponsePaymentSourceSchema)),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  _keysMap: {
    paymentSource: "payment_source",
  },
});
