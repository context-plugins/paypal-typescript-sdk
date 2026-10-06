import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { captureIncompleteReasonSchema, type CaptureIncompleteReason } from "./capture-incomplete-reason.js";

/** The details of the captured payment status. */
export type CaptureStatusDetails = {
  /** The reason why the captured payment status is `PENDING` or `DENIED`. */
  reason?: CaptureIncompleteReason;
};

export const captureStatusDetailsSchema: Schema<CaptureStatusDetails> = s.object<CaptureStatusDetails>({
  reason: s.optional(s.lazy(() => captureIncompleteReasonSchema)),
});
