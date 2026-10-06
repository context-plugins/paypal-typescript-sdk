import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The reason why the refund has the `PENDING` or `FAILED` status. */
export const RefundIncompleteReason = {
  /** The customer's account is funded through an eCheck, which has not yet cleared. */
  Echeck: "ECHECK",
} as const;
export type RefundIncompleteReason =
  | (typeof RefundIncompleteReason)[keyof typeof RefundIncompleteReason]
  | (string & {});

export const refundIncompleteReasonSchema: EnumSchema<RefundIncompleteReason> =
  s.enumOf<RefundIncompleteReason>(RefundIncompleteReason);
