import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  applePayPaymentDataTypeSchema,
  type ApplePayPaymentDataType,
} from "./apple-pay-payment-data-type.js";
import { applePayPaymentDataSchema, type ApplePayPaymentData } from "./apple-pay-payment-data.js";
import { applePayTokenizedCardSchema, type ApplePayTokenizedCard } from "./apple-pay-tokenized-card.js";
import { moneySchema, type Money } from "./money.js";

/** Information about the Payment data obtained by decrypting Apple Pay token. */
export type ApplePayDecryptedTokenData = {
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  transactionAmount?: Money;
  /** The payment card to use to fund a payment. Can be a credit or debit card. */
  tokenizedCard: ApplePayTokenizedCard;
  /**
   * Apple Pay Hex-encoded device manufacturer identifier. The pattern is defined by an external
   * party and supports Unicode.
   */
  deviceManufacturerId?: string;
  /**
   * Indicates the type of payment data passed, in case of Non China the payment data is 3DSECURE
   * and for China it is EMV.
   */
  paymentDataType?: ApplePayPaymentDataType;
  /**
   * Information about the decrypted apple pay payment data for the token like cryptogram, eci
   * indicator.
   */
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
