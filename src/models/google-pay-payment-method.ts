import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const GooglePayPaymentMethod = {
  Card: "CARD",
} as const;
export type GooglePayPaymentMethod =
  | (typeof GooglePayPaymentMethod)[keyof typeof GooglePayPaymentMethod]
  | (string & {});

export const googlePayPaymentMethodSchema: EnumSchema<GooglePayPaymentMethod> =
  s.enumOf<GooglePayPaymentMethod>(GooglePayPaymentMethod);
