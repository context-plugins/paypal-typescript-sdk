import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { storeInVaultInstructionSchema, type StoreInVaultInstruction } from "./store-in-vault-instruction.js";

/**
 * Base vaulting specification. The object can be extended for specific use cases within each
 * payment_source that supports vaulting.
 */
export type VaultInstruction = {
  /** Defines how and when the payment source gets vaulted. */
  storeInVault: StoreInVaultInstruction;
};

export const vaultInstructionSchema: Schema<VaultInstruction> = s.object<VaultInstruction>({
  storeInVault: storeInVaultInstructionSchema,
  _keysMap: {
    storeInVault: "store_in_vault",
  },
});
