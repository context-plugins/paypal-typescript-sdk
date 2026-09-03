import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { cardBrandSchema, type CardBrand } from "./card-brand.js";
import { cardTypeSchema, type CardType } from "./card-type.js";

export type ApplePayCard = {
  name?: string;
  lastDigits?: string;
  type?: CardType;
  brand?: CardBrand;
  billingAddress?: Address;
};

export const applePayCardSchema: Schema<ApplePayCard> = s.object<ApplePayCard>({
  name: s.optional(s.string()),
  lastDigits: s.optional(s.string()),
  type: s.optional(s.lazy(() => cardTypeSchema)),
  brand: s.optional(s.lazy(() => cardBrandSchema)),
  billingAddress: s.optional(s.lazy(() => addressSchema)),
  _keysMap: {
    lastDigits: "last_digits",
    billingAddress: "billing_address",
  },
});
