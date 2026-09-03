import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { storeInVaultInstructionSchema, type StoreInVaultInstruction } from "./store-in-vault-instruction.js";

export type VaultInstruction = {
  storeInVault: StoreInVaultInstruction;
};

export const vaultInstructionSchema: Schema<VaultInstruction> = s.object<VaultInstruction>({
  storeInVault: storeInVaultInstructionSchema,
  _keysMap: {
    storeInVault: "store_in_vault",
  },
});
