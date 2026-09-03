import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { refundStatusDetailsSchema, type RefundStatusDetails } from "./refund-status-details.js";
import { refundStatusSchema, type RefundStatus } from "./refund-status.js";

export type RefundStatusWithDetails = {
  status?: RefundStatus;
  statusDetails?: RefundStatusDetails;
};

export const refundStatusWithDetailsSchema: Schema<RefundStatusWithDetails> =
  s.object<RefundStatusWithDetails>({
    status: s.optional(s.lazy(() => refundStatusSchema)),
    statusDetails: s.optional(s.lazy(() => refundStatusDetailsSchema)),
    _keysMap: {
      statusDetails: "status_details",
    },
  });
