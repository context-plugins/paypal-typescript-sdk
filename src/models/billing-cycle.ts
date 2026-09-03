import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { pricingSchemeSchema, type PricingScheme } from "./pricing-scheme.js";
import { tenureTypeSchema, type TenureType } from "./tenure-type.js";

export type BillingCycle = {
  tenureType: TenureType;
  pricingScheme?: PricingScheme;
  totalCycles?: number;
  sequence?: number;
  startDate?: string;
};

export const billingCycleSchema: Schema<BillingCycle> = s.object<BillingCycle>({
  tenureType: tenureTypeSchema,
  pricingScheme: s.optional(s.lazy(() => pricingSchemeSchema)),
  totalCycles: s.optional(s.number()),
  sequence: s.optional(s.number()),
  startDate: s.optional(s.string()),
  _keysMap: {
    tenureType: "tenure_type",
    pricingScheme: "pricing_scheme",
    totalCycles: "total_cycles",
    startDate: "start_date",
  },
});
