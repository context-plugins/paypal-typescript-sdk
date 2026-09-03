import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const PlanRequestStatus = {
  Created: "CREATED",
  Inactive: "INACTIVE",
  Active: "ACTIVE",
} as const;
export type PlanRequestStatus = (typeof PlanRequestStatus)[keyof typeof PlanRequestStatus] | (string & {});

export const planRequestStatusSchema: EnumSchema<PlanRequestStatus> =
  s.enumOf<PlanRequestStatus>(PlanRequestStatus);
