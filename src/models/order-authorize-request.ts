import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  orderAuthorizeRequestPaymentSourceSchema,
  type OrderAuthorizeRequestPaymentSource,
} from "./order-authorize-request-payment-source.js";

export type OrderAuthorizeRequest = {
  paymentSource?: OrderAuthorizeRequestPaymentSource;
};

export const orderAuthorizeRequestSchema: Schema<OrderAuthorizeRequest> = s.object<OrderAuthorizeRequest>({
  paymentSource: s.optional(s.lazy(() => orderAuthorizeRequestPaymentSourceSchema)),
  _keysMap: {
    paymentSource: "payment_source",
  },
});
