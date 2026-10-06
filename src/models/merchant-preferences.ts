import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** The merchant preferences for a subscription. */
export type MerchantPreferences = {
  /** The URL where the customer is redirected after the customer approves the payment. */
  returnUrl?: string;
  /** The URL where the customer is redirected after the customer cancels the payment. */
  cancelUrl?: string;
};

export const merchantPreferencesSchema: Schema<MerchantPreferences> = s.object<MerchantPreferences>({
  returnUrl: s.optional(s.string()),
  cancelUrl: s.optional(s.string()),
  _keysMap: {
    returnUrl: "return_url",
    cancelUrl: "cancel_url",
  },
});
