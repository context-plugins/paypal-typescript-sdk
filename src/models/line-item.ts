import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { orderBillingPlanSchema, type OrderBillingPlan } from "./order-billing-plan.js";
import { universalProductCodeSchema, type UniversalProductCode } from "./universal-product-code.js";

export type LineItem = {
  name: string;
  quantity: string;
  description?: string;
  sku?: string;
  url?: string;
  imageUrl?: string;
  upc?: UniversalProductCode;
  billingPlan?: OrderBillingPlan;
  unitAmount?: Money;
  tax?: Money;
  commodityCode?: string;
  discountAmount?: Money;
  totalAmount?: Money;
  unitOfMeasure?: string;
};

export const lineItemSchema: Schema<LineItem> = s.object<LineItem>({
  name: s.string(),
  quantity: s.string(),
  description: s.optional(s.string()),
  sku: s.optional(s.string()),
  url: s.optional(s.string()),
  imageUrl: s.optional(s.string()),
  upc: s.optional(s.lazy(() => universalProductCodeSchema)),
  billingPlan: s.optional(s.lazy(() => orderBillingPlanSchema)),
  unitAmount: s.optional(s.lazy(() => moneySchema)),
  tax: s.optional(s.lazy(() => moneySchema)),
  commodityCode: s.optional(s.string()),
  discountAmount: s.optional(s.lazy(() => moneySchema)),
  totalAmount: s.optional(s.lazy(() => moneySchema)),
  unitOfMeasure: s.optional(s.string()),
  _keysMap: {
    imageUrl: "image_url",
    billingPlan: "billing_plan",
    unitAmount: "unit_amount",
    commodityCode: "commodity_code",
    discountAmount: "discount_amount",
    totalAmount: "total_amount",
    unitOfMeasure: "unit_of_measure",
  },
});
