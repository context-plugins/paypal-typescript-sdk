import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const CaptureIncompleteReason = {
  BuyerComplaint: "BUYER_COMPLAINT",
  Chargeback: "CHARGEBACK",
  Echeck: "ECHECK",
  InternationalWithdrawal: "INTERNATIONAL_WITHDRAWAL",
  Other: "OTHER",
  PendingReview: "PENDING_REVIEW",
  ReceivingPreferenceMandatesManualAction: "RECEIVING_PREFERENCE_MANDATES_MANUAL_ACTION",
  Refunded: "REFUNDED",
  TransactionApprovedAwaitingFunding: "TRANSACTION_APPROVED_AWAITING_FUNDING",
  Unilateral: "UNILATERAL",
  VerificationRequired: "VERIFICATION_REQUIRED",
  DeclinedByRiskFraudFilters: "DECLINED_BY_RISK_FRAUD_FILTERS",
} as const;
export type CaptureIncompleteReason =
  | (typeof CaptureIncompleteReason)[keyof typeof CaptureIncompleteReason]
  | (string & {});

export const captureIncompleteReasonSchema: EnumSchema<CaptureIncompleteReason> =
  s.enumOf<CaptureIncompleteReason>(CaptureIncompleteReason);
