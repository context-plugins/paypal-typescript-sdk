import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type TaxesOverride = {
  percentage?: string;
  inclusive?: boolean;
};

export const taxesOverrideSchema: Schema<TaxesOverride> = s.object<TaxesOverride>({
  percentage: s.optional(s.string()),
  inclusive: s.optional(s.boolean()),
});
