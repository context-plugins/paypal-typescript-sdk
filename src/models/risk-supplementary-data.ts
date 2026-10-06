import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { participantMetadataSchema, type ParticipantMetadata } from "./participant-metadata.js";

/** Additional information necessary to evaluate the risk profile of a transaction. */
export type RiskSupplementaryData = {
  /** Profile information of the sender or receiver. */
  customer?: ParticipantMetadata;
};

export const riskSupplementaryDataSchema: Schema<RiskSupplementaryData> = s.object<RiskSupplementaryData>({
  customer: s.optional(s.lazy(() => participantMetadataSchema)),
});
