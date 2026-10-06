import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The initial state of the plan. Allowed input values are CREATED and ACTIVE. */
export const PlanRequestStatus = {
  /** The plan was created. You cannot create subscriptions for a plan in this state. */
  Created: "CREATED",
  /** The plan is inactive. */
  Inactive: "INACTIVE",
  /** The plan is active. You can only create subscriptions for a plan in this state. */
  Active: "ACTIVE",
} as const;
export type PlanRequestStatus = (typeof PlanRequestStatus)[keyof typeof PlanRequestStatus] | (string & {});

export const planRequestStatusSchema: EnumSchema<PlanRequestStatus> =
  s.enumOf<PlanRequestStatus>(PlanRequestStatus);
