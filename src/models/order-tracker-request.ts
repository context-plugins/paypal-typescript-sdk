import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { orderTrackerItemSchema, type OrderTrackerItem } from "./order-tracker-item.js";
import { shipmentCarrierSchema, type ShipmentCarrier } from "./shipment-carrier.js";

export type OrderTrackerRequest = {
  trackingNumber?: string;
  carrier?: ShipmentCarrier;
  carrierNameOther?: string;
  captureId: string;
  notifyPayer?: boolean;
  items?: OrderTrackerItem[];
};

export const orderTrackerRequestSchema: Schema<OrderTrackerRequest> = s.object<OrderTrackerRequest>({
  trackingNumber: s.optional(s.string()),
  carrier: s.optional(s.lazy(() => shipmentCarrierSchema)),
  carrierNameOther: s.optional(s.string()),
  captureId: s.string(),
  notifyPayer: s.optional(s.boolean()),
  items: s.optional(s.array(s.lazy(() => orderTrackerItemSchema))),
  _keysMap: {
    trackingNumber: "tracking_number",
    carrierNameOther: "carrier_name_other",
    captureId: "capture_id",
    notifyPayer: "notify_payer",
  },
});
