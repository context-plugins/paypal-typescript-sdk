import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { itemCategorySchema, type ItemCategory } from "./item-category.js";
import { moneySchema, type Money } from "./money.js";
import { orderBillingPlanSchema, type OrderBillingPlan } from "./order-billing-plan.js";
import { universalProductCodeSchema, type UniversalProductCode } from "./universal-product-code.js";

export type ItemRequest = {
  name: string;
  unitAmount: Money;
  tax?: Money;
  quantity: string;
  description?: string;
  sku?: string;
  url?: string;
  category?: ItemCategory;
  imageUrl?: string;
  upc?: UniversalProductCode;
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
