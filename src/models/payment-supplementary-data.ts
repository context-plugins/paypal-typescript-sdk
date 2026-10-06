import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { relatedIdentifiersSchema, type RelatedIdentifiers } from "./related-identifiers.js";

/** The supplementary data. */
export type PaymentSupplementaryData = {
  /** Identifiers related to a specific resource. */
  relatedIds?: RelatedIdentifiers;
};

export const paymentSupplementaryDataSchema: Schema<PaymentSupplementaryData> =
  s.object<PaymentSupplementaryData>({
    relatedIds: s.optional(s.lazy(() => relatedIdentifiersSchema)),
    _keysMap: {
      relatedIds: "related_ids",
    },
  });
