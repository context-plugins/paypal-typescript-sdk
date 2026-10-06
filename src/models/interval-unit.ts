import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** The interval at which the subscription is charged or billed. */
export const IntervalUnit = {
  /** A daily billing cycle. */
  Day: "DAY",
  /** A weekly billing cycle. */
  Week: "WEEK",
  /** A monthly billing cycle. */
  Month: "MONTH",
  /** A yearly billing cycle. */
  Year: "YEAR",
} as const;
export type IntervalUnit = (typeof IntervalUnit)[keyof typeof IntervalUnit] | (string & {});

export const intervalUnitSchema: EnumSchema<IntervalUnit> = s.enumOf<IntervalUnit>(IntervalUnit);
