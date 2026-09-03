import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";

export type PricingTier = {
  startingQuantity: string;
  endingQuantity?: string;
  amount: Money;
};

export const pricingTierSchema: Schema<PricingTier> = s.object<PricingTier>({
  startingQuantity: s.string(),
  endingQuantity: s.optional(s.string()),
  amount: moneySchema,
  _keysMap: {
    startingQuantity: "starting_quantity",
    endingQuantity: "ending_quantity",
  },
});
