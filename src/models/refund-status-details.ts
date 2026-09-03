import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { refundIncompleteReasonSchema, type RefundIncompleteReason } from "./refund-incomplete-reason.js";

export type RefundStatusDetails = {
  reason?: RefundIncompleteReason;
};

export const refundStatusDetailsSchema: Schema<RefundStatusDetails> = s.object<RefundStatusDetails>({
  reason: s.optional(s.lazy(() => refundIncompleteReasonSchema)),
});
