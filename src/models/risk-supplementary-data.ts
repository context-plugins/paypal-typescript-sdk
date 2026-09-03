import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { participantMetadataSchema, type ParticipantMetadata } from "./participant-metadata.js";

export type RiskSupplementaryData = {
  customer?: ParticipantMetadata;
};

export const riskSupplementaryDataSchema: Schema<RiskSupplementaryData> = s.object<RiskSupplementaryData>({
  customer: s.optional(s.lazy(() => participantMetadataSchema)),
});
