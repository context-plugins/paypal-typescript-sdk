import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { callbackConfigurationSchema, type CallbackConfiguration } from "./callback-configuration.js";
import {
  venmoWalletExperienceContextShippingPreferenceSchema,
  type VenmoWalletExperienceContextShippingPreference,
} from "./venmo-wallet-experience-context-shipping-preference.js";
import {
  venmoWalletExperienceContextUserActionSchema,
  type VenmoWalletExperienceContextUserAction,
} from "./venmo-wallet-experience-context-user-action.js";

export type VenmoWalletExperienceContext = {
  brandName?: string;
  shippingPreference?: VenmoWalletExperienceContextShippingPreference;
  orderUpdateCallbackConfig?: CallbackConfiguration;
  userAction?: VenmoWalletExperienceContextUserAction;
};

export const venmoWalletExperienceContextSchema: Schema<VenmoWalletExperienceContext> =
  s.object<VenmoWalletExperienceContext>({
    brandName: s.optional(s.string()),
    shippingPreference: s.optional(s.lazy(() => venmoWalletExperienceContextShippingPreferenceSchema)),
    orderUpdateCallbackConfig: s.optional(s.lazy(() => callbackConfigurationSchema)),
    userAction: s.optional(s.lazy(() => venmoWalletExperienceContextUserActionSchema)),
    _keysMap: {
      brandName: "brand_name",
      shippingPreference: "shipping_preference",
      orderUpdateCallbackConfig: "order_update_callback_config",
      userAction: "user_action",
    },
  });
