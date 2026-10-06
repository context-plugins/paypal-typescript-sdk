import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Information used to pay using BLIK one-click flow. */
export type BlikOneClickPaymentRequest = {
  /** The 6-digit code used to authenticate a consumer within BLIK. */
  authCode?: string;
  /**
   * The merchant generated, unique reference serving as a primary identifier for accounts connected
   * between Blik and a merchant.
   */
  consumerReference: string;
  /**
   * A bank defined identifier used as a display name to allow the payer to differentiate between
   * multiple registered bank accounts.
   */
  aliasLabel?: string;
  /**
   * A Blik-defined identifier for a specific Blik-enabled bank account that is associated with a
   * given merchant. Used only in conjunction with a Consumer Reference.
   */
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
