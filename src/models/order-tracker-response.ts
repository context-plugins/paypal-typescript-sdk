import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { orderTrackerItemSchema, type OrderTrackerItem } from "./order-tracker-item.js";
import { orderTrackerStatusSchema, type OrderTrackerStatus } from "./order-tracker-status.js";

/** The tracking response on creation of tracker. */
export type OrderTrackerResponse = {
  /** The tracker id. */
  id?: string;
  /** The status of the item shipment. */
  status?: OrderTrackerStatus;
  /** An array of details of items in the shipment. */
  items?: OrderTrackerItem[];
  /** An array of request-related HATEOAS links. */
  links?: LinkDescription[];
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  createTime?: string;
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  updateTime?: string;
};

export const orderTrackerResponseSchema: Schema<OrderTrackerResponse> = s.object<OrderTrackerResponse>({
  id: s.optional(s.string()),
  status: s.optional(s.lazy(() => orderTrackerStatusSchema)),
  items: s.optional(s.array(s.lazy(() => orderTrackerItemSchema))),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  createTime: s.optional(s.string()),
  updateTime: s.optional(s.string()),
  _keysMap: {
    createTime: "create_time",
    updateTime: "update_time",
  },
});
