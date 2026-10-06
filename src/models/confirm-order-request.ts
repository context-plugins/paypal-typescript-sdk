import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  orderConfirmApplicationContextSchema,
  type OrderConfirmApplicationContext,
} from "./order-confirm-application-context.js";
import { paymentSourceSchema, type PaymentSource } from "./payment-source.js";

/** Payer confirms the intent to pay for the Order using the provided payment source. */
export type ConfirmOrderRequest = {
  /** The payment source definition. */
  paymentSource: PaymentSource;
  /** Customizes the payer confirmation experience. */
  applicationContext?: OrderConfirmApplicationContext;
};

export const confirmOrderRequestSchema: Schema<ConfirmOrderRequest> = s.object<ConfirmOrderRequest>({
  paymentSource: paymentSourceSchema,
  applicationContext: s.optional(s.lazy(() => orderConfirmApplicationContextSchema)),
  _keysMap: {
    paymentSource: "payment_source",
    applicationContext: "application_context",
  },
});
