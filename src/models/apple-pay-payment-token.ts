import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { applePayCardSchema, type ApplePayCard } from "./apple-pay-card.js";

/** A resource representing a response for Apple Pay. */
export type ApplePayPaymentToken = {
  /** The payment card to be used to fund a payment. Can be a credit or debit card. */
  card?: ApplePayCard;
};

export const applePayPaymentTokenSchema: Schema<ApplePayPaymentToken> = s.object<ApplePayPaymentToken>({
  card: s.optional(s.lazy(() => applePayCardSchema)),
});
