import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { exchangeRateSchema, type ExchangeRate } from "./exchange-rate.js";
import { moneySchema, type Money } from "./money.js";

export type NetAmountBreakdownItem = {
  payableAmount?: Money;
  convertedAmount?: Money;
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
