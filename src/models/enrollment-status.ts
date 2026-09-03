import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const EnrollmentStatus = {
  Y: "Y",
  N: "N",
  U: "U",
  B: "B",
} as const;
export type EnrollmentStatus = (typeof EnrollmentStatus)[keyof typeof EnrollmentStatus] | (string & {});

export const enrollmentStatusSchema: EnumSchema<EnrollmentStatus> =
  s.enumOf<EnrollmentStatus>(EnrollmentStatus);
