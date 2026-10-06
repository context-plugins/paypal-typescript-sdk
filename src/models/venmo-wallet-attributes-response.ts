import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { venmoVaultResponseSchema, type VenmoVaultResponse } from "./venmo-vault-response.js";

/** Additional attributes associated with the use of a Venmo Wallet. */
export type VenmoWalletAttributesResponse = {
  /** The details about a saved venmo payment source. */
  vault?: VenmoVaultResponse;
};

export const venmoWalletAttributesResponseSchema: Schema<VenmoWalletAttributesResponse> =
  s.object<VenmoWalletAttributesResponse>({
    vault: s.optional(s.lazy(() => venmoVaultResponseSchema)),
  });
