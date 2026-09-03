import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  applicationContextUserActionSchema,
  type ApplicationContextUserAction,
} from "./application-context-user-action.js";
import {
  experienceContextShippingPreferenceSchema,
  type ExperienceContextShippingPreference,
} from "./experience-context-shipping-preference.js";
import { paymentMethodSchema, type PaymentMethod } from "./payment-method.js";

export type SubscriptionApplicationContext = {
  brandName?: string;
  locale?: string;
  shippingPreference?: ExperienceContextShippingPreference;
  userAction?: ApplicationContextUserAction;
  paymentMethod?: PaymentMethod;
  returnUrl: string;
  cancelUrl: string;
};

export const subscriptionApplicationContextSchema: Schema<SubscriptionApplicationContext> =
  s.object<SubscriptionApplicationContext>({
    brandName: s.optional(s.string()),
    locale: s.optional(s.string()),
    shippingPreference: s.optional(s.lazy(() => experienceContextShippingPreferenceSchema)),
    userAction: s.optional(s.lazy(() => applicationContextUserActionSchema)),
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
