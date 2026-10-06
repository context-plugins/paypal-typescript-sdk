import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** CallBack event. */
export const CallbackEvents = {
  /**
   * When Buyer changes or selects the shipping address on the PayPal/Venmo buyer approval flow ,
   * PayPal/Venmo will call merchant with the callback URL to update order totals.
   */
  ShippingAddress: "SHIPPING_ADDRESS",
  /**
   * When Buyer changes or selects the shipping options on the PayPal/Venmo buyer approval flow ,
   * PayPal/Venmo will call merchant with the callback URL to update order totals.
   */
  ShippingOptions: "SHIPPING_OPTIONS",
} as const;
export type CallbackEvents = (typeof CallbackEvents)[keyof typeof CallbackEvents] | (string & {});

export const callbackEventsSchema: EnumSchema<CallbackEvents> = s.enumOf<CallbackEvents>(CallbackEvents);
