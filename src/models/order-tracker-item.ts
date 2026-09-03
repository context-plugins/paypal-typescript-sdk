import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { universalProductCodeSchema, type UniversalProductCode } from "./universal-product-code.js";

export type OrderTrackerItem = {
  name?: string;
  quantity?: string;
  sku?: string;
  url?: string;
  imageUrl?: string;
  upc?: UniversalProductCode;
};

export const orderTrackerItemSchema: Schema<OrderTrackerItem> = s.object<OrderTrackerItem>({
  name: s.optional(s.string()),
  quantity: s.optional(s.string()),
  sku: s.optional(s.string()),
  url: s.optional(s.string()),
  imageUrl: s.optional(s.string()),
  upc: s.optional(s.lazy(() => universalProductCodeSchema)),
  _keysMap: {
    imageUrl: "image_url",
  },
});
