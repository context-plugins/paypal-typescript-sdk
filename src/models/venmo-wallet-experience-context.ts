import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { callbackConfigurationSchema, type CallbackConfiguration } from "./callback-configuration.js";
import {
  VenmoWalletExperienceContextShippingPreference,
  venmoWalletExperienceContextShippingPreferenceSchema,
} from "./venmo-wallet-experience-context-shipping-preference.js";
import {
  VenmoWalletExperienceContextUserAction,
  venmoWalletExperienceContextUserActionSchema,
} from "./venmo-wallet-experience-context-user-action.js";

/**
 * Customizes the buyer experience during the approval process for payment with Venmo. Note:
 * Partners and Marketplaces might configure shipping_preference during partner account setup, which
 * overrides the request values.
 */
export type VenmoWalletExperienceContext = {
  /**
   * The business name of the merchant. The pattern is defined by an external party and supports
   * Unicode.
   */
  brandName?: string;
  /**
   * The location from which the shipping address is derived.
   *
   * @default VenmoWalletExperienceContextShippingPreference.GetFromFile
   */
  shippingPreference?: VenmoWalletExperienceContextShippingPreference;
  /** CallBack Configuration that the merchant can provide to PayPal/Venmo. */
  orderUpdateCallbackConfig?: CallbackConfiguration;
  /**
   * Configures a Continue or Pay Now checkout flow.
   *
   * @default VenmoWalletExperienceContextUserAction.Continue
   */
  userAction?: VenmoWalletExperienceContextUserAction;
};

export const venmoWalletExperienceContextSchema: Schema<VenmoWalletExperienceContext> =
  s.object<VenmoWalletExperienceContext>({
    brandName: s.optional(s.string()),
    shippingPreference: s.defaulted(
      venmoWalletExperienceContextShippingPreferenceSchema,
      VenmoWalletExperienceContextShippingPreference.GetFromFile,
    ),
    orderUpdateCallbackConfig: s.optional(s.lazy(() => callbackConfigurationSchema)),
    userAction: s.defaulted(
      venmoWalletExperienceContextUserActionSchema,
      VenmoWalletExperienceContextUserAction.Continue,
    ),
    _keysMap: {
      brandName: "brand_name",
      shippingPreference: "shipping_preference",
      orderUpdateCallbackConfig: "order_update_callback_config",
      userAction: "user_action",
    },
  });
