import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type BlikOneClickPaymentObject = {
  consumerReference?: string;
};

export const blikOneClickPaymentObjectSchema: Schema<BlikOneClickPaymentObject> =
  s.object<BlikOneClickPaymentObject>({
    consumerReference: s.optional(s.string()),
    _keysMap: {
      consumerReference: "consumer_reference",
    },
  });
