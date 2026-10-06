import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The type of capture. */
export const CaptureType = {
  /** The outstanding balance that the subscriber must clear. */
  OutstandingBalance: "OUTSTANDING_BALANCE",
} as const;
export type CaptureType = (typeof CaptureType)[keyof typeof CaptureType] | (string & {});

export const captureTypeSchema: EnumSchema<CaptureType> = s.enumOf<CaptureType>(CaptureType);
