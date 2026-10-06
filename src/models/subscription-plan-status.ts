import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The plan status. */
export const SubscriptionPlanStatus = {
  /** The plan was created. You cannot create subscriptions for a plan in this state. */
  Created: "CREATED",
  /** The plan is inactive. */
  Inactive: "INACTIVE",
  /** The plan is active. You can only create subscriptions for a plan in this state. */
  Active: "ACTIVE",
} as const;
export type SubscriptionPlanStatus =
  | (typeof SubscriptionPlanStatus)[keyof typeof SubscriptionPlanStatus]
  | (string & {});

export const subscriptionPlanStatusSchema: EnumSchema<SubscriptionPlanStatus> =
  s.enumOf<SubscriptionPlanStatus>(SubscriptionPlanStatus);
