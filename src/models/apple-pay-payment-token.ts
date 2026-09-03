import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { applePayCardSchema, type ApplePayCard } from "./apple-pay-card.js";

export type ApplePayPaymentToken = {
  card?: ApplePayCard;
};

export const applePayPaymentTokenSchema: Schema<ApplePayPaymentToken> = s.object<ApplePayPaymentToken>({
  card: s.optional(s.lazy(() => applePayCardSchema)),
});
