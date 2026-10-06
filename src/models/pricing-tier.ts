import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";

/** The pricing tier details. */
export type PricingTier = {
  /** The starting quantity for the tier. */
  startingQuantity: string;
  /** The ending quantity for the tier. Optional for the last tier. */
  endingQuantity?: string;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
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
