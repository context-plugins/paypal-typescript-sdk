import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const SubscriptionPricingModel = {
  Volume: "VOLUME",
  Tiered: "TIERED",
} as const;
export type SubscriptionPricingModel =
  | (typeof SubscriptionPricingModel)[keyof typeof SubscriptionPricingModel]
  | (string & {});

export const subscriptionPricingModelSchema: EnumSchema<SubscriptionPricingModel> =
  s.enumOf<SubscriptionPricingModel>(SubscriptionPricingModel);
