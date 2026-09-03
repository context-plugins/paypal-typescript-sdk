import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { intervalUnitSchema, type IntervalUnit } from "./interval-unit.js";

export type Frequency = {
  intervalUnit: IntervalUnit;
  intervalCount?: number;
};

export const frequencySchema: Schema<Frequency> = s.object<Frequency>({
  intervalUnit: intervalUnitSchema,
  intervalCount: s.optional(s.number()),
  _keysMap: {
    intervalUnit: "interval_unit",
    intervalCount: "interval_count",
  },
});
