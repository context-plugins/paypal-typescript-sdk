import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";

export type AmountBreakdown = {
  itemTotal?: Money;
  shipping?: Money;
  handling?: Money;
  taxTotal?: Money;
  insurance?: Money;
  shippingDiscount?: Money;
  discount?: Money;
};

export const amountBreakdownSchema: Schema<AmountBreakdown> = s.object<AmountBreakdown>({
  itemTotal: s.optional(s.lazy(() => moneySchema)),
  shipping: s.optional(s.lazy(() => moneySchema)),
  handling: s.optional(s.lazy(() => moneySchema)),
  taxTotal: s.optional(s.lazy(() => moneySchema)),
  insurance: s.optional(s.lazy(() => moneySchema)),
  shippingDiscount: s.optional(s.lazy(() => moneySchema)),
  discount: s.optional(s.lazy(() => moneySchema)),
  _keysMap: {
    itemTotal: "item_total",
    taxTotal: "tax_total",
    shippingDiscount: "shipping_discount",
  },
});
