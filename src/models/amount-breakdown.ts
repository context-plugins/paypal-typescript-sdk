import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";

/**
 * The breakdown of the amount. Breakdown provides details such as total item amount, total tax
 * amount, shipping, handling, insurance, and discounts, if any.
 */
export type AmountBreakdown = {
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  itemTotal?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  shipping?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  handling?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  taxTotal?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  insurance?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  shippingDiscount?: Money;
  /**
   * The discount amount and currency code. For list of supported currencies and decimal precision,
   * see the PayPal REST APIs Currency Codes.
   */
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
