import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type ActivateSubscriptionRequest = {
  reason?: string;
};

export const activateSubscriptionRequestSchema: Schema<ActivateSubscriptionRequest> =
  s.object<ActivateSubscriptionRequest>({
    reason: s.optional(s.string()),
  });
