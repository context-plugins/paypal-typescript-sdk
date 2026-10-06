import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { vaultResponseSchema, type VaultResponse } from "./vault-response.js";

/** Additional attributes associated with the use of Apple Pay. */
export type ApplePayAttributesResponse = {
  /** The details about a saved payment source. */
  vault?: VaultResponse;
};

export const applePayAttributesResponseSchema: Schema<ApplePayAttributesResponse> =
  s.object<ApplePayAttributesResponse>({
    vault: s.optional(s.lazy(() => vaultResponseSchema)),
  });
