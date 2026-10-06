import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The pricing model for tiered plan. The `tiers` parameter is required. */
export const SubscriptionPricingModel = {
  /** A volume pricing model. */
  Volume: "VOLUME",
  /** A tiered pricing model. */
  Tiered: "TIERED",
} as const;
export type SubscriptionPricingModel =
  | (typeof SubscriptionPricingModel)[keyof typeof SubscriptionPricingModel]
  | (string & {});

export const subscriptionPricingModelSchema: EnumSchema<SubscriptionPricingModel> =
  s.enumOf<SubscriptionPricingModel>(SubscriptionPricingModel);
