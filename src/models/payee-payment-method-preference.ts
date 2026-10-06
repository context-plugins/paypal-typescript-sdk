import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The merchant-preferred payment methods. */
export const PayeePaymentMethodPreference = {
  /** Accepts any type of payment from the customer. */
  Unrestricted: "UNRESTRICTED",
  /**
   * Accepts only immediate payment from the customer. For example, credit card, PayPal balance, or
   * instant ACH. Ensures that at the time of capture, the payment does not have the `pending`
   * status.
   */
  ImmediatePaymentRequired: "IMMEDIATE_PAYMENT_REQUIRED",
} as const;
export type PayeePaymentMethodPreference =
  | (typeof PayeePaymentMethodPreference)[keyof typeof PayeePaymentMethodPreference]
  | (string & {});

export const payeePaymentMethodPreferenceSchema: EnumSchema<PayeePaymentMethodPreference> =
  s.enumOf<PayeePaymentMethodPreference>(PayeePaymentMethodPreference);
