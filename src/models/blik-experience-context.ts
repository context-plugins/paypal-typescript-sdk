import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  experienceContextShippingPreferenceSchema,
  type ExperienceContextShippingPreference,
} from "./experience-context-shipping-preference.js";

export type BlikExperienceContext = {
  brandName?: string;
  locale?: string;
  shippingPreference?: ExperienceContextShippingPreference;
  returnUrl?: string;
  cancelUrl?: string;
  consumerIp?: string;
  consumerUserAgent?: string;
};

export const blikExperienceContextSchema: Schema<BlikExperienceContext> = s.object<BlikExperienceContext>({
  brandName: s.optional(s.string()),
  locale: s.optional(s.string()),
  shippingPreference: s.optional(s.lazy(() => experienceContextShippingPreferenceSchema)),
  returnUrl: s.optional(s.string()),
  cancelUrl: s.optional(s.string()),
  consumerIp: s.optional(s.string()),
  consumerUserAgent: s.optional(s.string()),
  _keysMap: {
    brandName: "brand_name",
    shippingPreference: "shipping_preference",
    returnUrl: "return_url",
    cancelUrl: "cancel_url",
    consumerIp: "consumer_ip",
    consumerUserAgent: "consumer_user_agent",
  },
});
