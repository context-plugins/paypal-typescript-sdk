import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The reason why the authorized status is `PENDING`. */
export const AuthorizationIncompleteReason = {
  /** Authorization is pending manual review. */
  PendingReview: "PENDING_REVIEW",
  /** Risk Filter set by the payee failed for the transaction. */
  DeclinedByRiskFraudFilters: "DECLINED_BY_RISK_FRAUD_FILTERS",
} as const;
export type AuthorizationIncompleteReason =
  | (typeof AuthorizationIncompleteReason)[keyof typeof AuthorizationIncompleteReason]
  | (string & {});

export const authorizationIncompleteReasonSchema: EnumSchema<AuthorizationIncompleteReason> =
  s.enumOf<AuthorizationIncompleteReason>(AuthorizationIncompleteReason);
