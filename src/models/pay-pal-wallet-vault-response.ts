import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { payPalWalletCustomerSchema, type PayPalWalletCustomer } from "./pay-pal-wallet-customer.js";
import {
  payPalWalletVaultStatusSchema,
  type PayPalWalletVaultStatus,
} from "./pay-pal-wallet-vault-status.js";

export type PayPalWalletVaultResponse = {
  id?: string;
  status?: PayPalWalletVaultStatus;
  links?: LinkDescription[];
  customer?: PayPalWalletCustomer;
};

export const payPalWalletVaultResponseSchema: Schema<PayPalWalletVaultResponse> =
  s.object<PayPalWalletVaultResponse>({
    id: s.optional(s.string()),
    status: s.optional(s.lazy(() => payPalWalletVaultStatusSchema)),
    links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
    customer: s.optional(s.lazy(() => payPalWalletCustomerSchema)),
  });
