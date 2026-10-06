import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { callbackEventsSchema, type CallbackEvents } from "./callback-events.js";

/** CallBack Configuration that the merchant can provide to PayPal/Venmo. */
export type CallbackConfiguration = {
  /** An array of callback events merchant can subscribe to for the corresponding callback url. */
  callbackEvents: CallbackEvents[];
  /**
   * Merchant provided CallBack url.PayPal/Venmo will use this url to call the merchant back when
   * the events occur .PayPal/Venmo expects a secured url usually in the https format.merchant can
   * append the cart id or other params part of the url as query or path params.
   */
  callbackUrl: string;
};

export const callbackConfigurationSchema: Schema<CallbackConfiguration> = s.object<CallbackConfiguration>({
  callbackEvents: s.array(s.lazy(() => callbackEventsSchema)),
  callbackUrl: s.string(),
  _keysMap: {
    callbackEvents: "callback_events",
    callbackUrl: "callback_url",
  },
});
