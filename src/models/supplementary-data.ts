import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { cardSupplementaryDataSchema, type CardSupplementaryData } from "./card-supplementary-data.js";
import { riskSupplementaryDataSchema, type RiskSupplementaryData } from "./risk-supplementary-data.js";

export type SupplementaryData = {
  card?: CardSupplementaryData;
  risk?: RiskSupplementaryData;
};

export const supplementaryDataSchema: Schema<SupplementaryData> = s.object<SupplementaryData>({
  card: s.optional(s.lazy(() => cardSupplementaryDataSchema)),
  risk: s.optional(s.lazy(() => riskSupplementaryDataSchema)),
});
