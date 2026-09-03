import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const CardVerificationStatus = {
  Verified: "VERIFIED",
  Failed: "FAILED",
} as const;
export type CardVerificationStatus =
  | (typeof CardVerificationStatus)[keyof typeof CardVerificationStatus]
  | (string & {});

export const cardVerificationStatusSchema: EnumSchema<CardVerificationStatus> =
  s.enumOf<CardVerificationStatus>(CardVerificationStatus);
