import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const LiabilityShiftIndicator = {
  No: "NO",
  Possible: "POSSIBLE",
  Unknown: "UNKNOWN",
} as const;
export type LiabilityShiftIndicator =
  | (typeof LiabilityShiftIndicator)[keyof typeof LiabilityShiftIndicator]
  | (string & {});

export const liabilityShiftIndicatorSchema: EnumSchema<LiabilityShiftIndicator> =
  s.enumOf<LiabilityShiftIndicator>(LiabilityShiftIndicator);
