import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { bankRequestSchema, type BankRequest } from "./bank-request.js";
import { setupTokenRequestCardSchema, type SetupTokenRequestCard } from "./setup-token-request-card.js";
import { vaultApplePayRequestSchema, type VaultApplePayRequest } from "./vault-apple-pay-request.js";
import {
  vaultPayPalWalletRequestSchema,
  type VaultPayPalWalletRequest,
} from "./vault-pay-pal-wallet-request.js";
import { vaultTokenRequestSchema, type VaultTokenRequest } from "./vault-token-request.js";
import { vaultVenmoRequestSchema, type VaultVenmoRequest } from "./vault-venmo-request.js";

export type SetupTokenRequestPaymentSource = {
  card?: SetupTokenRequestCard;
  paypal?: VaultPayPalWalletRequest;
  venmo?: VaultVenmoRequest;
  applePay?: VaultApplePayRequest;
  token?: VaultTokenRequest;
  bank?: BankRequest;
};

export const setupTokenRequestPaymentSourceSchema: Schema<SetupTokenRequestPaymentSource> =
  s.object<SetupTokenRequestPaymentSource>({
    card: s.optional(s.lazy(() => setupTokenRequestCardSchema)),
    paypal: s.optional(s.lazy(() => vaultPayPalWalletRequestSchema)),
    venmo: s.optional(s.lazy(() => vaultVenmoRequestSchema)),
    applePay: s.optional(s.lazy(() => vaultApplePayRequestSchema)),
    token: s.optional(s.lazy(() => vaultTokenRequestSchema)),
    bank: s.optional(s.lazy(() => bankRequestSchema)),
    _keysMap: {
      applePay: "apple_pay",
    },
  });
