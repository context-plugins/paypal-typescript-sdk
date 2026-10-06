import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Profile information of the sender or receiver. */
export type ParticipantMetadata = {
  /**
   * An Internet Protocol address (IP address). This address assigns a numerical label to each
   * device that is connected to a computer network through the Internet Protocol. Supports IPv4 and
   * IPv6 addresses.
   */
  ipAddress?: string;
};

export const participantMetadataSchema: Schema<ParticipantMetadata> = s.object<ParticipantMetadata>({
  ipAddress: s.optional(s.string()),
  _keysMap: {
    ipAddress: "ip_address",
  },
});
