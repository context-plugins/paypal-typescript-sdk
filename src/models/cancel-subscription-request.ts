import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** The cancel subscription request details. */
export type CancelSubscriptionRequest = {
  /** The reason for the cancellation of a subscription. */
  reason: string;
};

export const cancelSubscriptionRequestSchema: Schema<CancelSubscriptionRequest> =
  s.object<CancelSubscriptionRequest>({
    reason: s.string(),
  });
