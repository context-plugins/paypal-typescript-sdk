import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";

export type Level2CardProcessingData = {
  invoiceId?: string;
  taxTotal?: Money;
};

export const level2CardProcessingDataSchema: Schema<Level2CardProcessingData> =
  s.object<Level2CardProcessingData>({
    invoiceId: s.optional(s.string()),
    taxTotal: s.optional(s.lazy(() => moneySchema)),
    _keysMap: {
      invoiceId: "invoice_id",
      taxTotal: "tax_total",
    },
  });
