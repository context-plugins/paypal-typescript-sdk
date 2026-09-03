import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  experienceContextShippingPreferenceSchema,
  type ExperienceContextShippingPreference,
} from "./experience-context-shipping-preference.js";

export type ExperienceContext = {
  brandName?: string;
  locale?: string;
  shippingPreference?: ExperienceContextShippingPreference;
  returnUrl?: string;
  cancelUrl?: string;
};

export const experienceContextSchema: Schema<ExperienceContext> = s.object<ExperienceContext>({
  brandName: s.optional(s.string()),
  locale: s.optional(s.string()),
  shippingPreference: s.optional(s.lazy(() => experienceContextShippingPreferenceSchema)),
  returnUrl: s.optional(s.string()),
  cancelUrl: s.optional(s.string()),
  _keysMap: {
    brandName: "brand_name",
    shippingPreference: "shipping_preference",
    returnUrl: "return_url",
    cancelUrl: "cancel_url",
  },
});
