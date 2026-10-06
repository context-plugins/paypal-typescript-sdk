import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { applePayPaymentObjectSchema, type ApplePayPaymentObject } from "./apple-pay-payment-object.js";
import { bancontactPaymentObjectSchema, type BancontactPaymentObject } from "./bancontact-payment-object.js";
import { blikPaymentObjectSchema, type BlikPaymentObject } from "./blik-payment-object.js";
import { cardResponseSchema, type CardResponse } from "./card-response.js";
import { epsPaymentObjectSchema, type EpsPaymentObject } from "./eps-payment-object.js";
import { giropayPaymentObjectSchema, type GiropayPaymentObject } from "./giropay-payment-object.js";
import { googlePayWalletResponseSchema, type GooglePayWalletResponse } from "./google-pay-wallet-response.js";
import { iDealPaymentObjectSchema, type IDealPaymentObject } from "./ideal-payment-object.js";
import { myBankPaymentObjectSchema, type MyBankPaymentObject } from "./my-bank-payment-object.js";
import { p24PaymentObjectSchema, type P24PaymentObject } from "./p24-payment-object.js";
import { payPalWalletResponseSchema, type PayPalWalletResponse } from "./pay-pal-wallet-response.js";
import { sofortPaymentObjectSchema, type SofortPaymentObject } from "./sofort-payment-object.js";
import { trustlyPaymentObjectSchema, type TrustlyPaymentObject } from "./trustly-payment-object.js";
import { venmoWalletResponseSchema, type VenmoWalletResponse } from "./venmo-wallet-response.js";

/** The payment source used to fund the payment. */
export type PaymentSourceResponse = {
  /** The payment card to use to fund a payment. Card can be a credit or debit card. */
  card?: CardResponse;
  /** The PayPal Wallet response. */
  paypal?: PayPalWalletResponse;
  /** Information used to pay Bancontact. */
  bancontact?: BancontactPaymentObject;
  /** Information used to pay using BLIK. */
  blik?: BlikPaymentObject;
  /** Information used to pay using eps. */
  eps?: EpsPaymentObject;
  /** Information needed to pay using giropay. */
  giropay?: GiropayPaymentObject;
  /** Information used to pay using iDEAL. */
  ideal?: IDealPaymentObject;
  /** Information used to pay using MyBank. */
  mybank?: MyBankPaymentObject;
  /** Information used to pay using P24(Przelewy24). */
  p24?: P24PaymentObject;
  /** Information used to pay using Sofort. */
  sofort?: SofortPaymentObject;
  /** Information needed to pay using Trustly. */
  trustly?: TrustlyPaymentObject;
  /** Information needed to pay using ApplePay. */
  applePay?: ApplePayPaymentObject;
  /** Google Pay Wallet payment data. */
  googlePay?: GooglePayWalletResponse;
  /** Venmo wallet response. */
  venmo?: VenmoWalletResponse;
};

export const paymentSourceResponseSchema: Schema<PaymentSourceResponse> = s.object<PaymentSourceResponse>({
  card: s.optional(s.lazy(() => cardResponseSchema)),
  paypal: s.optional(s.lazy(() => payPalWalletResponseSchema)),
  bancontact: s.optional(s.lazy(() => bancontactPaymentObjectSchema)),
  blik: s.optional(s.lazy(() => blikPaymentObjectSchema)),
  eps: s.optional(s.lazy(() => epsPaymentObjectSchema)),
  giropay: s.optional(s.lazy(() => giropayPaymentObjectSchema)),
  ideal: s.optional(s.lazy(() => iDealPaymentObjectSchema)),
  mybank: s.optional(s.lazy(() => myBankPaymentObjectSchema)),
  p24: s.optional(s.lazy(() => p24PaymentObjectSchema)),
  sofort: s.optional(s.lazy(() => sofortPaymentObjectSchema)),
  trustly: s.optional(s.lazy(() => trustlyPaymentObjectSchema)),
  applePay: s.optional(s.lazy(() => applePayPaymentObjectSchema)),
  googlePay: s.optional(s.lazy(() => googlePayWalletResponseSchema)),
  venmo: s.optional(s.lazy(() => venmoWalletResponseSchema)),
  _keysMap: {
    applePay: "apple_pay",
    googlePay: "google_pay",
  },
});
