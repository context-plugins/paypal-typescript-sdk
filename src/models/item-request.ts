import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { itemCategorySchema, type ItemCategory } from "./item-category.js";
import { moneySchema, type Money } from "./money.js";
import { orderBillingPlanSchema, type OrderBillingPlan } from "./order-billing-plan.js";
import { universalProductCodeSchema, type UniversalProductCode } from "./universal-product-code.js";

/** The details for the items to be purchased. */
export type ItemRequest = {
  /** The item name or title. */
  name: string;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  unitAmount: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  tax?: Money;
  /** The item quantity. Must be a whole number. */
  quantity: string;
  /**
   * This field supports up to 4000 characters, but any content beyond 2048 characters (including
   * spaces) will be truncated. The 2048 character limit is reflected in the response representation
   * of this field.
   */
  description?: string;
  /** The stock keeping unit (SKU) for the item. */
  sku?: string;
  /** The URL to the item being purchased. Visible to buyer and used in buyer experiences. */
  url?: string;
  /** The item category type. */
  category?: ItemCategory;
  /**
   * The URL of the item's image. File type and size restrictions apply. An image that violates
   * these restrictions will not be honored.
   */
  imageUrl?: string;
  /** The Universal Product Code of the item. */
  upc?: UniversalProductCode;
  /**
   * Metadata for merchant-managed recurring billing plans. Valid only during the saved payment
   * method token or billing agreement creation.
   */
  billingPlan?: OrderBillingPlan;
};

export const itemRequestSchema: Schema<ItemRequest> = s.object<ItemRequest>({
  name: s.string(),
  unitAmount: moneySchema,
  tax: s.optional(s.lazy(() => moneySchema)),
  quantity: s.string(),
  description: s.optional(s.string()),
  sku: s.optional(s.string()),
  url: s.optional(s.string()),
  category: s.optional(s.lazy(() => itemCategorySchema)),
  imageUrl: s.optional(s.string()),
  upc: s.optional(s.lazy(() => universalProductCodeSchema)),
  billingPlan: s.optional(s.lazy(() => orderBillingPlanSchema)),
  _keysMap: {
    unitAmount: "unit_amount",
    imageUrl: "image_url",
    billingPlan: "billing_plan",
  },
});
