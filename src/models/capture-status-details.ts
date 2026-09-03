import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { captureIncompleteReasonSchema, type CaptureIncompleteReason } from "./capture-incomplete-reason.js";

export type CaptureStatusDetails = {
  reason?: CaptureIncompleteReason;
};

export const captureStatusDetailsSchema: Schema<CaptureStatusDetails> = s.object<CaptureStatusDetails>({
  reason: s.optional(s.lazy(() => captureIncompleteReasonSchema)),
});
