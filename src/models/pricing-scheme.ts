import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { pricingModelSchema, type PricingModel } from "./pricing-model.js";

export type PricingScheme = {
  price?: Money;
  pricingModel: PricingModel;
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
