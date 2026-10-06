import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Identifiers related to a specific resource. */
export type RelatedIdentifiers = {
  /** Order ID related to the resource. */
  orderId?: string;
  /** Authorization ID related to the resource. */
  authorizationId?: string;
  /** Capture ID related to the resource. */
  captureId?: string;
};

export const relatedIdentifiersSchema: Schema<RelatedIdentifiers> = s.object<RelatedIdentifiers>({
  orderId: s.optional(s.string()),
  authorizationId: s.optional(s.string()),
  captureId: s.optional(s.string()),
  _keysMap: {
    orderId: "order_id",
    authorizationId: "authorization_id",
    captureId: "capture_id",
  },
});
