import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { vaultTokenRequestTypeSchema, type VaultTokenRequestType } from "./vault-token-request-type.js";

export type VaultTokenRequest = {
  id: string;
  type: VaultTokenRequestType;
};

export const vaultTokenRequestSchema: Schema<VaultTokenRequest> = s.object<VaultTokenRequest>({
  id: s.string(),
  type: vaultTokenRequestTypeSchema,
});
