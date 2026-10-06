import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { paymentTokenResponseSchema, type PaymentTokenResponse } from "./payment-token-response.js";
import { vaultResponseCustomerSchema, type VaultResponseCustomer } from "./vault-response-customer.js";

/** Collection of payment tokens saved for a given customer. */
export type CustomerVaultPaymentTokensResponse = {
  /** Total number of items. */
  totalItems?: number;
  /** Total number of pages. */
  totalPages?: number;
  /**
   * This object defines a customer in your system. Use it to manage customer profiles, save payment
   * methods and contact details.
   */
  customer?: VaultResponseCustomer;
  paymentTokens?: PaymentTokenResponse[];
  /** An array of related [HATEOAS links](/api/rest/responses/#hateoas). */
  links?: LinkDescription[];
};

export const customerVaultPaymentTokensResponseSchema: Schema<CustomerVaultPaymentTokensResponse> =
  s.object<CustomerVaultPaymentTokensResponse>({
    totalItems: s.optional(s.int()),
    totalPages: s.optional(s.int()),
    customer: s.optional(s.lazy(() => vaultResponseCustomerSchema)),
    paymentTokens: s.optional(s.array(s.lazy(() => paymentTokenResponseSchema))),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    _keysMap: {
      totalItems: "total_items",
      totalPages: "total_pages",
      paymentTokens: "payment_tokens",
    },
  });
