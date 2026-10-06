import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { pricingModelSchema, type PricingModel } from "./pricing-model.js";

/** The pricing scheme details. */
export type PricingScheme = {
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  price?: Money;
  /** The pricing model for the billing cycle. */
  pricingModel: PricingModel;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  reloadThresholdAmount?: Money;
};

export const pricingSchemeSchema: Schema<PricingScheme> = s.object<PricingScheme>({
  price: s.optional(s.lazy(() => moneySchema)),
  pricingModel: pricingModelSchema,
  reloadThresholdAmount: s.optional(s.lazy(() => moneySchema)),
  _keysMap: {
    pricingModel: "pricing_model",
    reloadThresholdAmount: "reload_threshold_amount",
  },
});
