import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { universalProductCodeSchema, type UniversalProductCode } from "./universal-product-code.js";

/** The details of the items in the shipment. */
export type OrderTrackerItem = {
  /** The item name or title. */
  name?: string;
  /** The item quantity. Must be a whole number. */
  quantity?: string;
  /** The stock keeping unit (SKU) for the item. This can contain unicode characters. */
  sku?: string;
  /** The URL to the item being purchased. Visible to buyer and used in buyer experiences. */
  url?: string;
  /**
   * The URL of the item's image. File type and size restrictions apply. An image that violates
   * these restrictions will not be honored.
   */
  imageUrl?: string;
  /** The Universal Product Code of the item. */
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
