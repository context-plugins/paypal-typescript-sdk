import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { vaultCustomerSchema, type VaultCustomer } from "./vault-customer.js";
import { vaultStatusSchema, type VaultStatus } from "./vault-status.js";

/** The details about a saved payment source. */
export type VaultResponse = {
  /** The PayPal-generated ID for the saved payment source. */
  id?: string;
  /**
   * The vault status.
   *
   * @deprecated
   */
  status?: VaultStatus;
  /**
   * This object represents a merchant’s customer, allowing them to store contact details, and track
   * all payments associated with the same customer.
   */
  customer?: VaultCustomer;
  /** An array of request-related HATEOAS links. */
  links?: LinkDescription[];
};

export const vaultResponseSchema: Schema<VaultResponse> = s.object<VaultResponse>({
  id: s.optional(s.string()),
  status: s.optional(s.lazy(() => vaultStatusSchema)),
  customer: s.optional(s.lazy(() => vaultCustomerSchema)),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
});
