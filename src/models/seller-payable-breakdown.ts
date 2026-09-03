import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { netAmountBreakdownItemSchema, type NetAmountBreakdownItem } from "./net-amount-breakdown-item.js";
import { platformFeeSchema, type PlatformFee } from "./platform-fee.js";

export type SellerPayableBreakdown = {
  grossAmount?: Money;
  paypalFee?: Money;
  paypalFeeInReceivableCurrency?: Money;
  netAmount?: Money;
  netAmountInReceivableCurrency?: Money;
  platformFees?: PlatformFee[];
  netAmountBreakdown?: NetAmountBreakdownItem[];
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
