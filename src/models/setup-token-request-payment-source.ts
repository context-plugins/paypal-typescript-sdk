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

/** The payment method to vault with the instrument details. */
export type SetupTokenRequestPaymentSource = {
  /** A Resource representing a request to vault a Card. */
  card?: SetupTokenRequestCard;
  /** A resource representing a request to vault PayPal Wallet. */
  paypal?: VaultPayPalWalletRequest;
  /** A resource representing a request to vault Venmo. */
  venmo?: VaultVenmoRequest;
  /** A resource representing a request to vault Apple Pay. */
  applePay?: VaultApplePayRequest;
  /** The Tokenized Payment Source representing a Request to Vault a Token. */
  token?: VaultTokenRequest;
  /** A Resource representing a request to vault a Bank used for ACH Debit. */
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
