import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";

export type OneTimeCharge = {
  setupFee?: Money;
  shippingAmount?: Money;
  taxes?: Money;
  productPrice?: Money;
  subtotal?: Money;
  totalAmount: Money;
};

export const oneTimeChargeSchema: Schema<OneTimeCharge> = s.object<OneTimeCharge>({
  setupFee: s.optional(s.lazy(() => moneySchema)),
  shippingAmount: s.optional(s.lazy(() => moneySchema)),
  taxes: s.optional(s.lazy(() => moneySchema)),
  productPrice: s.optional(s.lazy(() => moneySchema)),
  subtotal: s.optional(s.lazy(() => moneySchema)),
  totalAmount: moneySchema,
  _keysMap: {
    setupFee: "setup_fee",
    shippingAmount: "shipping_amount",
    productPrice: "product_price",
    totalAmount: "total_amount",
  },
});
