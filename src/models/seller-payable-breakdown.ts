import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { netAmountBreakdownItemSchema, type NetAmountBreakdownItem } from "./net-amount-breakdown-item.js";
import { platformFeeSchema, type PlatformFee } from "./platform-fee.js";

/** The breakdown of the refund. */
export type SellerPayableBreakdown = {
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  grossAmount?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  paypalFee?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  paypalFeeInReceivableCurrency?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  netAmount?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  netAmountInReceivableCurrency?: Money;
  /** An array of platform or partner fees, commissions, or brokerage fees for the refund. */
  platformFees?: PlatformFee[];
  /**
   * An array of breakdown values for the net amount. Returned when the currency of the refund is
   * different from the currency of the PayPal account where the payee holds their funds.
   */
  netAmountBreakdown?: NetAmountBreakdownItem[];
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  totalRefundedAmount?: Money;
};

export const sellerPayableBreakdownSchema: Schema<SellerPayableBreakdown> = s.object<SellerPayableBreakdown>({
  grossAmount: s.optional(s.lazy(() => moneySchema)),
  paypalFee: s.optional(s.lazy(() => moneySchema)),
  paypalFeeInReceivableCurrency: s.optional(s.lazy(() => moneySchema)),
  netAmount: s.optional(s.lazy(() => moneySchema)),
  netAmountInReceivableCurrency: s.optional(s.lazy(() => moneySchema)),
  platformFees: s.optional(s.array(s.lazy(() => platformFeeSchema))),
  netAmountBreakdown: s.optional(s.array(s.lazy(() => netAmountBreakdownItemSchema))),
  totalRefundedAmount: s.optional(s.lazy(() => moneySchema)),
  _keysMap: {
    grossAmount: "gross_amount",
    paypalFee: "paypal_fee",
    paypalFeeInReceivableCurrency: "paypal_fee_in_receivable_currency",
    netAmount: "net_amount",
    netAmountInReceivableCurrency: "net_amount_in_receivable_currency",
    platformFees: "platform_fees",
    netAmountBreakdown: "net_amount_breakdown",
    totalRefundedAmount: "total_refunded_amount",
  },
});
