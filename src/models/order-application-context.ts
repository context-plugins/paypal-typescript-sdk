import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  orderApplicationContextLandingPageSchema,
  type OrderApplicationContextLandingPage,
} from "./order-application-context-landing-page.js";
import {
  orderApplicationContextShippingPreferenceSchema,
  type OrderApplicationContextShippingPreference,
} from "./order-application-context-shipping-preference.js";
import {
  orderApplicationContextUserActionSchema,
  type OrderApplicationContextUserAction,
} from "./order-application-context-user-action.js";
import { paymentMethodPreferenceSchema, type PaymentMethodPreference } from "./payment-method-preference.js";
import { storedPaymentSourceSchema, type StoredPaymentSource } from "./stored-payment-source.js";

export type OrderApplicationContext = {
  brandName?: string;
  locale?: string;
  landingPage?: OrderApplicationContextLandingPage;
  shippingPreference?: OrderApplicationContextShippingPreference;
  userAction?: OrderApplicationContextUserAction;
  paymentMethod?: PaymentMethodPreference;
  returnUrl?: string;
  cancelUrl?: string;
  storedPaymentSource?: StoredPaymentSource;
};

export const orderApplicationContextSchema: Schema<OrderApplicationContext> =
  s.object<OrderApplicationContext>({
    brandName: s.optional(s.string()),
    locale: s.optional(s.string()),
    landingPage: s.optional(s.lazy(() => orderApplicationContextLandingPageSchema)),
    shippingPreference: s.optional(s.lazy(() => orderApplicationContextShippingPreferenceSchema)),
    userAction: s.optional(s.lazy(() => orderApplicationContextUserActionSchema)),
    paymentMethod: s.optional(s.lazy(() => paymentMethodPreferenceSchema)),
    returnUrl: s.optional(s.string()),
    cancelUrl: s.optional(s.string()),
    storedPaymentSource: s.optional(s.lazy(() => storedPaymentSourceSchema)),
    _keysMap: {
      brandName: "brand_name",
      landingPage: "landing_page",
      shippingPreference: "shipping_preference",
      userAction: "user_action",
      paymentMethod: "payment_method",
      returnUrl: "return_url",
      cancelUrl: "cancel_url",
      storedPaymentSource: "stored_payment_source",
    },
  });
