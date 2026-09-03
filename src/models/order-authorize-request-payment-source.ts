import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { applePayRequestSchema, type ApplePayRequest } from "./apple-pay-request.js";
import { cardRequestSchema, type CardRequest } from "./card-request.js";
import { googlePayRequestSchema, type GooglePayRequest } from "./google-pay-request.js";
import { payPalWalletSchema, type PayPalWallet } from "./pay-pal-wallet.js";
import { tokenSchema, type Token } from "./token.js";
import { venmoWalletRequestSchema, type VenmoWalletRequest } from "./venmo-wallet-request.js";

export type OrderAuthorizeRequestPaymentSource = {
  card?: CardRequest;
  token?: Token;
  paypal?: PayPalWallet;
  applePay?: ApplePayRequest;
  googlePay?: GooglePayRequest;
  venmo?: VenmoWalletRequest;
};

export const orderAuthorizeRequestPaymentSourceSchema: Schema<OrderAuthorizeRequestPaymentSource> =
  s.object<OrderAuthorizeRequestPaymentSource>({
    card: s.optional(s.lazy(() => cardRequestSchema)),
    token: s.optional(s.lazy(() => tokenSchema)),
    paypal: s.optional(s.lazy(() => payPalWalletSchema)),
    applePay: s.optional(s.lazy(() => applePayRequestSchema)),
    googlePay: s.optional(s.lazy(() => googlePayRequestSchema)),
    venmo: s.optional(s.lazy(() => venmoWalletRequestSchema)),
    _keysMap: {
      applePay: "apple_pay",
      googlePay: "google_pay",
    },
  });
