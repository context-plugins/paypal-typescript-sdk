import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { vaultTokenRequestTypeSchema, type VaultTokenRequestType } from "./vault-token-request-type.js";

/** The Tokenized Payment Source representing a Request to Vault a Token. */
export type VaultTokenRequest = {
  /** The PayPal-generated ID for the token. */
  id: string;
  /** The tokenization method that generated the ID. */
  type: VaultTokenRequestType;
};

export const vaultTokenRequestSchema: Schema<VaultTokenRequest> = s.object<VaultTokenRequest>({
  id: s.string(),
  type: vaultTokenRequestTypeSchema,
});
