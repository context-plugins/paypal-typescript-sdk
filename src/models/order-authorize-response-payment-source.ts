import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { applePayPaymentObjectSchema, type ApplePayPaymentObject } from "./apple-pay-payment-object.js";
import { cardResponseSchema, type CardResponse } from "./card-response.js";
import { googlePayWalletResponseSchema, type GooglePayWalletResponse } from "./google-pay-wallet-response.js";
import { payPalWalletResponseSchema, type PayPalWalletResponse } from "./pay-pal-wallet-response.js";
import { venmoWalletResponseSchema, type VenmoWalletResponse } from "./venmo-wallet-response.js";

/** The payment source used to fund the payment. */
export type OrderAuthorizeResponsePaymentSource = {
  /** The payment card to use to fund a payment. Card can be a credit or debit card. */
  card?: CardResponse;
  /** The PayPal Wallet response. */
  paypal?: PayPalWalletResponse;
  /** Information needed to pay using ApplePay. */
  applePay?: ApplePayPaymentObject;
  /** Google Pay Wallet payment data. */
  googlePay?: GooglePayWalletResponse;
  /** Venmo wallet response. */
  venmo?: VenmoWalletResponse;
};

export const orderAuthorizeResponsePaymentSourceSchema: Schema<OrderAuthorizeResponsePaymentSource> =
  s.object<OrderAuthorizeResponsePaymentSource>({
    card: s.optional(s.lazy(() => cardResponseSchema)),
    paypal: s.optional(s.lazy(() => payPalWalletResponseSchema)),
    applePay: s.optional(s.lazy(() => applePayPaymentObjectSchema)),
    googlePay: s.optional(s.lazy(() => googlePayWalletResponseSchema)),
    venmo: s.optional(s.lazy(() => venmoWalletResponseSchema)),
    _keysMap: {
      applePay: "apple_pay",
      googlePay: "google_pay",
    },
  });
