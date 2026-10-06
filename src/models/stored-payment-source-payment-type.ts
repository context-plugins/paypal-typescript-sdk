import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Indicates the type of the stored payment_source payment. */
export const StoredPaymentSourcePaymentType = {
  /** One Time payment such as online purchase or donation. (e.g. Checkout with one-click). */
  OneTime: "ONE_TIME",
  /**
   * Payment which is part of a series of payments with fixed or variable amounts, following a fixed
   * time interval. (e.g. Subscription payments).
   */
  Recurring: "RECURRING",
  /**
   * Payment which is part of a series of payments that occur on a non-fixed schedule and/or have
   * variable amounts. (e.g. Account Topup payments).
   */
  Unscheduled: "UNSCHEDULED",
} as const;
export type StoredPaymentSourcePaymentType =
  | (typeof StoredPaymentSourcePaymentType)[keyof typeof StoredPaymentSourcePaymentType]
  | (string & {});

export const storedPaymentSourcePaymentTypeSchema: EnumSchema<StoredPaymentSourcePaymentType> =
  s.enumOf<StoredPaymentSourcePaymentType>(StoredPaymentSourcePaymentType);
