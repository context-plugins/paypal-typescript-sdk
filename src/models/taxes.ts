import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** The tax details. */
export type Taxes = {
  /**
   * The percentage, as a fixed-point, signed decimal number. For example, define a 19.99% interest
   * rate as `19.99`.
   */
  percentage: string;
  /** Indicates whether the tax was already included in the billing amount. @default true */
  inclusive?: boolean;
};

export const taxesSchema: Schema<Taxes> = s.object<Taxes>({
  percentage: s.string(),
  inclusive: s.defaulted(s.boolean(), true),
});
