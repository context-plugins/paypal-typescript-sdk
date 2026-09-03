import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { cardBrandSchema, type CardBrand } from "./card-brand.js";
import { cardTypeSchema, type CardType } from "./card-type.js";

export type ApplePayRequestCard = {
  type?: CardType;
  brand?: CardBrand;
  billingAddress?: Address;
};

export const applePayRequestCardSchema: Schema<ApplePayRequestCard> = s.object<ApplePayRequestCard>({
  type: s.optional(s.lazy(() => cardTypeSchema)),
  brand: s.optional(s.lazy(() => cardBrandSchema)),
  billingAddress: s.optional(s.lazy(() => addressSchema)),
  _keysMap: {
    billingAddress: "billing_address",
  },
});
