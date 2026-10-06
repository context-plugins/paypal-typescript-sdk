import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { exchangeRateSchema, type ExchangeRate } from "./exchange-rate.js";
import { moneySchema, type Money } from "./money.js";

/**
 * The net amount. Returned when the currency of the refund is different from the currency of the
 * PayPal account where the merchant holds their funds.
 */
export type NetAmountBreakdownItem = {
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  payableAmount?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  convertedAmount?: Money;
  /**
   * The exchange rate that determines the amount to convert from one currency to another currency.
   */
  exchangeRate?: ExchangeRate;
};

export const netAmountBreakdownItemSchema: Schema<NetAmountBreakdownItem> = s.object<NetAmountBreakdownItem>({
  payableAmount: s.optional(s.lazy(() => moneySchema)),
  convertedAmount: s.optional(s.lazy(() => moneySchema)),
  exchangeRate: s.optional(s.lazy(() => exchangeRateSchema)),
  _keysMap: {
    payableAmount: "payable_amount",
    convertedAmount: "converted_amount",
    exchangeRate: "exchange_rate",
  },
});
