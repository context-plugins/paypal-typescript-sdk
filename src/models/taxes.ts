import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type Taxes = {
  percentage: string;
  inclusive?: boolean;
};

export const taxesSchema: Schema<Taxes> = s.object<Taxes>({
  percentage: s.string(),
  inclusive: s.optional(s.boolean()),
});
