import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const CaptureStatus = {
  Completed: "COMPLETED",
  Declined: "DECLINED",
  PartiallyRefunded: "PARTIALLY_REFUNDED",
  Pending: "PENDING",
  Refunded: "REFUNDED",
  Failed: "FAILED",
} as const;
export type CaptureStatus = (typeof CaptureStatus)[keyof typeof CaptureStatus] | (string & {});

export const captureStatusSchema: EnumSchema<CaptureStatus> = s.enumOf<CaptureStatus>(CaptureStatus);
