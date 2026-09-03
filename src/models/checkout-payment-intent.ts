import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const CheckoutPaymentIntent = {
  Capture: "CAPTURE",
  Authorize: "AUTHORIZE",
} as const;
export type CheckoutPaymentIntent =
  | (typeof CheckoutPaymentIntent)[keyof typeof CheckoutPaymentIntent]
  | (string & {});

export const checkoutPaymentIntentSchema: EnumSchema<CheckoutPaymentIntent> =
  s.enumOf<CheckoutPaymentIntent>(CheckoutPaymentIntent);
