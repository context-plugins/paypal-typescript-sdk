import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const PricingModel = {
  Fixed: "FIXED",
  Variable: "VARIABLE",
  AutoReload: "AUTO_RELOAD",
} as const;
export type PricingModel = (typeof PricingModel)[keyof typeof PricingModel] | (string & {});

export const pricingModelSchema: EnumSchema<PricingModel> = s.enumOf<PricingModel>(PricingModel);
