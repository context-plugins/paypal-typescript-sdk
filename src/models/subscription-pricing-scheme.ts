import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { pricingTierSchema, type PricingTier } from "./pricing-tier.js";
import {
  subscriptionPricingModelSchema,
  type SubscriptionPricingModel,
} from "./subscription-pricing-model.js";

export type SubscriptionPricingScheme = {
  version?: number;
  fixedPrice?: Money;
  pricingModel?: SubscriptionPricingModel;
  tiers?: PricingTier[];
  createTime?: string;
  updateTime?: string;
};

export const subscriptionPricingSchemeSchema: Schema<SubscriptionPricingScheme> =
  s.object<SubscriptionPricingScheme>({
    version: s.optional(s.number()),
    fixedPrice: s.optional(s.lazy(() => moneySchema)),
    pricingModel: s.optional(s.lazy(() => subscriptionPricingModelSchema)),
    tiers: s.optional(s.array(s.lazy(() => pricingTierSchema))),
    createTime: s.optional(s.string()),
    updateTime: s.optional(s.string()),
    _keysMap: {
      fixedPrice: "fixed_price",
      pricingModel: "pricing_model",
      createTime: "create_time",
      updateTime: "update_time",
    },
  });
