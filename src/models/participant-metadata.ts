import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type ParticipantMetadata = {
  ipAddress?: string;
};

export const participantMetadataSchema: Schema<ParticipantMetadata> = s.object<ParticipantMetadata>({
  ipAddress: s.optional(s.string()),
  _keysMap: {
    ipAddress: "ip_address",
  },
});
