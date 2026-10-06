import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { applePayRequestCardSchema, type ApplePayRequestCard } from "./apple-pay-request-card.js";

/** A resource representing a request to vault Apple Pay. */
export type VaultApplePayRequest = {
  /** Encrypted Apple Pay token, containing card information. This token would be base64 encoded. */
  token?: string;
  /** The payment card to be used to fund a payment. Can be a credit or debit card. */
  card?: ApplePayRequestCard;
};

export const vaultApplePayRequestSchema: Schema<VaultApplePayRequest> = s.object<VaultApplePayRequest>({
  token: s.optional(s.string()),
  card: s.optional(s.lazy(() => applePayRequestCardSchema)),
});
