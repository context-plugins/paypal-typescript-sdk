import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { cobrandedCardSchema, type CobrandedCard } from "./cobranded-card.js";
import {
  payPalWalletVaultResponseSchema,
  type PayPalWalletVaultResponse,
} from "./pay-pal-wallet-vault-response.js";

/** Additional attributes associated with the use of a PayPal Wallet. */
export type PayPalWalletAttributesResponse = {
  /** The details about a saved PayPal Wallet payment source. */
  vault?: PayPalWalletVaultResponse;
  /**
   * An array of merchant cobranded cards used by buyer to complete an order. This array will be
   * present if a merchant has onboarded their cobranded card with PayPal and provided corresponding
   * label(s).
   */
  cobrandedCards?: CobrandedCard[];
};

export const payPalWalletAttributesResponseSchema: Schema<PayPalWalletAttributesResponse> =
  s.object<PayPalWalletAttributesResponse>({
    vault: s.optional(s.lazy(() => payPalWalletVaultResponseSchema)),
    cobrandedCards: s.optional(s.array(s.lazy(() => cobrandedCardSchema))),
    _keysMap: {
      cobrandedCards: "cobranded_cards",
    },
  });
