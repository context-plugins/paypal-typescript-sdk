import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  authorizationWithAdditionalDataSchema,
  type AuthorizationWithAdditionalData,
} from "./authorization-with-additional-data.js";
import { ordersCaptureSchema, type OrdersCapture } from "./orders-capture.js";
import { refundSchema, type Refund } from "./refund.js";

/**
 * The collection of payments, or transactions, for a purchase unit in an order. For example,
 * authorized payments, captured payments, and refunds.
 */
export type PaymentCollection = {
  /**
   * An array of authorized payments for a purchase unit. A purchase unit can have zero or more
   * authorized payments.
   */
  authorizations?: AuthorizationWithAdditionalData[];
  /**
   * An array of captured payments for a purchase unit. A purchase unit can have zero or more
   * captured payments.
   */
  captures?: OrdersCapture[];
  /** An array of refunds for a purchase unit. A purchase unit can have zero or more refunds. */
  refunds?: Refund[];
};

export const paymentCollectionSchema: Schema<PaymentCollection> = s.object<PaymentCollection>({
  authorizations: s.optional(s.array(s.lazy(() => authorizationWithAdditionalDataSchema))),
  captures: s.optional(s.array(s.lazy(() => ordersCaptureSchema))),
  refunds: s.optional(s.array(s.lazy(() => refundSchema))),
});
