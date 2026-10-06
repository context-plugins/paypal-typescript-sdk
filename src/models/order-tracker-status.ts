import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The status of the item shipment. */
export const OrderTrackerStatus = {
  /** The shipment was cancelled and the tracking number no longer applies. */
  Cancelled: "CANCELLED",
  /**
   * The merchant has assigned a tracking number to the items being shipped from the Order. This
   * does not correspond to the carrier's actual status for the shipment. The latest status of the
   * parcel must be retrieved from the carrier.
   */
  Shipped: "SHIPPED",
} as const;
export type OrderTrackerStatus = (typeof OrderTrackerStatus)[keyof typeof OrderTrackerStatus] | (string & {});

export const orderTrackerStatusSchema: EnumSchema<OrderTrackerStatus> =
  s.enumOf<OrderTrackerStatus>(OrderTrackerStatus);
