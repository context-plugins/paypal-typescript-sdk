import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { applePayRequestSchema, type ApplePayRequest } from "./apple-pay-request.js";
import {
  bancontactPaymentRequestSchema,
  type BancontactPaymentRequest,
} from "./bancontact-payment-request.js";
import { blikPaymentRequestSchema, type BlikPaymentRequest } from "./blik-payment-request.js";
import { cardRequestSchema, type CardRequest } from "./card-request.js";
import { epsPaymentRequestSchema, type EpsPaymentRequest } from "./eps-payment-request.js";
import { giropayPaymentRequestSchema, type GiropayPaymentRequest } from "./giropay-payment-request.js";
import { googlePayRequestSchema, type GooglePayRequest } from "./google-pay-request.js";
import { iDealPaymentRequestSchema, type IDealPaymentRequest } from "./ideal-payment-request.js";
import { myBankPaymentRequestSchema, type MyBankPaymentRequest } from "./my-bank-payment-request.js";
import { p24PaymentRequestSchema, type P24PaymentRequest } from "./p24-payment-request.js";
import { payPalWalletSchema, type PayPalWallet } from "./pay-pal-wallet.js";
import { sofortPaymentRequestSchema, type SofortPaymentRequest } from "./sofort-payment-request.js";
import { tokenSchema, type Token } from "./token.js";
import { trustlyPaymentRequestSchema, type TrustlyPaymentRequest } from "./trustly-payment-request.js";
import { venmoWalletRequestSchema, type VenmoWalletRequest } from "./venmo-wallet-request.js";

/** The payment source definition. */
export type PaymentSource = {
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
  /** Information needed to pay using Bancontact. */
  bancontact?: BancontactPaymentRequest;
  /** Information needed to pay using BLIK. */
  blik?: BlikPaymentRequest;
  /** Information needed to pay using eps. */
  eps?: EpsPaymentRequest;
  /** Information needed to pay using giropay. */
  giropay?: GiropayPaymentRequest;
  /** Information needed to pay using iDEAL. */
  ideal?: IDealPaymentRequest;
  /** Information needed to pay using MyBank. */
  mybank?: MyBankPaymentRequest;
  /** Information needed to pay using P24 (Przelewy24). */
  p24?: P24PaymentRequest;
  /** Information needed to pay using Sofort. */
  sofort?: SofortPaymentRequest;
  /** Information needed to pay using Trustly. */
  trustly?: TrustlyPaymentRequest;
  /** Information needed to pay using ApplePay. */
  applePay?: ApplePayRequest;
  /** Information needed to pay using Google Pay. */
  googlePay?: GooglePayRequest;
  /** Information needed to pay using Venmo. */
  venmo?: VenmoWalletRequest;
};

export const paymentSourceSchema: Schema<PaymentSource> = s.object<PaymentSource>({
  card: s.optional(s.lazy(() => cardRequestSchema)),
  token: s.optional(s.lazy(() => tokenSchema)),
  paypal: s.optional(s.lazy(() => payPalWalletSchema)),
  bancontact: s.optional(s.lazy(() => bancontactPaymentRequestSchema)),
  blik: s.optional(s.lazy(() => blikPaymentRequestSchema)),
  eps: s.optional(s.lazy(() => epsPaymentRequestSchema)),
  giropay: s.optional(s.lazy(() => giropayPaymentRequestSchema)),
  ideal: s.optional(s.lazy(() => iDealPaymentRequestSchema)),
  mybank: s.optional(s.lazy(() => myBankPaymentRequestSchema)),
  p24: s.optional(s.lazy(() => p24PaymentRequestSchema)),
  sofort: s.optional(s.lazy(() => sofortPaymentRequestSchema)),
  trustly: s.optional(s.lazy(() => trustlyPaymentRequestSchema)),
  applePay: s.optional(s.lazy(() => applePayRequestSchema)),
  googlePay: s.optional(s.lazy(() => googlePayRequestSchema)),
  venmo: s.optional(s.lazy(() => venmoWalletRequestSchema)),
  _keysMap: {
    applePay: "apple_pay",
    googlePay: "google_pay",
  },
});
