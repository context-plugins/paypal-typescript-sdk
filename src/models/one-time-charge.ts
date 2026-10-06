import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";

/** The one-time charge info at the time of checkout. */
export type OneTimeCharge = {
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  setupFee?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  shippingAmount?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  taxes?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  productPrice?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  subtotal?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
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
