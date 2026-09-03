import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  applePayPaymentDataTypeSchema,
  type ApplePayPaymentDataType,
} from "./apple-pay-payment-data-type.js";
import { applePayPaymentDataSchema, type ApplePayPaymentData } from "./apple-pay-payment-data.js";
import { applePayTokenizedCardSchema, type ApplePayTokenizedCard } from "./apple-pay-tokenized-card.js";
import { moneySchema, type Money } from "./money.js";

export type ApplePayDecryptedTokenData = {
  transactionAmount?: Money;
  tokenizedCard: ApplePayTokenizedCard;
  deviceManufacturerId?: string;
  paymentDataType?: ApplePayPaymentDataType;
  paymentData?: ApplePayPaymentData;
};

export const applePayDecryptedTokenDataSchema: Schema<ApplePayDecryptedTokenData> =
  s.object<ApplePayDecryptedTokenData>({
    transactionAmount: s.optional(s.lazy(() => moneySchema)),
    tokenizedCard: applePayTokenizedCardSchema,
    deviceManufacturerId: s.optional(s.string()),
    paymentDataType: s.optional(s.lazy(() => applePayPaymentDataTypeSchema)),
    paymentData: s.optional(s.lazy(() => applePayPaymentDataSchema)),
    _keysMap: {
      transactionAmount: "transaction_amount",
      tokenizedCard: "tokenized_card",
      deviceManufacturerId: "device_manufacturer_id",
      paymentDataType: "payment_data_type",
      paymentData: "payment_data",
    },
  });
