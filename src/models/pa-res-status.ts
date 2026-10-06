import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Transactions status result identifier. The outcome of the issuer's authentication. */
export const PaResStatus = {
  /** Successful authentication. */
  Y: "Y",
  /** Failed authentication / account not verified / transaction denied. */
  N: "N",
  /** Unable to complete authentication. */
  U: "U",
  /** Successful attempts transaction. */
  A: "A",
  /** Challenge required for authentication. */
  C: "C",
  /** Authentication rejected (merchant must not submit for authorization). */
  R: "R",
  /** Challenge required; decoupled authentication confirmed. */
  D: "D",
  /** Informational only; 3DS requestor challenge preference acknowledged. */
  I: "I",
} as const;
export type PaResStatus = (typeof PaResStatus)[keyof typeof PaResStatus] | (string & {});

export const paResStatusSchema: EnumSchema<PaResStatus> = s.enumOf<PaResStatus>(PaResStatus);
