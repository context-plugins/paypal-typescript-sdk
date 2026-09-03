import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { applePayRequestCardSchema, type ApplePayRequestCard } from "./apple-pay-request-card.js";

export type VaultApplePayRequest = {
  token?: string;
  card?: ApplePayRequestCard;
};

export const vaultApplePayRequestSchema: Schema<VaultApplePayRequest> = s.object<VaultApplePayRequest>({
  token: s.optional(s.string()),
  card: s.optional(s.lazy(() => applePayRequestCardSchema)),
});
