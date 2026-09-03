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

export type VenmoWalletAdditionalAttributes = {
  customer?: VenmoWalletCustomerInformation;
  vault?: VenmoWalletVaultAttributes;
};

export const venmoWalletAdditionalAttributesSchema: Schema<VenmoWalletAdditionalAttributes> =
  s.object<VenmoWalletAdditionalAttributes>({
    customer: s.optional(s.lazy(() => venmoWalletCustomerInformationSchema)),
    vault: s.optional(s.lazy(() => venmoWalletVaultAttributesSchema)),
  });
