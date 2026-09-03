import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type BlikOneClickPaymentRequest = {
  authCode?: string;
  consumerReference: string;
  aliasLabel?: string;
  aliasKey?: string;
};

export const blikOneClickPaymentRequestSchema: Schema<BlikOneClickPaymentRequest> =
  s.object<BlikOneClickPaymentRequest>({
    authCode: s.optional(s.string()),
    consumerReference: s.string(),
    aliasLabel: s.optional(s.string()),
    aliasKey: s.optional(s.string()),
    _keysMap: {
      authCode: "auth_code",
      consumerReference: "consumer_reference",
      aliasLabel: "alias_label",
      aliasKey: "alias_key",
    },
  });
