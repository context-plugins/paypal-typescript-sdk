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

export type PaymentSource = {
  card?: CardRequest;
  token?: Token;
  paypal?: PayPalWallet;
  bancontact?: BancontactPaymentRequest;
  blik?: BlikPaymentRequest;
  eps?: EpsPaymentRequest;
  giropay?: GiropayPaymentRequest;
  ideal?: IDealPaymentRequest;
  mybank?: MyBankPaymentRequest;
  p24?: P24PaymentRequest;
  sofort?: SofortPaymentRequest;
  trustly?: TrustlyPaymentRequest;
  applePay?: ApplePayRequest;
  googlePay?: GooglePayRequest;
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
