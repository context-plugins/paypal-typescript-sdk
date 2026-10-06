import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { pricingTierSchema, type PricingTier } from "./pricing-tier.js";
import {
  subscriptionPricingModelSchema,
  type SubscriptionPricingModel,
} from "./subscription-pricing-model.js";

/** The pricing scheme details. */
export type SubscriptionPricingScheme = {
  /** The version of the pricing scheme. */
  version?: number;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  fixedPrice?: Money;
  /** The pricing model for tiered plan. The `tiers` parameter is required. */
  pricingModel?: SubscriptionPricingModel;
  /**
   * An array of pricing tiers which are used for billing volume/tiered plans. pricing_model field
   * has to be specified.
   */
  tiers?: PricingTier[];
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  createTime?: string;
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  updateTime?: string;
};

export const subscriptionPricingSchemeSchema: Schema<SubscriptionPricingScheme> =
  s.object<SubscriptionPricingScheme>({
    version: s.optional(s.int()),
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
