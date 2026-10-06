import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** The currency and amount for a financial transaction, such as a balance or payment due. */
export type Money = {
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
};

export const moneySchema: Schema<Money> = s.object<Money>({
  currencyCode: s.string(),
  value: s.string(),
  _keysMap: {
    currencyCode: "currency_code",
  },
});
