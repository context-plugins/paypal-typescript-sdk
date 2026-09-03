import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const ReasonCode = {
  PaymentDenied: "PAYMENT_DENIED",
  InternalServerError: "INTERNAL_SERVER_ERROR",
  PayeeAccountRestricted: "PAYEE_ACCOUNT_RESTRICTED",
  PayerAccountRestricted: "PAYER_ACCOUNT_RESTRICTED",
  PayerCannotPay: "PAYER_CANNOT_PAY",
  SendingLimitExceeded: "SENDING_LIMIT_EXCEEDED",
  TransactionReceivingLimitExceeded: "TRANSACTION_RECEIVING_LIMIT_EXCEEDED",
  CurrencyMismatch: "CURRENCY_MISMATCH",
} as const;
export type ReasonCode = (typeof ReasonCode)[keyof typeof ReasonCode] | (string & {});

export const reasonCodeSchema: EnumSchema<ReasonCode> = s.enumOf<ReasonCode>(ReasonCode);
