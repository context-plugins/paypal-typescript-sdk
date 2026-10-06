import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Information used to pay using BLIK one-click flow. */
export type BlikOneClickPaymentObject = {
  /**
   * The merchant generated, unique reference serving as a primary identifier for accounts connected
   * between Blik and a merchant.
   */
  consumerReference?: string;
};

export const blikOneClickPaymentObjectSchema: Schema<BlikOneClickPaymentObject> =
  s.object<BlikOneClickPaymentObject>({
    consumerReference: s.optional(s.string()),
    _keysMap: {
      consumerReference: "consumer_reference",
    },
  });
