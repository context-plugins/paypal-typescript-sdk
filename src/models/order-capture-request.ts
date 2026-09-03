import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  orderCaptureRequestPaymentSourceSchema,
  type OrderCaptureRequestPaymentSource,
} from "./order-capture-request-payment-source.js";

export type OrderCaptureRequest = {
  paymentSource?: OrderCaptureRequestPaymentSource;
};

export const orderCaptureRequestSchema: Schema<OrderCaptureRequest> = s.object<OrderCaptureRequest>({
  paymentSource: s.optional(s.lazy(() => orderCaptureRequestPaymentSourceSchema)),
  _keysMap: {
    paymentSource: "payment_source",
  },
});
