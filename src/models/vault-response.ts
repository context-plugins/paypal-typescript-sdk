import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { vaultCustomerSchema, type VaultCustomer } from "./vault-customer.js";
import { vaultStatusSchema, type VaultStatus } from "./vault-status.js";

export type VaultResponse = {
  id?: string;
  status?: VaultStatus;
  customer?: VaultCustomer;
  links?: LinkDescription[];
};

export const vaultResponseSchema: Schema<VaultResponse> = s.object<VaultResponse>({
  id: s.optional(s.string()),
  status: s.optional(s.lazy(() => vaultStatusSchema)),
  customer: s.optional(s.lazy(() => vaultCustomerSchema)),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
});
