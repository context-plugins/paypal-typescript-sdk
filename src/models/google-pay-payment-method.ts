import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The type of the payment credential. Currently, only CARD is supported. */
export const GooglePayPaymentMethod = {
  /** CARD is the only value that Google Pay accepts. */
  Card: "CARD",
} as const;
export type GooglePayPaymentMethod =
  | (typeof GooglePayPaymentMethod)[keyof typeof GooglePayPaymentMethod]
  | (string & {});

export const googlePayPaymentMethodSchema: EnumSchema<GooglePayPaymentMethod> =
  s.enumOf<GooglePayPaymentMethod>(GooglePayPaymentMethod);
