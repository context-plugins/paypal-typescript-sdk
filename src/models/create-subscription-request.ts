import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { planOverrideSchema, type PlanOverride } from "./plan-override.js";
import { subscriberRequestSchema, type SubscriberRequest } from "./subscriber-request.js";
import {
  subscriptionApplicationContextSchema,
  type SubscriptionApplicationContext,
} from "./subscription-application-context.js";

export type CreateSubscriptionRequest = {
  planId: string;
  startTime?: string;
  quantity?: string;
  shippingAmount?: Money;
  subscriber?: SubscriberRequest;
  autoRenewal?: boolean;
  applicationContext?: SubscriptionApplicationContext;
  customId?: string;
  plan?: PlanOverride;
};

export const createSubscriptionRequestSchema: Schema<CreateSubscriptionRequest> =
  s.object<CreateSubscriptionRequest>({
    planId: s.string(),
    startTime: s.optional(s.string()),
    quantity: s.optional(s.string()),
    shippingAmount: s.optional(s.lazy(() => moneySchema)),
    subscriber: s.optional(s.lazy(() => subscriberRequestSchema)),
    autoRenewal: s.optional(s.boolean()),
    applicationContext: s.optional(s.lazy(() => subscriptionApplicationContextSchema)),
    customId: s.optional(s.string()),
    plan: s.optional(s.lazy(() => planOverrideSchema)),
    _keysMap: {
      planId: "plan_id",
      startTime: "start_time",
      shippingAmount: "shipping_amount",
      autoRenewal: "auto_renewal",
      applicationContext: "application_context",
      customId: "custom_id",
    },
  });
