import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { applePayPaymentTokenSchema, type ApplePayPaymentToken } from "./apple-pay-payment-token.js";
import { cardPaymentTokenEntitySchema, type CardPaymentTokenEntity } from "./card-payment-token-entity.js";
import { payPalPaymentTokenSchema, type PayPalPaymentToken } from "./pay-pal-payment-token.js";
import { venmoPaymentTokenSchema, type VenmoPaymentToken } from "./venmo-payment-token.js";

export type PaymentTokenResponsePaymentSource = {
  card?: CardPaymentTokenEntity;
  paypal?: PayPalPaymentToken;
  venmo?: VenmoPaymentToken;
  applePay?: ApplePayPaymentToken;
};

export const paymentTokenResponsePaymentSourceSchema: Schema<PaymentTokenResponsePaymentSource> =
  s.object<PaymentTokenResponsePaymentSource>({
    card: s.optional(s.lazy(() => cardPaymentTokenEntitySchema)),
    paypal: s.optional(s.lazy(() => payPalPaymentTokenSchema)),
    venmo: s.optional(s.lazy(() => venmoPaymentTokenSchema)),
    applePay: s.optional(s.lazy(() => applePayPaymentTokenSchema)),
    _keysMap: {
      applePay: "apple_pay",
    },
  });
