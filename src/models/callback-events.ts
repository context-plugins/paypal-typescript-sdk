import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const CallbackEvents = {
  ShippingAddress: "SHIPPING_ADDRESS",
  ShippingOptions: "SHIPPING_OPTIONS",
} as const;
export type CallbackEvents = (typeof CallbackEvents)[keyof typeof CallbackEvents] | (string & {});

export const callbackEventsSchema: EnumSchema<CallbackEvents> = s.enumOf<CallbackEvents>(CallbackEvents);
