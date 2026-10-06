import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The type of landing page to show on the PayPal site for customer checkout. */
export const PayPalExperienceLandingPage = {
  /**
   * When the customer clicks PayPal Checkout, the customer is redirected to a page to log in to
   * PayPal and approve the payment.
   */
  Login: "LOGIN",
  /**
   * When the customer clicks PayPal Checkout, the customer is redirected to a page to enter credit
   * or debit card and other relevant billing information required to complete the purchase. This
   * option has previously been also called as 'BILLING'
   */
  GuestCheckout: "GUEST_CHECKOUT",
  /**
   * When the customer clicks PayPal Checkout, the customer is redirected to either a page to log in
   * to PayPal and approve the payment or to a page to enter credit or debit card and other relevant
   * billing information required to complete the purchase, depending on their previous interaction
   * with PayPal.
   */
  NoPreference: "NO_PREFERENCE",
  /**
   * DEPRECATED - please use GUEST_CHECKOUT. All implementations of 'BILLING' will be routed to
   * 'GUEST_CHECKOUT'. When the customer clicks PayPal Checkout, the customer is redirected to a
   * page to enter credit or debit card and other relevant billing information required to complete
   * the purchase.
   */
  Billing: "BILLING",
} as const;
export type PayPalExperienceLandingPage =
  | (typeof PayPalExperienceLandingPage)[keyof typeof PayPalExperienceLandingPage]
  | (string & {});

export const payPalExperienceLandingPageSchema: EnumSchema<PayPalExperienceLandingPage> =
  s.enumOf<PayPalExperienceLandingPage>(PayPalExperienceLandingPage);
