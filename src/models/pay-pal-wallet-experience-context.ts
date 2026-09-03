import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { appSwitchContextSchema, type AppSwitchContext } from "./app-switch-context.js";
import { callbackConfigurationSchema, type CallbackConfiguration } from "./callback-configuration.js";
import {
  payPalExperienceLandingPageSchema,
  type PayPalExperienceLandingPage,
} from "./pay-pal-experience-landing-page.js";
import {
  payPalExperienceUserActionSchema,
  type PayPalExperienceUserAction,
} from "./pay-pal-experience-user-action.js";
import {
  payPalWalletContactPreferenceSchema,
  type PayPalWalletContactPreference,
} from "./pay-pal-wallet-contact-preference.js";
import {
  payPalWalletContextShippingPreferenceSchema,
  type PayPalWalletContextShippingPreference,
} from "./pay-pal-wallet-context-shipping-preference.js";
import {
  payeePaymentMethodPreferenceSchema,
  type PayeePaymentMethodPreference,
} from "./payee-payment-method-preference.js";

export type PayPalWalletExperienceContext = {
  brandName?: string;
  locale?: string;
  shippingPreference?: PayPalWalletContextShippingPreference;
  contactPreference?: PayPalWalletContactPreference;
  returnUrl?: string;
  cancelUrl?: string;
  appSwitchContext?: AppSwitchContext;
  landingPage?: PayPalExperienceLandingPage;
  userAction?: PayPalExperienceUserAction;
  paymentMethodPreference?: PayeePaymentMethodPreference;
  orderUpdateCallbackConfig?: CallbackConfiguration;
};

export const payPalWalletExperienceContextSchema: Schema<PayPalWalletExperienceContext> =
  s.object<PayPalWalletExperienceContext>({
    brandName: s.optional(s.string()),
    locale: s.optional(s.string()),
    shippingPreference: s.optional(s.lazy(() => payPalWalletContextShippingPreferenceSchema)),
    contactPreference: s.optional(s.lazy(() => payPalWalletContactPreferenceSchema)),
    returnUrl: s.optional(s.string()),
    cancelUrl: s.optional(s.string()),
    appSwitchContext: s.optional(s.lazy(() => appSwitchContextSchema)),
    landingPage: s.optional(s.lazy(() => payPalExperienceLandingPageSchema)),
    userAction: s.optional(s.lazy(() => payPalExperienceUserActionSchema)),
    paymentMethodPreference: s.optional(s.lazy(() => payeePaymentMethodPreferenceSchema)),
    orderUpdateCallbackConfig: s.optional(s.lazy(() => callbackConfigurationSchema)),
    _keysMap: {
      brandName: "brand_name",
      shippingPreference: "shipping_preference",
      contactPreference: "contact_preference",
      returnUrl: "return_url",
      cancelUrl: "cancel_url",
      appSwitchContext: "app_switch_context",
      landingPage: "landing_page",
      userAction: "user_action",
      paymentMethodPreference: "payment_method_preference",
      orderUpdateCallbackConfig: "order_update_callback_config",
    },
  });
