import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { subscriptionCardRequestSchema, type SubscriptionCardRequest } from "./subscription-card-request.js";

export type SubscriptionPaymentSource = {
  card?: SubscriptionCardRequest;
};

export const subscriptionPaymentSourceSchema: Schema<SubscriptionPaymentSource> =
  s.object<SubscriptionPaymentSource>({
    card: s.optional(s.lazy(() => subscriptionCardRequestSchema)),
  });
