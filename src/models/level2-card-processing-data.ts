import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";

/**
 * The level 2 card processing data collections. If your merchant account has been configured for
 * Level 2 processing this field will be passed to the processor on your behalf. Please contact your
 * PayPal Technical Account Manager to define level 2 data for your business.
 */
export type Level2CardProcessingData = {
  /**
   * Use this field to pass a purchase identification value of up to 127 ASCII characters. The
   * length of this field will be adjusted to meet network specifications (25chars for Visa and
   * Mastercard, 17chars for Amex), and the original invoice ID will still be displayed in your
   * existing reports.
   */
  invoiceId?: string;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
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
