import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { appSwitchContextSchema, type AppSwitchContext } from "./app-switch-context.js";
import { callbackConfigurationSchema, type CallbackConfiguration } from "./callback-configuration.js";
import {
  PayPalExperienceLandingPage,
  payPalExperienceLandingPageSchema,
} from "./pay-pal-experience-landing-page.js";
import {
  PayPalExperienceUserAction,
  payPalExperienceUserActionSchema,
} from "./pay-pal-experience-user-action.js";
import {
  PayPalWalletContactPreference,
  payPalWalletContactPreferenceSchema,
} from "./pay-pal-wallet-contact-preference.js";
import {
  PayPalWalletContextShippingPreference,
  payPalWalletContextShippingPreferenceSchema,
} from "./pay-pal-wallet-context-shipping-preference.js";
import {
  PayeePaymentMethodPreference,
  payeePaymentMethodPreferenceSchema,
} from "./payee-payment-method-preference.js";

/**
 * Customizes the payer experience during the approval process for payment with PayPal. Note:
 * Partners and Marketplaces might configure brand_name and shipping_preference during partner
 * account setup, which overrides the request values.
 */
export type PayPalWalletExperienceContext = {
  /**
   * The label that overrides the business name in the PayPal account on the PayPal site. The
   * pattern is defined by an external party and supports Unicode.
   */
  brandName?: string;
  /**
   * The [language tag](https://tools.ietf.org/html/bcp47#section-2) for the language in which to
   * localize the error-related strings, such as messages, issues, and suggested actions. The tag is
   * made up of the [ISO 639-2 language
   * code](https://www.loc.gov/standards/iso639-2/php/code_list.php), the optional [ISO-15924 script
   * tag](https://www.unicode.org/iso15924/codelists.html), and the [ISO-3166 alpha-2 country
   * code](/api/rest/reference/country-codes/) or [M49 region
   * code](https://unstats.un.org/unsd/methodology/m49/).
   */
  locale?: string;
  /**
   * The location from which the shipping address is derived.
   *
   * @default PayPalWalletContextShippingPreference.GetFromFile
   */
  shippingPreference?: PayPalWalletContextShippingPreference;
  /**
   * The preference to display the contact information (buyer’s shipping email & phone number) on
   * PayPal's checkout for easy merchant-buyer communication.
   *
   * @default PayPalWalletContactPreference.NoContactInfo
   */
  contactPreference?: PayPalWalletContactPreference;
  /** Describes the URL. */
  returnUrl?: string;
  /** Describes the URL. */
  cancelUrl?: string;
  /**
   * Merchant provided details of the native app or mobile web browser to facilitate buyer's app
   * switch to the PayPal consumer app.
   */
  appSwitchContext?: AppSwitchContext;
  /**
   * The type of landing page to show on the PayPal site for customer checkout.
   *
   * @default PayPalExperienceLandingPage.NoPreference
   */
  landingPage?: PayPalExperienceLandingPage;
  /**
   * Configures a Continue or Pay Now checkout flow.
   *
   * @default PayPalExperienceUserAction.Continue
   */
  userAction?: PayPalExperienceUserAction;
  /** The merchant-preferred payment methods. @default PayeePaymentMethodPreference.Unrestricted */
  paymentMethodPreference?: PayeePaymentMethodPreference;
  /** CallBack Configuration that the merchant can provide to PayPal/Venmo. */
  orderUpdateCallbackConfig?: CallbackConfiguration;
};

export const payPalWalletExperienceContextSchema: Schema<PayPalWalletExperienceContext> =
  s.object<PayPalWalletExperienceContext>({
    brandName: s.optional(s.string()),
    locale: s.optional(s.string()),
    shippingPreference: s.defaulted(
      payPalWalletContextShippingPreferenceSchema,
      PayPalWalletContextShippingPreference.GetFromFile,
    ),
    contactPreference: s.defaulted(
      payPalWalletContactPreferenceSchema,
      PayPalWalletContactPreference.NoContactInfo,
    ),
    returnUrl: s.optional(s.string()),
    cancelUrl: s.optional(s.string()),
    appSwitchContext: s.optional(s.lazy(() => appSwitchContextSchema)),
    landingPage: s.defaulted(payPalExperienceLandingPageSchema, PayPalExperienceLandingPage.NoPreference),
    userAction: s.defaulted(payPalExperienceUserActionSchema, PayPalExperienceUserAction.Continue),
    paymentMethodPreference: s.defaulted(
      payeePaymentMethodPreferenceSchema,
      PayeePaymentMethodPreference.Unrestricted,
    ),
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
