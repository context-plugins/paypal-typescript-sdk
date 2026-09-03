import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const AuthorizationIncompleteReason = {
  PendingReview: "PENDING_REVIEW",
  DeclinedByRiskFraudFilters: "DECLINED_BY_RISK_FRAUD_FILTERS",
} as const;
export type AuthorizationIncompleteReason =
  | (typeof AuthorizationIncompleteReason)[keyof typeof AuthorizationIncompleteReason]
  | (string & {});

export const authorizationIncompleteReasonSchema: EnumSchema<AuthorizationIncompleteReason> =
  s.enumOf<AuthorizationIncompleteReason>(AuthorizationIncompleteReason);
