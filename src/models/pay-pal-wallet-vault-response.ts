import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { payPalWalletCustomerSchema, type PayPalWalletCustomer } from "./pay-pal-wallet-customer.js";
import {
  payPalWalletVaultStatusSchema,
  type PayPalWalletVaultStatus,
} from "./pay-pal-wallet-vault-status.js";

/** The details about a saved PayPal Wallet payment source. */
export type PayPalWalletVaultResponse = {
  /** The PayPal-generated ID for the saved payment source. */
  id?: string;
  /**
   * The vault status.
   *
   * @deprecated
   */
  status?: PayPalWalletVaultStatus;
  /** An array of request-related HATEOAS links. */
  links?: LinkDescription[];
  /** The details about a customer in PayPal's system of record. */
  customer?: PayPalWalletCustomer;
};

export const payPalWalletVaultResponseSchema: Schema<PayPalWalletVaultResponse> =
  s.object<PayPalWalletVaultResponse>({
    id: s.optional(s.string()),
    status: s.optional(s.lazy(() => payPalWalletVaultStatusSchema)),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    customer: s.optional(s.lazy(() => payPalWalletCustomerSchema)),
  });
