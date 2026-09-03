import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { exchangeRateSchema, type ExchangeRate } from "./exchange-rate.js";
import { moneySchema, type Money } from "./money.js";
import { platformFeeSchema, type PlatformFee } from "./platform-fee.js";

export type SellerReceivableBreakdown = {
  grossAmount: Money;
  paypalFee?: Money;
  paypalFeeInReceivableCurrency?: Money;
  netAmount?: Money;
  receivableAmount?: Money;
  exchangeRate?: ExchangeRate;
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
