import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { auctionInformationSchema, type AuctionInformation } from "./auction-information.js";
import { cartInformationSchema, type CartInformation } from "./cart-information.js";
import { incentiveInformationSchema, type IncentiveInformation } from "./incentive-information.js";
import { payerInformationSchema, type PayerInformation } from "./payer-information.js";
import { shippingInformationSchema, type ShippingInformation } from "./shipping-information.js";
import { storeInformationSchema, type StoreInformation } from "./store-information.js";
import { transactionInformationSchema, type TransactionInformation } from "./transaction-information.js";

export type TransactionDetails = {
  transactionInfo?: TransactionInformation;
  payerInfo?: PayerInformation;
  shippingInfo?: ShippingInformation;
  cartInfo?: CartInformation;
  storeInfo?: StoreInformation;
  auctionInfo?: AuctionInformation;
  incentiveInfo?: IncentiveInformation;
};

export const transactionDetailsSchema: Schema<TransactionDetails> = s.object<TransactionDetails>({
  transactionInfo: s.optional(s.lazy(() => transactionInformationSchema)),
  payerInfo: s.optional(s.lazy(() => payerInformationSchema)),
  shippingInfo: s.optional(s.lazy(() => shippingInformationSchema)),
  cartInfo: s.optional(s.lazy(() => cartInformationSchema)),
  storeInfo: s.optional(s.lazy(() => storeInformationSchema)),
  auctionInfo: s.optional(s.lazy(() => auctionInformationSchema)),
  incentiveInfo: s.optional(s.lazy(() => incentiveInformationSchema)),
  _keysMap: {
    transactionInfo: "transaction_info",
    payerInfo: "payer_info",
    shippingInfo: "shipping_info",
    cartInfo: "cart_info",
    storeInfo: "store_info",
    auctionInfo: "auction_info",
    incentiveInfo: "incentive_info",
  },
});
