import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  OrdersCardVerificationMethod,
  ordersCardVerificationMethodSchema,
} from "./orders-card-verification-method.js";

/**
 * The API caller can opt in to verify the card through PayPal offered verification services (e.g.
 * Smart Dollar Auth, 3DS).
 */
export type CardVerification = {
  /**
   * The method used for card verification.
   *
   * @default OrdersCardVerificationMethod.ScaWhenRequired
   */
  method?: OrdersCardVerificationMethod;
};

export const cardVerificationSchema: Schema<CardVerification> = s.object<CardVerification>({
  method: s.defaulted(ordersCardVerificationMethodSchema, OrdersCardVerificationMethod.ScaWhenRequired),
});
