import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const PayPalExperienceLandingPage = {
  Login: "LOGIN",
  GuestCheckout: "GUEST_CHECKOUT",
  NoPreference: "NO_PREFERENCE",
  Billing: "BILLING",
} as const;
export type PayPalExperienceLandingPage =
  | (typeof PayPalExperienceLandingPage)[keyof typeof PayPalExperienceLandingPage]
  | (string & {});

export const payPalExperienceLandingPageSchema: EnumSchema<PayPalExperienceLandingPage> =
  s.enumOf<PayPalExperienceLandingPage>(PayPalExperienceLandingPage);
