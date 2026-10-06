import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { cardCustomerInformationSchema, type CardCustomerInformation } from "./card-customer-information.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { vaultStatusSchema, type VaultStatus } from "./vault-status.js";

/** The details about a saved Card payment source. */
export type CardVaultResponse = {
  /** The PayPal-generated ID for the saved payment source. */
  id?: string;
  /**
   * The vault status.
   *
   * @deprecated
   */
  status?: VaultStatus;
  /** An array of request-related HATEOAS links. */
  links?: LinkDescription[];
  /** The details about a customer in PayPal's system of record. */
  customer?: CardCustomerInformation;
};

export const cardVaultResponseSchema: Schema<CardVaultResponse> = s.object<CardVaultResponse>({
  id: s.optional(s.string()),
  status: s.optional(s.lazy(() => vaultStatusSchema)),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  customer: s.optional(s.lazy(() => cardCustomerInformationSchema)),
});
