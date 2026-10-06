import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { orderBillingPlanSchema, type OrderBillingPlan } from "./order-billing-plan.js";
import { universalProductCodeSchema, type UniversalProductCode } from "./universal-product-code.js";

/**
 * The line items for this purchase. If your merchant account has been configured for Level 3
 * processing this field will be passed to the processor on your behalf.
 */
export type LineItem = {
  /** The item name or title. */
  name: string;
  /** The item quantity. Must be a whole number. */
  quantity: string;
  /** The detailed item description. */
  description?: string;
  /** The stock keeping unit (SKU) for the item. */
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
  /**
   * Metadata for merchant-managed recurring billing plans. Valid only during the saved payment
   * method token or billing agreement creation.
   */
  billingPlan?: OrderBillingPlan;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  unitAmount?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  tax?: Money;
  /**
   * Code used to classify items purchased and track the total amount spent across various
   * categories of products and services. Different corporate purchasing organizations may use
   * different standards, but the United Nations Standard Products and Services Code (UNSPSC) is
   * frequently used.
   */
  commodityCode?: string;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  discountAmount?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  totalAmount?: Money;
  /**
   * Unit of measure is a standard used to express the magnitude of a quantity in international
   * trade. Most commonly used (but not limited to) examples are: Acre (ACR), Ampere (AMP),
   * Centigram (CGM), Centimetre (CMT), Cubic inch (INQ), Cubic metre (MTQ), Fluid ounce (OZA), Foot
   * (FOT), Hour (HUR), Item (ITM), Kilogram (KGM), Kilometre (KMT), Kilowatt (KWT), Liquid gallon
   * (GLL), Liter (LTR), Pounds (LBS), Square foot (FTK).
   */
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
