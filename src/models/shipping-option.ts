import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { shippingTypeSchema, type ShippingType } from "./shipping-type.js";

export type ShippingOption = {
  id: string;
  label: string;
  type?: ShippingType;
  amount?: Money;
  selected: boolean;
};

export const shippingOptionSchema: Schema<ShippingOption> = s.object<ShippingOption>({
  id: s.string(),
  label: s.string(),
  type: s.optional(s.lazy(() => shippingTypeSchema)),
  amount: s.optional(s.lazy(() => moneySchema)),
  selected: s.boolean(),
});
