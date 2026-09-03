import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { moneySchema, type Money } from "./money.js";
import { planOverrideSchema, type PlanOverride } from "./plan-override.js";
import { shippingDetailsSchema, type ShippingDetails } from "./shipping-details.js";
import {
  subscriptionPatchApplicationContextSchema,
  type SubscriptionPatchApplicationContext,
} from "./subscription-patch-application-context.js";

export type ModifySubscriptionRequest = {
  planId?: string;
  quantity?: string;
  shippingAmount?: Money;
  shippingAddress?: ShippingDetails;
  applicationContext?: SubscriptionPatchApplicationContext;
  plan?: PlanOverride;
};

export const modifySubscriptionRequestSchema: Schema<ModifySubscriptionRequest> =
  s.object<ModifySubscriptionRequest>({
    planId: s.optional(s.string()),
    quantity: s.optional(s.string()),
    shippingAmount: s.optional(s.lazy(() => moneySchema)),
    shippingAddress: s.optional(s.lazy(() => shippingDetailsSchema)),
    applicationContext: s.optional(s.lazy(() => subscriptionPatchApplicationContextSchema)),
    plan: s.optional(s.lazy(() => planOverrideSchema)),
    _keysMap: {
      planId: "plan_id",
      shippingAmount: "shipping_amount",
      shippingAddress: "shipping_address",
      applicationContext: "application_context",
    },
  });
