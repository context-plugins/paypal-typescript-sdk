import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** The suspend subscription request details. */
export type SuspendSubscription = {
  /** The reason for suspension of the Subscription. */
  reason: string;
};

export const suspendSubscriptionSchema: Schema<SuspendSubscription> = s.object<SuspendSubscription>({
  reason: s.string(),
});
