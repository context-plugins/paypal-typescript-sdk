import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { cardBrandSchema, type CardBrand } from "./card-brand.js";

export type PaymentTokenRequestCard = {
  name?: string;
  number?: string;
  expiry?: string;
  securityCode?: string;
  brand?: CardBrand;
  billingAddress?: Address;
};

export const paymentTokenRequestCardSchema: Schema<PaymentTokenRequestCard> =
  s.object<PaymentTokenRequestCard>({
    name: s.optional(s.string()),
    number: s.optional(s.string()),
    expiry: s.optional(s.string()),
    securityCode: s.optional(s.string()),
    brand: s.optional(s.lazy(() => cardBrandSchema)),
    billingAddress: s.optional(s.lazy(() => addressSchema)),
    _keysMap: {
      securityCode: "security_code",
      billingAddress: "billing_address",
    },
  });
