import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { storeInVaultInstructionSchema, type StoreInVaultInstruction } from "./store-in-vault-instruction.js";

export type VaultInstructionBase = {
  storeInVault?: StoreInVaultInstruction;
};

export const vaultInstructionBaseSchema: Schema<VaultInstructionBase> = s.object<VaultInstructionBase>({
  storeInVault: s.optional(s.lazy(() => storeInVaultInstructionSchema)),
  _keysMap: {
    storeInVault: "store_in_vault",
  },
});
