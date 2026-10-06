import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { orderTrackerItemSchema, type OrderTrackerItem } from "./order-tracker-item.js";
import { shipmentCarrierSchema, type ShipmentCarrier } from "./shipment-carrier.js";

/** The tracking details of an order. */
export type OrderTrackerRequest = {
  /** The tracking number for the shipment. This property supports Unicode. */
  trackingNumber?: string;
  /**
   * The carrier for the shipment. Some carriers have a global version as well as local
   * subsidiaries. The subsidiaries are repeated over many countries and might also have an entry in
   * the global list. Choose the carrier for your country. If the carrier is not available for your
   * country, choose the global version of the carrier. If your carrier name is not in the list, set
   * `carrier` to `OTHER` and set carrier name in `carrier_name_other`. For allowed values, see
   * Carriers.
   */
  carrier?: ShipmentCarrier;
  /**
   * The name of the carrier for the shipment. Provide this value only if the carrier parameter is
   * OTHER. This property supports Unicode.
   */
  carrierNameOther?: string;
  /** The PayPal capture ID. */
  captureId: string;
  /**
   * If true, PayPal will send an email notification to the payer of the PayPal transaction. The
   * email contains the tracking details provided through the Orders tracking API request.
   * Independent of any value passed for `notify_payer`, the payer may receive tracking
   * notifications within the PayPal app, based on the user's notification preferences.
   *
   * @default false
   */
  notifyPayer?: boolean;
  /** An array of details of items in the shipment. */
  items?: OrderTrackerItem[];
};

export const orderTrackerRequestSchema: Schema<OrderTrackerRequest> = s.object<OrderTrackerRequest>({
  trackingNumber: s.optional(s.string()),
  carrier: s.optional(s.lazy(() => shipmentCarrierSchema)),
  carrierNameOther: s.optional(s.string()),
  captureId: s.string(),
  notifyPayer: s.defaulted(s.boolean(), false),
  items: s.optional(s.array(s.lazy(() => orderTrackerItemSchema))),
  _keysMap: {
    trackingNumber: "tracking_number",
    carrierNameOther: "carrier_name_other",
    captureId: "capture_id",
    notifyPayer: "notify_payer",
  },
});
