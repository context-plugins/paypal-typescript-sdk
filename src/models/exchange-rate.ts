import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type ExchangeRate = {
  sourceCurrency?: string;
  targetCurrency?: string;
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
