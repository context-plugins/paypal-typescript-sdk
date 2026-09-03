import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { cardCustomerInformationSchema, type CardCustomerInformation } from "./card-customer-information.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { vaultStatusSchema, type VaultStatus } from "./vault-status.js";

export type CardVaultResponse = {
  id?: string;
  status?: VaultStatus;
  links?: LinkDescription[];
  customer?: CardCustomerInformation;
};

export const cardVaultResponseSchema: Schema<CardVaultResponse> = s.object<CardVaultResponse>({
  id: s.optional(s.string()),
  status: s.optional(s.lazy(() => vaultStatusSchema)),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  customer: s.optional(s.lazy(() => cardCustomerInformationSchema)),
});
