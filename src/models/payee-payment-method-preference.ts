import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const PayeePaymentMethodPreference = {
  Unrestricted: "UNRESTRICTED",
  ImmediatePaymentRequired: "IMMEDIATE_PAYMENT_REQUIRED",
} as const;
export type PayeePaymentMethodPreference =
  | (typeof PayeePaymentMethodPreference)[keyof typeof PayeePaymentMethodPreference]
  | (string & {});

export const payeePaymentMethodPreferenceSchema: EnumSchema<PayeePaymentMethodPreference> =
  s.enumOf<PayeePaymentMethodPreference>(PayeePaymentMethodPreference);
