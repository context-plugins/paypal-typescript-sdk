import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** The activate subscription request details. */
export type ActivateSubscriptionRequest = {
  /** The reason for activation of a subscription. Required to reactivate the subscription. */
  reason?: string;
};

export const activateSubscriptionRequestSchema: Schema<ActivateSubscriptionRequest> =
  s.object<ActivateSubscriptionRequest>({
    reason: s.optional(s.string()),
  });
