import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const OrderApplicationContextUserAction = {
  Continue: "CONTINUE",
  PayNow: "PAY_NOW",
} as const;
export type OrderApplicationContextUserAction =
  | (typeof OrderApplicationContextUserAction)[keyof typeof OrderApplicationContextUserAction]
  | (string & {});

export const orderApplicationContextUserActionSchema: EnumSchema<OrderApplicationContextUserAction> =
  s.enumOf<OrderApplicationContextUserAction>(OrderApplicationContextUserAction);
