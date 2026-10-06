import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The status of the captured payment. */
export const CaptureStatus = {
  /** The funds for this captured payment were credited to the payee's PayPal account. */
  Completed: "COMPLETED",
  /** The funds could not be captured. */
  Declined: "DECLINED",
  /** An amount less than this captured payment's amount was partially refunded to the payer. */
  PartiallyRefunded: "PARTIALLY_REFUNDED",
  /**
   * The funds for this captured payment was not yet credited to the payee's PayPal account. For
   * more information, see status.details.
   */
  Pending: "PENDING",
  /**
   * An amount greater than or equal to this captured payment's amount was refunded to the payer.
   */
  Refunded: "REFUNDED",
  /** There was an error while capturing payment. */
  Failed: "FAILED",
} as const;
export type CaptureStatus = (typeof CaptureStatus)[keyof typeof CaptureStatus] | (string & {});

export const captureStatusSchema: EnumSchema<CaptureStatus> = s.enumOf<CaptureStatus>(CaptureStatus);
