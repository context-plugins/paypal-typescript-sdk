import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Indicates if this is a `first` or `subsequent` payment using a stored payment source (also
 * referred to as stored credential or card on file).
 */
export const StoredPaymentSourceUsageType = {
  /**
   * Indicates the Initial/First payment with a payment_source that is intended to be stored upon
   * successful processing of the payment.
   */
  First: "FIRST",
  /**
   * Indicates a payment using a stored payment_source which has been successfully used previously
   * for a payment.
   */
  Subsequent: "SUBSEQUENT",
  /**
   * Indicates that PayPal will derive the value of `FIRST` or `SUBSEQUENT` based on data available
   * to PayPal.
   */
  Derived: "DERIVED",
} as const;
export type StoredPaymentSourceUsageType =
  | (typeof StoredPaymentSourceUsageType)[keyof typeof StoredPaymentSourceUsageType]
  | (string & {});

export const storedPaymentSourceUsageTypeSchema: EnumSchema<StoredPaymentSourceUsageType> =
  s.enumOf<StoredPaymentSourceUsageType>(StoredPaymentSourceUsageType);
