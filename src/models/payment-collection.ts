import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  authorizationWithAdditionalDataSchema,
  type AuthorizationWithAdditionalData,
} from "./authorization-with-additional-data.js";
import { ordersCaptureSchema, type OrdersCapture } from "./orders-capture.js";
import { refundSchema, type Refund } from "./refund.js";

export type PaymentCollection = {
  authorizations?: AuthorizationWithAdditionalData[];
  captures?: OrdersCapture[];
  refunds?: Refund[];
};

export const paymentCollectionSchema: Schema<PaymentCollection> = s.object<PaymentCollection>({
  authorizations: s.optional(s.array(s.lazy(() => authorizationWithAdditionalDataSchema))),
  captures: s.optional(s.array(s.lazy(() => ordersCaptureSchema))),
  refunds: s.optional(s.array(s.lazy(() => refundSchema))),
});
