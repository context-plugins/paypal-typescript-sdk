import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { amountBreakdownSchema, type AmountBreakdown } from "./amount-breakdown.js";

/**
 * The total order amount with an optional breakdown that provides details, such as the total item
 * amount, total tax amount, shipping, handling, insurance, and discounts, if any. If you specify
 * `amount.breakdown`, the amount equals `item_total` plus `tax_total` plus `shipping` plus
 * `handling` plus `insurance` minus `shipping_discount` minus discount. The amount must be a
 * positive number. For listed of supported currencies and decimal precision, see the PayPal REST
 * APIs Currency Codes.
 */
export type AmountWithBreakdown = {
  /**
   * The [three-character ISO-4217 currency code](/api/rest/reference/currency-codes/) that
   * identifies the currency.
   */
  currencyCode: string;
  /**
   * The value, which might be: An integer for currencies like `JPY` that are not typically
   * fractional. A decimal fraction for currencies like `TND` that are subdivided into thousandths.
   * For the required number of decimal places for a currency code, see [Currency
   * Codes](/api/rest/reference/currency-codes/).
   */
  value: string;
  /**
   * The breakdown of the amount. Breakdown provides details such as total item amount, total tax
   * amount, shipping, handling, insurance, and discounts, if any.
   */
  breakdown?: AmountBreakdown;
};

export const amountWithBreakdownSchema: Schema<AmountWithBreakdown> = s.object<AmountWithBreakdown>({
  currencyCode: s.string(),
  value: s.string(),
  breakdown: s.optional(s.lazy(() => amountBreakdownSchema)),
  _keysMap: {
    currencyCode: "currency_code",
  },
});
