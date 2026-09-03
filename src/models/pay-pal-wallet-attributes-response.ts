import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { cobrandedCardSchema, type CobrandedCard } from "./cobranded-card.js";
import {
  payPalWalletVaultResponseSchema,
  type PayPalWalletVaultResponse,
} from "./pay-pal-wallet-vault-response.js";

export type PayPalWalletAttributesResponse = {
  vault?: PayPalWalletVaultResponse;
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
