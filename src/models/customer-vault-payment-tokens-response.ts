import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { paymentTokenResponseSchema, type PaymentTokenResponse } from "./payment-token-response.js";
import { vaultResponseCustomerSchema, type VaultResponseCustomer } from "./vault-response-customer.js";

export type CustomerVaultPaymentTokensResponse = {
  totalItems?: number;
  totalPages?: number;
  customer?: VaultResponseCustomer;
  paymentTokens?: PaymentTokenResponse[];
  links?: LinkDescription[];
};

export const customerVaultPaymentTokensResponseSchema: Schema<CustomerVaultPaymentTokensResponse> =
  s.object<CustomerVaultPaymentTokensResponse>({
    totalItems: s.optional(s.number()),
    totalPages: s.optional(s.number()),
    customer: s.optional(s.lazy(() => vaultResponseCustomerSchema)),
    paymentTokens: s.optional(s.array(s.lazy(() => paymentTokenResponseSchema))),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    _keysMap: {
      totalItems: "total_items",
      totalPages: "total_pages",
      paymentTokens: "payment_tokens",
    },
  });
