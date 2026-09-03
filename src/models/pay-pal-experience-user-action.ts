import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const PayPalExperienceUserAction = {
  Continue: "CONTINUE",
  PayNow: "PAY_NOW",
} as const;
export type PayPalExperienceUserAction =
  | (typeof PayPalExperienceUserAction)[keyof typeof PayPalExperienceUserAction]
  | (string & {});

export const payPalExperienceUserActionSchema: EnumSchema<PayPalExperienceUserAction> =
  s.enumOf<PayPalExperienceUserAction>(PayPalExperienceUserAction);
