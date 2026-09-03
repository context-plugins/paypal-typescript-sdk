import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  experienceContextShippingPreferenceSchema,
  type ExperienceContextShippingPreference,
} from "./experience-context-shipping-preference.js";
import { paymentMethodSchema, type PaymentMethod } from "./payment-method.js";

export type SubscriptionPatchApplicationContext = {
  brandName?: string;
  locale?: string;
  shippingPreference?: ExperienceContextShippingPreference;
  paymentMethod?: PaymentMethod;
  returnUrl: string;
  cancelUrl: string;
};

export const subscriptionPatchApplicationContextSchema: Schema<SubscriptionPatchApplicationContext> =
  s.object<SubscriptionPatchApplicationContext>({
    brandName: s.optional(s.string()),
    locale: s.optional(s.string()),
    shippingPreference: s.optional(s.lazy(() => experienceContextShippingPreferenceSchema)),
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
