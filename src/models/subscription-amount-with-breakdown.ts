import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";

/** The breakdown details for the amount. Includes the gross, tax, fee, and shipping amounts. */
export type SubscriptionAmountWithBreakdown = {
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  grossAmount: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  totalItemAmount?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  feeAmount?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  shippingAmount?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  taxAmount?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  netAmount?: Money;
};

export const subscriptionAmountWithBreakdownSchema: Schema<SubscriptionAmountWithBreakdown> =
  s.object<SubscriptionAmountWithBreakdown>({
    grossAmount: moneySchema,
    totalItemAmount: s.optional(s.lazy(() => moneySchema)),
    feeAmount: s.optional(s.lazy(() => moneySchema)),
    shippingAmount: s.optional(s.lazy(() => moneySchema)),
    taxAmount: s.optional(s.lazy(() => moneySchema)),
    netAmount: s.optional(s.lazy(() => moneySchema)),
    _keysMap: {
      grossAmount: "gross_amount",
      totalItemAmount: "total_item_amount",
      feeAmount: "fee_amount",
      shippingAmount: "shipping_amount",
      taxAmount: "tax_amount",
      netAmount: "net_amount",
    },
  });
