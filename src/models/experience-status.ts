import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const ExperienceStatus = {
  NotStarted: "NOT_STARTED",
  InProgress: "IN_PROGRESS",
  Canceled: "CANCELED",
  Approved: "APPROVED",
} as const;
export type ExperienceStatus = (typeof ExperienceStatus)[keyof typeof ExperienceStatus] | (string & {});

export const experienceStatusSchema: EnumSchema<ExperienceStatus> =
  s.enumOf<ExperienceStatus>(ExperienceStatus);
