import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * The declined payment transactions might have payment advice codes. The card networks, like Visa
 * and Mastercard, return payment advice codes.
 */
export const PaymentAdviceCode = {
  /**
   * For Mastercard, expired card account upgrade or portfolio sale conversion. Obtain new account
   * information before next billing cycle.
   */
  _01: "01",
  /**
   * For Mastercard, over credit limit or insufficient funds. Retry the transaction 72 hours later.
   * For Visa, the card holder wants to stop only one specific payment in the recurring payment
   * relationship. The merchant must NOT resubmit the same transaction. The merchant can continue
   * the billing process in the subsequent billing period.
   */
  _02: "02",
  /**
   * For Mastercard, account closed as fraudulent. Obtain another type of payment from customer due
   * to account being closed or fraud. Possible reason: Account closed as fraudulent. For Visa, the
   * card holder wants to stop all recurring payment transactions for a specific merchant. Stop
   * recurring payment requests.
   */
  _03: "03",
  /** For Mastercard, token requirements not fulfilled for this token type. */
  _04: "04",
  /**
   * For Mastercard, the card holder has been unsuccessful at canceling recurring payment through
   * merchant. Stop recurring payment requests. For Visa, all recurring payments were canceled for
   * the card number requested. Stop recurring payment requests.
   */
  _21: "21",
  /** For Mastercard, merchant does not qualify for product code. */
  _22: "22",
  /** For Mastercard, retry after 1 hour. */
  _24: "24",
  /** For Mastercard, retry after 24 hours. */
  _25: "25",
  /** For Mastercard, retry after 2 days. */
  _26: "26",
  /** For Mastercard, retry after 4 days. */
  _27: "27",
  /** For Mastercard, retry after 6 days. */
  _28: "28",
  /** For Mastercard, retry after 8 days. */
  _29: "29",
  /** For Mastercard, retry after 10 days . */
  _30: "30",
  /** For Mastercard, consumer non-reloadable prepaid card. */
  _40: "40",
  /** For Mastercard, consumer multi-use virtual card number. */
  _43: "43",
} as const;
export type PaymentAdviceCode = (typeof PaymentAdviceCode)[keyof typeof PaymentAdviceCode] | (string & {});

export const paymentAdviceCodeSchema: EnumSchema<PaymentAdviceCode> =
  s.enumOf<PaymentAdviceCode>(PaymentAdviceCode);
