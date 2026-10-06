import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The status of the refund. */
export const RefundStatus = {
  /** The refund was cancelled. */
  Cancelled: "CANCELLED",
  /** The refund could not be processed. */
  Failed: "FAILED",
  /** The refund is pending. For more information, see status_details.reason. */
  Pending: "PENDING",
  /** The funds for this transaction were debited to the customer's account. */
  Completed: "COMPLETED",
} as const;
export type RefundStatus = (typeof RefundStatus)[keyof typeof RefundStatus] | (string & {});

export const refundStatusSchema: EnumSchema<RefundStatus> = s.enumOf<RefundStatus>(RefundStatus);
