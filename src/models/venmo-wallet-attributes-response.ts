import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { venmoVaultResponseSchema, type VenmoVaultResponse } from "./venmo-vault-response.js";

export type VenmoWalletAttributesResponse = {
  vault?: VenmoVaultResponse;
};

export const venmoWalletAttributesResponseSchema: Schema<VenmoWalletAttributesResponse> =
  s.object<VenmoWalletAttributesResponse>({
    vault: s.optional(s.lazy(() => venmoVaultResponseSchema)),
  });
