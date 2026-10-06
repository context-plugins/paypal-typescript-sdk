import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Liability shift indicator. The outcome of the issuer's authentication. */
export const LiabilityShiftIndicator = {
  /** Liability is with the merchant. */
  No: "NO",
  /** Liability may shift to the card issuer. */
  Possible: "POSSIBLE",
  /** The authentication system is not available. */
  Unknown: "UNKNOWN",
} as const;
export type LiabilityShiftIndicator =
  | (typeof LiabilityShiftIndicator)[keyof typeof LiabilityShiftIndicator]
  | (string & {});

export const liabilityShiftIndicatorSchema: EnumSchema<LiabilityShiftIndicator> =
  s.enumOf<LiabilityShiftIndicator>(LiabilityShiftIndicator);
