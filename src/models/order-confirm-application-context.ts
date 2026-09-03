import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { storedPaymentSourceSchema, type StoredPaymentSource } from "./stored-payment-source.js";

export type OrderConfirmApplicationContext = {
  brandName?: string;
  locale?: string;
  returnUrl?: string;
  cancelUrl?: string;
  storedPaymentSource?: StoredPaymentSource;
};

export const orderConfirmApplicationContextSchema: Schema<OrderConfirmApplicationContext> =
  s.object<OrderConfirmApplicationContext>({
    brandName: s.optional(s.string()),
    locale: s.optional(s.string()),
    returnUrl: s.optional(s.string()),
    cancelUrl: s.optional(s.string()),
    storedPaymentSource: s.optional(s.lazy(() => storedPaymentSourceSchema)),
    _keysMap: {
      brandName: "brand_name",
      returnUrl: "return_url",
      cancelUrl: "cancel_url",
      storedPaymentSource: "stored_payment_source",
    },
  });
