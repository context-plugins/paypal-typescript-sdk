import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  ExperienceContextShippingPreference,
  experienceContextShippingPreferenceSchema,
} from "./experience-context-shipping-preference.js";
import { paymentMethodSchema, type PaymentMethod } from "./payment-method.js";

/**
 * The application context, which customizes the payer experience during the subscription approval
 * process with PayPal.
 */
export type SubscriptionPatchApplicationContext = {
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

export const subscriptionPatchApplicationContextSchema: Schema<SubscriptionPatchApplicationContext> =
  s.object<SubscriptionPatchApplicationContext>({
    brandName: s.optional(s.string()),
    locale: s.optional(s.string()),
    shippingPreference: s.defaulted(
      experienceContextShippingPreferenceSchema,
      ExperienceContextShippingPreference.GetFromFile,
    ),
    paymentMethod: s.optional(s.lazy(() => paymentMethodSchema)),
    returnUrl: s.string(),
    cancelUrl: s.string(),
    _keysMap: {
      brandName: "brand_name",
      shippingPreference: "shipping_preference",
      paymentMethod: "payment_method",
      returnUrl: "return_url",
      cancelUrl: "cancel_url",
    },
  });
