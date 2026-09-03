import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const ItemCategory = {
  DigitalGoods: "DIGITAL_GOODS",
  PhysicalGoods: "PHYSICAL_GOODS",
  Donation: "DONATION",
} as const;
export type ItemCategory = (typeof ItemCategory)[keyof typeof ItemCategory] | (string & {});

export const itemCategorySchema: EnumSchema<ItemCategory> = s.enumOf<ItemCategory>(ItemCategory);
