import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { exchangeRateSchema, type ExchangeRate } from "./exchange-rate.js";
import { moneySchema, type Money } from "./money.js";
import { platformFeeSchema, type PlatformFee } from "./platform-fee.js";

/**
 * The detailed breakdown of the capture activity. This is not available for transactions that are
 * in pending state.
 */
export type SellerReceivableBreakdown = {
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  grossAmount: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  paypalFee?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  paypalFeeInReceivableCurrency?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  netAmount?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  receivableAmount?: Money;
  /**
   * The exchange rate that determines the amount to convert from one currency to another currency.
   */
  exchangeRate?: ExchangeRate;
  /**
   * An array of platform or partner fees, commissions, or brokerage fees that associated with the
   * captured payment.
   */
  platformFees?: PlatformFee[];
};

export const sellerReceivableBreakdownSchema: Schema<SellerReceivableBreakdown> =
  s.object<SellerReceivableBreakdown>({
    grossAmount: moneySchema,
    paypalFee: s.optional(s.lazy(() => moneySchema)),
    paypalFeeInReceivableCurrency: s.optional(s.lazy(() => moneySchema)),
    netAmount: s.optional(s.lazy(() => moneySchema)),
    receivableAmount: s.optional(s.lazy(() => moneySchema)),
    exchangeRate: s.optional(s.lazy(() => exchangeRateSchema)),
    platformFees: s.optional(s.array(s.lazy(() => platformFeeSchema))),
    _keysMap: {
      grossAmount: "gross_amount",
      paypalFee: "paypal_fee",
      paypalFeeInReceivableCurrency: "paypal_fee_in_receivable_currency",
      netAmount: "net_amount",
      receivableAmount: "receivable_amount",
      exchangeRate: "exchange_rate",
      platformFees: "platform_fees",
    },
  });
