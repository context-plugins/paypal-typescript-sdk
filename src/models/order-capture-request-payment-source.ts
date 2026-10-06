import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { applePayRequestSchema, type ApplePayRequest } from "./apple-pay-request.js";
import { cardRequestSchema, type CardRequest } from "./card-request.js";
import { googlePayRequestSchema, type GooglePayRequest } from "./google-pay-request.js";
import { payPalWalletSchema, type PayPalWallet } from "./pay-pal-wallet.js";
import { tokenSchema, type Token } from "./token.js";
import { venmoWalletRequestSchema, type VenmoWalletRequest } from "./venmo-wallet-request.js";

/** The payment source definition. */
export type OrderCaptureRequestPaymentSource = {
  /**
   * The payment card to use to fund a payment. Can be a credit or debit card. Note: Passing card
   * number, cvv and expiry directly via the API requires PCI SAQ D compliance. *PayPal offers a
   * mechanism by which you do not have to take on the PCI SAQ D burden by using hosted fields -
   * refer to this Integration Guide*.
   */
  card?: CardRequest;
  /** The tokenized payment source to fund a payment. */
  token?: Token;
  /** A resource that identifies a PayPal Wallet is used for payment. */
  paypal?: PayPalWallet;
  /** Information needed to pay using ApplePay. */
  applePay?: ApplePayRequest;
  /** Information needed to pay using Google Pay. */
  googlePay?: GooglePayRequest;
  /** Information needed to pay using Venmo. */
  venmo?: VenmoWalletRequest;
};

export const orderCaptureRequestPaymentSourceSchema: Schema<OrderCaptureRequestPaymentSource> =
  s.object<OrderCaptureRequestPaymentSource>({
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
