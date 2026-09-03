import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  ordersCardVerificationMethodSchema,
  type OrdersCardVerificationMethod,
} from "./orders-card-verification-method.js";

export type CardVerification = {
  method?: OrdersCardVerificationMethod;
};

export const cardVerificationSchema: Schema<CardVerification> = s.object<CardVerification>({
  method: s.optional(s.lazy(() => ordersCardVerificationMethodSchema)),
});
