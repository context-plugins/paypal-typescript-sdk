import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The reason code for the payment failure. */
export const ReasonCode = {
  /** PayPal declined the payment due to one or more customer issues. */
  PaymentDenied: "PAYMENT_DENIED",
  /** An internal server error has occurred. */
  InternalServerError: "INTERNAL_SERVER_ERROR",
  /** The payee account is not in good standing and cannot receive payments. */
  PayeeAccountRestricted: "PAYEE_ACCOUNT_RESTRICTED",
  /** The payer account is not in good standing and cannot make payments. */
  PayerAccountRestricted: "PAYER_ACCOUNT_RESTRICTED",
  /** Payer cannot pay for this transaction. */
  PayerCannotPay: "PAYER_CANNOT_PAY",
  /** The transaction exceeds the payer's sending limit. */
  SendingLimitExceeded: "SENDING_LIMIT_EXCEEDED",
  /** The transaction exceeds the receiver's receiving limit. */
  TransactionReceivingLimitExceeded: "TRANSACTION_RECEIVING_LIMIT_EXCEEDED",
  /** The transaction is declined due to a currency mismatch. */
  CurrencyMismatch: "CURRENCY_MISMATCH",
} as const;
export type ReasonCode = (typeof ReasonCode)[keyof typeof ReasonCode] | (string & {});

export const reasonCodeSchema: EnumSchema<ReasonCode> = s.enumOf<ReasonCode>(ReasonCode);
