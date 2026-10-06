import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** The tax details. */
export type TaxesOverride = {
  /**
   * The percentage, as a fixed-point, signed decimal number. For example, define a 19.99% interest
   * rate as `19.99`.
   */
  percentage?: string;
  /** Indicates whether the tax was already included in the billing amount. */
  inclusive?: boolean;
};

export const taxesOverrideSchema: Schema<TaxesOverride> = s.object<TaxesOverride>({
  percentage: s.optional(s.string()),
  inclusive: s.optional(s.boolean()),
});
