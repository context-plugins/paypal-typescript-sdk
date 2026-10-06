import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { customerResponseSchema, type CustomerResponse } from "./customer-response.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import {
  paymentTokenResponsePaymentSourceSchema,
  type PaymentTokenResponsePaymentSource,
} from "./payment-token-response-payment-source.js";

/** Full representation of a saved payment token. */
export type PaymentTokenResponse = {
  /**
   * The PayPal-generated ID for the vaulted payment source. This ID should be stored on the
   * merchant's server so the saved payment source can be used for future transactions.
   */
  id?: string;
  /** Customer in merchant's or partner's system of records. */
  customer?: CustomerResponse;
  /** The vaulted payment method details. */
  paymentSource?: PaymentTokenResponsePaymentSource;
  /** An array of related [HATEOAS links](/api/rest/responses/#hateoas). */
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
