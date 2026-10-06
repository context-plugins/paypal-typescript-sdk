import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/**
 * The exchange rate that determines the amount to convert from one currency to another currency.
 */
export type ExchangeRate = {
  /**
   * The [three-character ISO-4217 currency code](/api/rest/reference/currency-codes/) that
   * identifies the currency.
   */
  sourceCurrency?: string;
  /**
   * The [three-character ISO-4217 currency code](/api/rest/reference/currency-codes/) that
   * identifies the currency.
   */
  targetCurrency?: string;
  /**
   * The target currency amount. Equivalent to one unit of the source currency. Formatted as integer
   * or decimal value with one to 15 digits to the right of the decimal point.
   */
  value?: string;
};

export const exchangeRateSchema: Schema<ExchangeRate> = s.object<ExchangeRate>({
  sourceCurrency: s.optional(s.string()),
  targetCurrency: s.optional(s.string()),
  value: s.optional(s.string()),
  _keysMap: {
    sourceCurrency: "source_currency",
    targetCurrency: "target_currency",
  },
});
