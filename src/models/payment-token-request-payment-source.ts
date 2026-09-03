import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { paymentTokenRequestCardSchema, type PaymentTokenRequestCard } from "./payment-token-request-card.js";
import { vaultTokenRequestSchema, type VaultTokenRequest } from "./vault-token-request.js";

export type PaymentTokenRequestPaymentSource = {
  card?: PaymentTokenRequestCard;
  token?: VaultTokenRequest;
};

export const paymentTokenRequestPaymentSourceSchema: Schema<PaymentTokenRequestPaymentSource> =
  s.object<PaymentTokenRequestPaymentSource>({
    card: s.optional(s.lazy(() => paymentTokenRequestCardSchema)),
    token: s.optional(s.lazy(() => vaultTokenRequestSchema)),
  });
