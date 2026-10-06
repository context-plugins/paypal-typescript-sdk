import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { cardSupplementaryDataSchema, type CardSupplementaryData } from "./card-supplementary-data.js";
import { riskSupplementaryDataSchema, type RiskSupplementaryData } from "./risk-supplementary-data.js";

/**
 * Supplementary data about a payment. This object passes information that can be used to improve
 * risk assessments and processing costs, for example, by providing Level 2 and Level 3 payment
 * data.
 */
export type SupplementaryData = {
  /**
   * Merchants and partners can add Level 2 and 3 data to payments to reduce risk and payment
   * processing costs. For more information about processing payments, see checkout or multiparty
   * checkout.
   */
  card?: CardSupplementaryData;
  /** Additional information necessary to evaluate the risk profile of a transaction. */
  risk?: RiskSupplementaryData;
};

export const supplementaryDataSchema: Schema<SupplementaryData> = s.object<SupplementaryData>({
  card: s.optional(s.lazy(() => cardSupplementaryDataSchema)),
  risk: s.optional(s.lazy(() => riskSupplementaryDataSchema)),
});
