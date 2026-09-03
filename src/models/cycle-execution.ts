import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { tenureTypeSchema, type TenureType } from "./tenure-type.js";

export type CycleExecution = {
  tenureType: TenureType;
  sequence: number;
  cyclesCompleted: number;
  cyclesRemaining?: number;
  currentPricingSchemeVersion?: number;
  totalCycles?: number;
};

export const cycleExecutionSchema: Schema<CycleExecution> = s.object<CycleExecution>({
  tenureType: tenureTypeSchema,
  sequence: s.number(),
  cyclesCompleted: s.number(),
  cyclesRemaining: s.optional(s.number()),
  currentPricingSchemeVersion: s.optional(s.number()),
  totalCycles: s.optional(s.number()),
  _keysMap: {
    tenureType: "tenure_type",
    cyclesCompleted: "cycles_completed",
    cyclesRemaining: "cycles_remaining",
    currentPricingSchemeVersion: "current_pricing_scheme_version",
    totalCycles: "total_cycles",
  },
});
