import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { cardBrandSchema, type CardBrand } from "./card-brand.js";
import { cardTypeSchema, type CardType } from "./card-type.js";

export type ApplePayTokenizedCard = {
  name?: string;
  number?: string;
  expiry?: string;
  cardType?: CardBrand;
  type?: CardType;
  brand?: CardBrand;
  billingAddress?: Address;
};

export const applePayTokenizedCardSchema: Schema<ApplePayTokenizedCard> = s.object<ApplePayTokenizedCard>({
  name: s.optional(s.string()),
  number: s.optional(s.string()),
  expiry: s.optional(s.string()),
  cardType: s.optional(s.lazy(() => cardBrandSchema)),
  type: s.optional(s.lazy(() => cardTypeSchema)),
  brand: s.optional(s.lazy(() => cardBrandSchema)),
  billingAddress: s.optional(s.lazy(() => addressSchema)),
  _keysMap: {
    cardType: "card_type",
    billingAddress: "billing_address",
  },
});
