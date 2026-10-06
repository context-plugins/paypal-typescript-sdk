import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { storeInVaultInstructionSchema, type StoreInVaultInstruction } from "./store-in-vault-instruction.js";

/**
 * Basic vault instruction specification that can be extended by specific payment sources that
 * supports vaulting.
 */
export type VaultInstructionBase = {
  /** Defines how and when the payment source gets vaulted. */
  storeInVault?: StoreInVaultInstruction;
};

export const vaultInstructionBaseSchema: Schema<VaultInstructionBase> = s.object<VaultInstructionBase>({
  storeInVault: s.optional(s.lazy(() => storeInVaultInstructionSchema)),
  _keysMap: {
    storeInVault: "store_in_vault",
  },
});
