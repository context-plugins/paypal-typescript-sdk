import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { paymentTokenRequestCardSchema, type PaymentTokenRequestCard } from "./payment-token-request-card.js";
import { vaultTokenRequestSchema, type VaultTokenRequest } from "./vault-token-request.js";

/** The payment method to vault with the instrument details. */
export type PaymentTokenRequestPaymentSource = {
  /** A Resource representing a request to vault a Card. */
  card?: PaymentTokenRequestCard;
  /** The Tokenized Payment Source representing a Request to Vault a Token. */
  token?: VaultTokenRequest;
};

export const paymentTokenRequestPaymentSourceSchema: Schema<PaymentTokenRequestPaymentSource> =
  s.object<PaymentTokenRequestPaymentSource>({
    card: s.optional(s.lazy(() => paymentTokenRequestCardSchema)),
    token: s.optional(s.lazy(() => vaultTokenRequestSchema)),
  });
