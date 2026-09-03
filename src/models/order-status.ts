import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const OrderStatus = {
  Created: "CREATED",
  Saved: "SAVED",
  Approved: "APPROVED",
  Voided: "VOIDED",
  Completed: "COMPLETED",
  PayerActionRequired: "PAYER_ACTION_REQUIRED",
} as const;
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus] | (string & {});

export const orderStatusSchema: EnumSchema<OrderStatus> = s.enumOf<OrderStatus>(OrderStatus);
