import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The item category type. */
export const ItemCategory = {
  /**
   * Goods that are stored, delivered, and used in their electronic format. This value is not
   * currently supported for API callers that leverage the PayPal for Commerce Platform product.
   */
  DigitalGoods: "DIGITAL_GOODS",
  /** A tangible item that can be shipped with proof of delivery. */
  PhysicalGoods: "PHYSICAL_GOODS",
  /**
   * A contribution or gift for which no good or service is exchanged, usually to a not for profit
   * organization.
   */
  Donation: "DONATION",
} as const;
export type ItemCategory = (typeof ItemCategory)[keyof typeof ItemCategory] | (string & {});

export const itemCategorySchema: EnumSchema<ItemCategory> = s.enumOf<ItemCategory>(ItemCategory);
