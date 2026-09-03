import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const RefundIncompleteReason = {
  Echeck: "ECHECK",
} as const;
export type RefundIncompleteReason =
  | (typeof RefundIncompleteReason)[keyof typeof RefundIncompleteReason]
  | (string & {});

export const refundIncompleteReasonSchema: EnumSchema<RefundIncompleteReason> =
  s.enumOf<RefundIncompleteReason>(RefundIncompleteReason);
