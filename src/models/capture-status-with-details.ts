import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { captureStatusDetailsSchema, type CaptureStatusDetails } from "./capture-status-details.js";
import { captureStatusSchema, type CaptureStatus } from "./capture-status.js";

export type CaptureStatusWithDetails = {
  status?: CaptureStatus;
  statusDetails?: CaptureStatusDetails;
};

export const captureStatusWithDetailsSchema: Schema<CaptureStatusWithDetails> =
  s.object<CaptureStatusWithDetails>({
    status: s.optional(s.lazy(() => captureStatusSchema)),
    statusDetails: s.optional(s.lazy(() => captureStatusDetailsSchema)),
    _keysMap: {
      statusDetails: "status_details",
    },
  });
