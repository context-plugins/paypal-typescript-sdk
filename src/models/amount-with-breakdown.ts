import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { amountBreakdownSchema, type AmountBreakdown } from "./amount-breakdown.js";

export type AmountWithBreakdown = {
  currencyCode: string;
  value: string;
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
