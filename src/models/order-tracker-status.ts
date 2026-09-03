import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const OrderTrackerStatus = {
  Cancelled: "CANCELLED",
  Shipped: "SHIPPED",
} as const;
export type OrderTrackerStatus = (typeof OrderTrackerStatus)[keyof typeof OrderTrackerStatus] | (string & {});

export const orderTrackerStatusSchema: EnumSchema<OrderTrackerStatus> =
  s.enumOf<OrderTrackerStatus>(OrderTrackerStatus);
