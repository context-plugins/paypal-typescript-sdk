import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const VaultStatus = {
  Vaulted: "VAULTED",
  Created: "CREATED",
  Approved: "APPROVED",
} as const;
export type VaultStatus = (typeof VaultStatus)[keyof typeof VaultStatus] | (string & {});

export const vaultStatusSchema: EnumSchema<VaultStatus> = s.enumOf<VaultStatus>(VaultStatus);
