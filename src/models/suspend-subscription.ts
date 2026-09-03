import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type SuspendSubscription = {
  reason: string;
};

export const suspendSubscriptionSchema: Schema<SuspendSubscription> = s.object<SuspendSubscription>({
  reason: s.string(),
});
