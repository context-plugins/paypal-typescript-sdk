import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * DEPRECATED. DEPRECATED. The shipping preference: Displays the shipping address to the customer.
 * Enables the customer to choose an address on the PayPal site. Restricts the customer from
 * changing the address during the payment-approval process. . The fields in `application_context`
 * are now available in the `experience_context` object under the `payment_source` which supports
 * them (eg. `payment_source.paypal.experience_context.shipping_preference`). Please specify this
 * field in the `experience_context` object instead of the `application_context` object.
 */
export const OrderApplicationContextShippingPreference = {
  /** Use the customer-provided shipping address on the PayPal site. */
  GetFromFile: "GET_FROM_FILE",
  /** Redact the shipping address from the PayPal site. Recommended for digital goods. */
  NoShipping: "NO_SHIPPING",
  /**
   * Use the merchant-provided address. The customer cannot change this address on the PayPal site.
   */
  SetProvidedAddress: "SET_PROVIDED_ADDRESS",
} as const;
export type OrderApplicationContextShippingPreference =
  | (typeof OrderApplicationContextShippingPreference)[keyof typeof OrderApplicationContextShippingPreference]
  | (string & {});

export const orderApplicationContextShippingPreferenceSchema: EnumSchema<OrderApplicationContextShippingPreference> =
  s.enumOf<OrderApplicationContextShippingPreference>(OrderApplicationContextShippingPreference);
