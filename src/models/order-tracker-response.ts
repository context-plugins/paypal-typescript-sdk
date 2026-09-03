import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { orderTrackerItemSchema, type OrderTrackerItem } from "./order-tracker-item.js";
import { orderTrackerStatusSchema, type OrderTrackerStatus } from "./order-tracker-status.js";

export type OrderTrackerResponse = {
  id?: string;
  status?: OrderTrackerStatus;
  items?: OrderTrackerItem[];
  links?: LinkDescription[];
  createTime?: string;
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
