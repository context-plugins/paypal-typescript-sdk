import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type RelatedIdentifiers = {
  orderId?: string;
  authorizationId?: string;
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
