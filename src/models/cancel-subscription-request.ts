import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type CancelSubscriptionRequest = {
  reason: string;
};

export const cancelSubscriptionRequestSchema: Schema<CancelSubscriptionRequest> =
  s.object<CancelSubscriptionRequest>({
    reason: s.string(),
  });
