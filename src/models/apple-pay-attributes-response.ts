import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { vaultResponseSchema, type VaultResponse } from "./vault-response.js";

export type ApplePayAttributesResponse = {
  vault?: VaultResponse;
};

export const applePayAttributesResponseSchema: Schema<ApplePayAttributesResponse> =
  s.object<ApplePayAttributesResponse>({
    vault: s.optional(s.lazy(() => vaultResponseSchema)),
  });
