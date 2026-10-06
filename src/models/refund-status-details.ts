import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { refundIncompleteReasonSchema, type RefundIncompleteReason } from "./refund-incomplete-reason.js";

/** The details of the refund status. */
export type RefundStatusDetails = {
  /** The reason why the refund has the `PENDING` or `FAILED` status. */
  reason?: RefundIncompleteReason;
};

export const refundStatusDetailsSchema: Schema<RefundStatusDetails> = s.object<RefundStatusDetails>({
  reason: s.optional(s.lazy(() => refundIncompleteReasonSchema)),
});
