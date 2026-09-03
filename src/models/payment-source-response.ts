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

export type PaymentSourceResponse = {
  card?: CardResponse;
  paypal?: PayPalWalletResponse;
  bancontact?: BancontactPaymentObject;
  blik?: BlikPaymentObject;
  eps?: EpsPaymentObject;
  giropay?: GiropayPaymentObject;
  ideal?: IDealPaymentObject;
  mybank?: MyBankPaymentObject;
  p24?: P24PaymentObject;
  sofort?: SofortPaymentObject;
  trustly?: TrustlyPaymentObject;
  applePay?: ApplePayPaymentObject;
  googlePay?: GooglePayWalletResponse;
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
