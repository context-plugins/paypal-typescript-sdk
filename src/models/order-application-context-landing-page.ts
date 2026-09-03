import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const OrderApplicationContextLandingPage = {
  Login: "LOGIN",
  Billing: "BILLING",
  NoPreference: "NO_PREFERENCE",
} as const;
export type OrderApplicationContextLandingPage =
  | (typeof OrderApplicationContextLandingPage)[keyof typeof OrderApplicationContextLandingPage]
  | (string & {});

export const orderApplicationContextLandingPageSchema: EnumSchema<OrderApplicationContextLandingPage> =
  s.enumOf<OrderApplicationContextLandingPage>(OrderApplicationContextLandingPage);
