import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const DisbursementMode = {
  Instant: "INSTANT",
  Delayed: "DELAYED",
} as const;
export type DisbursementMode = (typeof DisbursementMode)[keyof typeof DisbursementMode] | (string & {});

export const disbursementModeSchema: EnumSchema<DisbursementMode> =
  s.enumOf<DisbursementMode>(DisbursementMode);
