import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Verification status of Card. */
export const CardVerificationStatus = {
  /** Card has been verified */
  Verified: "VERIFIED",
  /** Card verification has failed */
  Failed: "FAILED",
} as const;
export type CardVerificationStatus =
  | (typeof CardVerificationStatus)[keyof typeof CardVerificationStatus]
  | (string & {});

export const cardVerificationStatusSchema: EnumSchema<CardVerificationStatus> =
  s.enumOf<CardVerificationStatus>(CardVerificationStatus);
