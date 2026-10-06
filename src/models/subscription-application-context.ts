import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  ApplicationContextUserAction,
  applicationContextUserActionSchema,
} from "./application-context-user-action.js";
import {
  ExperienceContextShippingPreference,
  experienceContextShippingPreferenceSchema,
} from "./experience-context-shipping-preference.js";
import { paymentMethodSchema, type PaymentMethod } from "./payment-method.js";

/**
 * The application context, which customizes the payer experience during the subscription approval
 * process with PayPal.
 */
export type SubscriptionApplicationContext = {
  /**
   * The label that overrides the business name in the PayPal account on the PayPal site.
   *
   * @deprecated
   */
  brandName?: string;
  /**
   * The BCP 47-formatted locale of pages that the PayPal payment experience shows. PayPal supports
   * a five-character code. For example, `da-DK`, `he-IL`, `id-ID`, `ja-JP`, `no-NO`, `pt-BR`,
   * `ru-RU`, `sv-SE`, `th-TH`, `zh-CN`, `zh-HK`, or `zh-TW`.
   *
   * @deprecated
   */
  locale?: string;
  /**
   * The location from which the shipping address is derived.
   *
   * @deprecated
   *
   * @default ExperienceContextShippingPreference.GetFromFile
   */
  shippingPreference?: ExperienceContextShippingPreference;
  /**
   * Configures the label name to `Continue` or `Subscribe Now` for subscription consent experience.
   *
   * @deprecated
   *
   * @default ApplicationContextUserAction.SubscribeNow
   */
  userAction?: ApplicationContextUserAction;
  /**
   * The customer and merchant payment preferences.
   *
   * @deprecated
   */
  paymentMethod?: PaymentMethod;
  /**
   * The URL where the customer is redirected after the customer approves the payment.
   *
   * @deprecated
   */
  returnUrl: string;
  /**
   * The URL where the customer is redirected after the customer cancels the payment.
   *
   * @deprecated
   */
  cancelUrl: string;
};

export const subscriptionApplicationContextSchema: Schema<SubscriptionApplicationContext> =
  s.object<SubscriptionApplicationContext>({
    brandName: s.optional(s.string()),
    locale: s.optional(s.string()),
    shippingPreference: s.defaulted(
      experienceContextShippingPreferenceSchema,
      ExperienceContextShippingPreference.GetFromFile,
    ),
    userAction: s.defaulted(applicationContextUserActionSchema, ApplicationContextUserAction.SubscribeNow),
    paymentMethod: s.optional(s.lazy(() => paymentMethodSchema)),
    returnUrl: s.string(),
    cancelUrl: s.string(),
    _keysMap: {
      brandName: "brand_name",
      shippingPreference: "shipping_preference",
      userAction: "user_action",
      paymentMethod: "payment_method",
      returnUrl: "return_url",
      cancelUrl: "cancel_url",
    },
  });
