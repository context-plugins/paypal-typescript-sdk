import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  venmoWalletCustomerInformationSchema,
  type VenmoWalletCustomerInformation,
} from "./venmo-wallet-customer-information.js";
import {
  venmoWalletVaultAttributesSchema,
  type VenmoWalletVaultAttributes,
} from "./venmo-wallet-vault-attributes.js";

/** Additional attributes associated with the use of this Venmo Wallet. */
export type VenmoWalletAdditionalAttributes = {
  /** The details about a customer in PayPal's system of record. */
  customer?: VenmoWalletCustomerInformation;
  /** Resource consolidating common request and response attirbutes for vaulting Venmo Wallet. */
  vault?: VenmoWalletVaultAttributes;
};

export const venmoWalletAdditionalAttributesSchema: Schema<VenmoWalletAdditionalAttributes> =
  s.object<VenmoWalletAdditionalAttributes>({
    customer: s.optional(s.lazy(() => venmoWalletCustomerInformationSchema)),
    vault: s.optional(s.lazy(() => venmoWalletVaultAttributesSchema)),
  });
