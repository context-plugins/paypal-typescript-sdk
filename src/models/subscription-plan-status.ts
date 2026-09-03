import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const SubscriptionPlanStatus = {
  Created: "CREATED",
  Inactive: "INACTIVE",
  Active: "ACTIVE",
} as const;
export type SubscriptionPlanStatus =
  | (typeof SubscriptionPlanStatus)[keyof typeof SubscriptionPlanStatus]
  | (string & {});

export const subscriptionPlanStatusSchema: EnumSchema<SubscriptionPlanStatus> =
  s.enumOf<SubscriptionPlanStatus>(SubscriptionPlanStatus);
